package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/middleware"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/imagerepo"
	"github.com/yoko/blog/graph/repositories/likerepo"
	"github.com/yoko/blog/graph/services/blogservice"
)

// @User Mutation _ Register
func (r *mutationResolver) Register(ctx context.Context, input models.RegisterInput) (*models.AuthResponse, error) {
	_, err := r.UserService.GetByEmail(input.Email)
	if err == nil {
		return nil, errors.New("email already in used")
	}

	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	userDomain := &models.User{
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Email:     input.Email,
		Password:  input.Password,
	}

	u, _ := uuid.NewRandom()
	userDomain.ID = strings.Replace(u.String(), "-", "", -1)

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	err = r.UserService.Create(tx, userDomain)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	token, err := r.AuthService.IssueToken(*userDomain)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{
		Token: token,
		User: &models.User{
			ID:        string(userDomain.ID),
			FirstName: userDomain.FirstName,
			LastName:  userDomain.LastName,
			Email:     userDomain.Email,
			Role:      userDomain.Role,
			Active:    userDomain.Active,
			CreatedAt: userDomain.CreatedAt,
			UpdatedAt: userDomain.UpdatedAt,
		},
	}, nil
}

// @User Mutation _ Login
func (r *mutationResolver) Login(ctx context.Context, input models.LoginInput) (*models.AuthResponse, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	user, err := r.UserService.GetByEmail(input.Email)
	if err != nil {
		return nil, errors.New("The email address is not registered.")
	}

	err = r.UserService.ComparePassword(input.Password, user.Password)
	if err != nil {
		return nil, errors.New("password is incorrect.")
	}

	token, err := r.AuthService.IssueToken(*user)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{
		Token: token,
		User: &models.User{
			ID:        string(user.ID),
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			Role:      user.Role,
			Active:    user.Active,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
	}, nil
}

// @User Mutation _ Logout
func (r *mutationResolver) Logout(ctx context.Context) (*models.AuthResponse, error) {
	return &models.AuthResponse{
		Token: "",
	}, nil
}

// @User Mutation _ Update
func (r *mutationResolver) UpdateUser(ctx context.Context, input models.UpdateUser) (*models.User, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	usr, err := middleware.GetCurrentUserFromCTX(ctx)

	if input.Email != "" {
		usr.Email = input.Email
	}
	if input.FirstName != "" {
		usr.FirstName = input.FirstName
	}
	if input.LastName != "" {
		usr.LastName = input.LastName
	}

	err = r.UserService.Update(usr)
	if err != nil {
		return nil, err
	}

	return &models.User{
		ID:        string(usr.ID),
		FirstName: usr.FirstName,
		LastName:  usr.LastName,
		Email:     usr.Email,
		Role:      usr.Role,
		Active:    usr.Active,
	}, nil
}

// @User Mutation _ Delete
func (r *mutationResolver) DeleteUser(ctx context.Context) (bool, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	oldImage, _ := imagerepo.GetByImageUser(tx, usr.ID)

	if oldImage != nil {
		_ = imagerepo.ImageUserDelete(tx, oldImage)
		err = r.AWS.DeleteS3Image(oldImage.Name)
		if err != nil {
			return false, err
		}
	}

	err = r.UserService.Delete(usr)
	if err != nil {
		return false, fmt.Errorf("error while deleting: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return false, errors.New("Commit went wrong")
	}
	return true, nil
}

// @Blog Mutation _ Create
func (r *mutationResolver) CreateBlog(ctx context.Context, input models.NewBlog) (*models.Blog, error) {
	if input.Image.Size >= 1000000 {
		return nil, errors.New("image size too big")
	}

	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	// var timeZoneJST = time.FixedZone("Asia/Tokyo", 9*60*60)
	// time.Local = timeZoneJST
	// time.LoadLocation("Asia/Tokyo")
	tm := time.Now()
	const layout = "2006/01/02"

	blog := &models.Blog{
		Title:      input.Title,
		Text:       input.Text,
		CategoryID: input.CategoryID,
		UserID:     usr.ID,
		CreatedAt:  string(tm.Format(layout)),
	}

	if input.Image != nil {
		url, err := r.AWS.PostImageToS3(*input.Image)
		if input.Image.File != nil && err != nil {
			return nil, err
		}
		blog.ImageURL = url
	}

	u, _ := uuid.NewRandom()
	blog.ID = strings.Replace(u.String(), "-", "", -1)

	// imageCreate
	imageDomain := &models.Image{
		UserID: "",
		BlogID: blog.ID,
		Name:   input.Image.Filename,
	}

	i, _ := uuid.NewRandom()
	imageDomain.ID = strings.Replace(i.String(), "-", "", -1)

	tx := database.DB.Begin()

	defer tx.Rollback()

	err = imagerepo.ImageCreate(tx, imageDomain)
	if err != nil {
		return nil, err
	}

	err = r.BlogService.BlogCreate(tx, blog)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	return &models.Blog{
		ID:         string(blog.ID),
		Title:      blog.Title,
		Text:       blog.Text,
		CategoryID: blog.CategoryID,
		UserID:     usr.ID,
		CreatedAt:  string(tm.Format(layout)),
		ImageURL:   blog.ImageURL,
	}, nil

}

// @Blog Mutation _ Update
func (r *mutationResolver) UpdateBlog(ctx context.Context, id string, input models.UpdateBlog) (*models.Blog, error) {
	if input.Image.Size >= 1000000 {
		return nil, errors.New("image size too big")
	}

	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	blog, err := r.BlogService.GetByBlogID(id)
	if err != nil || blog == nil {
		return nil, errors.New("blog not exist")
	}

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	oldImage, _ := imagerepo.GetByImageBlog(tx, blog.ID)

	if oldImage != nil {
		_ = imagerepo.ImageBlogDelete(tx, oldImage)
		err = r.AWS.DeleteS3Image(oldImage.Name)
		if err != nil {
			return nil, err
		}
	}

	if input.Image != nil {
		url, err := r.AWS.PostImageToS3(*input.Image)
		if input.Image.File != nil && err != nil {
			return nil, err
		}
		blog.ImageURL = url
	}

	// imageCreate
	imageDomain := &models.Image{
		UserID: "",
		BlogID: blog.ID,
		Name:   input.Image.Filename,
	}

	i, _ := uuid.NewRandom()
	imageDomain.ID = strings.Replace(i.String(), "-", "", -1)

	err = imagerepo.ImageCreate(tx, imageDomain)
	if err != nil {
		return nil, err
	}

	if !blog.IsOwner(usr) {
		return nil, ErrForbidden
	}

	didUpdate := false

	if input.Title != nil {
		if len(*input.Title) < 3 {
			return nil, errors.New("title is not long enough")
		}
		blog.Title = *input.Title
		didUpdate = true
	}

	if input.Text != nil {
		if len(*input.Text) < 3 {
			return nil, errors.New("text is not long enough")
		}
		blog.Text = *input.Text
		didUpdate = true
	}

	if input.CategoryID != "" {
		blog.CategoryID = input.CategoryID
		didUpdate = true
	}

	blog, err = blogservice.BlogUpdate(blog)
	if err != nil {
		return nil, fmt.Errorf("error while updating blog: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	if !didUpdate {
		return nil, errors.New("no update done")
	}

	return &models.Blog{
		ID:         string(blog.ID),
		Title:      blog.Title,
		Text:       blog.Text,
		CategoryID: blog.CategoryID,
		UserID:     usr.ID,
		ImageURL:   blog.ImageURL,
	}, nil
}

// @Blog Mutation _ Delete
func (r *mutationResolver) DeleteBlog(ctx context.Context, id string) (bool, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	blog, err := r.BlogService.GetByBlogID(id)
	if err != nil || blog == nil {
		return false, errors.New("blog not exist")
	}

	tx := database.DB.Begin()

	defer tx.Rollback()

	oldImage, _ := imagerepo.GetByImageBlog(tx, blog.ID)

	if oldImage != nil {
		_ = imagerepo.ImageUserDelete(tx, oldImage)
		err = r.AWS.DeleteS3Image(oldImage.Name)
		if err != nil {
			return false, err
		}
	}

	if !blog.IsOwner(usr) {
		return false, ErrForbidden
	}

	err = r.BlogService.BlogDelete(blog)
	if err != nil {
		return false, fmt.Errorf("error while deleting blog: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return false, errors.New("Commit went wrong")
	}

	return true, nil
}

// @Blog Mutation _ Create
func (r *mutationResolver) CreateComment(ctx context.Context, blogID string, input models.NewComment) (*models.Comment, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	tm := time.Now()
	const layout = "2006/01/02 15:04:05"

	comment := &models.Comment{
		Comment:   input.Comment,
		UserID:    usr.ID,
		BlogID:    blogID,
		CreatedAt: string(tm.Format(layout)),
	}

	u, _ := uuid.NewRandom()
	comment.ID = strings.Replace(u.String(), "-", "", -1)

	tx := database.DB.Begin()

	defer tx.Rollback()

	err = r.CommentService.CommentCreate(tx, comment)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	return &models.Comment{
		ID:        string(comment.ID),
		Comment:   comment.Comment,
		UserID:    usr.ID,
		BlogID:    comment.BlogID,
		CreatedAt: comment.CreatedAt,
	}, nil
}

// @Blog Mutation _ Delete
func (r *mutationResolver) DeleteComment(ctx context.Context, id string) (bool, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	comment, err := r.CommentService.GetByCommentID(id)
	if err != nil || comment == nil {
		return false, errors.New("blog not exist")
	}

	if !comment.IsOwner(usr) {
		return false, ErrForbidden
	}

	err = r.CommentService.CommentDelete(comment)
	if err != nil {
		return false, fmt.Errorf("error while deleting comment: %v", err)
	}
	return true, nil
}

// @Category Mutation _ Create
func (r *mutationResolver) CreateCategory(ctx context.Context, input models.CategoryInput) (*models.Category, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	category := &models.Category{
		UserID: usr.ID,
		Name:   input.Name,
	}

	u, _ := uuid.NewRandom()
	category.ID = strings.Replace(u.String(), "-", "", -1)

	tx := database.DB.Begin()

	defer tx.Rollback()

	err = r.CategoryService.CategoryCreate(tx, category)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	return &models.Category{
		ID:     string(category.ID),
		UserID: usr.ID,
		Name:   category.Name,
		Blogs:  category.Blogs,
	}, nil
}

// @Category Mutation _ Update
func (r *mutationResolver) UpdateCategory(ctx context.Context, id string, input *models.CategoryInput) (*models.Category, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	_, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	category, err := r.CategoryService.GetByCategoryID(id)
	if err != nil || category == nil {
		return nil, errors.New("comment not exist")
	}

	didUpdate := false

	if input.Name != "" {
		if len(input.Name) < 2 {
			return nil, errors.New("name is not long enough")
		}
		category.Name = input.Name
		didUpdate = true
	}

	category, err = r.CategoryService.CategoryUpdate(category)
	if err != nil {
		return nil, fmt.Errorf("error while updating comment: %v", err)

	}

	if !didUpdate {
		return nil, errors.New("no update done")
	}

	return &models.Category{
		ID:    string(category.ID),
		Name:  category.Name,
		Blogs: category.Blogs,
	}, nil
}

// @Category Mutation _ Delete
func (r *mutationResolver) DeleteCategory(ctx context.Context, id string) (bool, error) {
	_, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	category, err := r.CategoryService.GetByCategoryID(id)
	if err != nil || category == nil {
		return false, errors.New("category not exist")
	}

	err = r.CategoryService.CategoryDelete(category)
	if err != nil {
		return false, fmt.Errorf("error while deleting category: %v", err)
	}
	return true, nil
}

// @Like Mutation _ Put
func (r *mutationResolver) PutLike(ctx context.Context, blogID string) (*models.Like, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	blog, err := r.BlogService.GetByBlogID(blogID)
	if err != nil {
		return nil, err
	}

	if blog.UserID == usr.ID {
		return nil, errors.New("You cannot press the button.")
	}

	like, _ := likerepo.GetByLikeID(blogID, usr.ID)

	if like != nil {
		if like.UserID == usr.ID {
			return nil, errors.New("Post already liked")
		}
	}

	like = &models.Like{
		BlogID: blogID,
		UserID: usr.ID,
	}

	u, _ := uuid.NewRandom()
	like.ID = strings.Replace(u.String(), "-", "", -1)

	err = likerepo.PutLikeBlog(like)
	if err != nil {
		return nil, fmt.Errorf("error while putlike: %v", err)
	}

	err = likerepo.GetLikesCount(like)
	if err != nil {
		return nil, fmt.Errorf("error while putlike: %v", err)
	}

	return &models.Like{
		ID:     string(like.ID),
		BlogID: like.BlogID,
		UserID: like.UserID,
	}, nil
}

// @Like Mutation _ PutUn
func (r *mutationResolver) PutUnLike(ctx context.Context, blogID string) (bool, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	blog, err := r.BlogService.GetByBlogID(blogID)
	if err != nil {
		return false, err
	}

	if blog.UserID == usr.ID {
		return false, errors.New("You cannot press the button.")
	}

	like, err := likerepo.GetByLikeID(blogID, usr.ID)
	if err != nil {
		return false, errors.New("Post yet liked")
	}

	if like != nil {
		if like.UserID != usr.ID {
			return false, errors.New("Post yet liked")
		}
	}

	err = likerepo.DeleteLikeBlog(like)
	if err != nil {
		return false, fmt.Errorf("error while putlike: %v", err)
	}

	err = likerepo.GetLikesCount(like)
	if err != nil {
		return false, fmt.Errorf("error while putlike: %v", err)
	}
	println(like)

	return true, nil
}

// @Password Mutation _ ForgotPassword
func (r *mutationResolver) ForgotPassword(ctx context.Context, email string) (bool, error) {
	if email == "" {
		return false, errors.New("Email is required")
	}

	// Issue token for user to update his/her password
	token, err := r.UserService.InitiateResetPassword(email)
	if err != nil {
		return false, errors.New("That email address does not exist")
	}

	// Send email with token update password
	if err = r.EmailService.ResetPassword(email, token); err != nil {
		return false, err
	}

	return true, nil
}

// @Password Mutation _ ResetPassword
func (r *mutationResolver) ResetPassword(ctx context.Context, resetToken string, input models.ResetPassword) (*models.AuthResponse, error) {
	isValid := validation(ctx, input)
	if !isValid {
		return nil, ErrInput
	}

	if resetToken == "" {
		return nil, errors.New("Token is required")
	}

	user, err := r.UserService.CompleteUpdatePassword(resetToken, input.Password)
	if err != nil {
		return nil, err
	}

	token, err := r.AuthService.IssueToken(*user)
	if err != nil {
		return nil, err
	}

	return &models.AuthResponse{
		Token: token,
		User: &models.User{
			ID:        string(user.ID),
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			Active:    user.Active,
			Role:      user.Role,
		},
	}, nil
}

// @Image Mutation _ NewProfileImage
func (r *mutationResolver) NewProfileImage(ctx context.Context, image graphql.Upload) (*models.Image, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}
	if image.Size >= 1000000 {
		return nil, errors.New("image size too big")
	}

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	oldImage, _ := imagerepo.GetByImageUser(tx, usr.ID)

	if oldImage != nil {
		_ = imagerepo.ImageUserDelete(tx, oldImage)
		err = r.AWS.DeleteS3Image(oldImage.Name)
		if err != nil {
			return nil, err
		}
	}

	url, err := r.AWS.PostImageToS3(image)
	if err != nil {
		return nil, err
	}

	fmt.Printf("%v\n", url)

	imageDomain := &models.Image{
		UserID: usr.ID,
		BlogID: "",
		Name:   image.Filename,
	}

	u, _ := uuid.NewRandom()
	imageDomain.ID = strings.Replace(u.String(), "-", "", -1)

	err = imagerepo.ImageCreate(tx, imageDomain)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, errors.New("Commit went wrong")
	}

	return &models.Image{
		UserID: usr.ID,
		BlogID: "",
		Name:   image.Filename,
	}, nil
}

func (r *mutationResolver) DeleteImage(ctx context.Context) (bool, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return false, ErrUnauthenticated
	}

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	image, err := imagerepo.GetByImageUser(tx, usr.ID)
	if err != nil {
		return false, err
	}

	err = r.AWS.DeleteS3Image(image.Name)
	if err != nil {
		return false, err
	}

	err = imagerepo.ImageUserDelete(tx, image)
	if err != nil {
		return false, fmt.Errorf("error while deleting image: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		return false, errors.New("Commit went wrong")
	}

	return true, nil
}
