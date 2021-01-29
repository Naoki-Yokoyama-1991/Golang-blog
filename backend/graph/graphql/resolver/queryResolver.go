package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"log"

	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/middleware"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/blogrepo"
	"github.com/yoko/blog/graph/repositories/categoryrepo"
	"github.com/yoko/blog/graph/repositories/commentrepo"
	"github.com/yoko/blog/graph/repositories/imagerepo"
	"github.com/yoko/blog/graph/repositories/userrepo"
	"github.com/yoko/blog/graph/util"
)

// @User Query _ GetUser
func (r *queryResolver) User(ctx context.Context, id string) (*models.User, error) {
	user, err := r.UserService.GetByID(string(id))
	if err != nil {
		return nil, err
	}
	return &models.User{
		ID:        string(user.ID),
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Role:      user.Role,
		Active:    user.Active,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

// @User Query _ GetUserAll
func (r *queryResolver) UserAll(ctx context.Context) ([]*models.User, error) {
	return userrepo.GetUserAll()
}

// @User Query _ GetUserProfile
func (r *queryResolver) UserProfile(ctx context.Context) (*models.User, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return nil, ErrUnauthenticated
	}

	println(usr.ID)
	user, err := r.UserService.GetByID(usr.ID)
	if err != nil {
		return nil, err
	}

	if usr.ID != user.ID {
		return nil, ErrForbidden
	}

	return &models.User{
		ID:        string(user.ID),
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Role:      user.Role,
		Active:    user.Active,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

// @Blog Query _ GetBlog
func (r *queryResolver) Blog(ctx context.Context, blogID string) (*models.Blog, error) {
	return blogrepo.GetByBlogID(blogID)
}

// @Blog Query _ GetBlogs
func (r *queryResolver) Blogs(ctx context.Context, filter *models.BlogFilter, limit *int, offset *int) ([]*models.Blog, error) {
	isValid := validation(ctx, filter)
	if !isValid {
		return nil, ErrInput
	}
	return blogrepo.GetBlogs(filter, limit, offset)
}

// @Blog Query _ GetAllBlogList
func (r *queryResolver) Article(ctx context.Context) ([]*models.Blog, error) {
	return blogrepo.GetBlogList()
}

// @Comment Query _ GetComments
func (r *queryResolver) Comments(ctx context.Context, blogID string, limit *int, offset *int) ([]*models.Comment, error) {
	return commentrepo.GetCommentsByBlogID(blogID, limit, offset)
}

// @Category Query _ Category
func (r *queryResolver) Categories(ctx context.Context) ([]*models.Category, error) {
	return categoryrepo.GetCategories()
}

// @Category Query _ Categories
func (r *queryResolver) Category(ctx context.Context, categoryID string) (*models.Category, error) {
	return dataloader.GetLoader(ctx).Category.Load(categoryID)
}

// @Category Query _ CategoriesList
func (r *queryResolver) CategoriesList(ctx context.Context, categoryID string) ([]*models.Blog, error) {
	return categoryrepo.CategoryBlogList(categoryID)
}

func (r *queryResolver) BlogConnection(ctx context.Context, filterWord *models.TextFilterCondition, pageCondition *models.PageCondition, edgeOrder *models.EdgeOrder) (*models.BlogConnection, error) {
	log.Println("[queryResolver.BlogConnection")

	dao := blogrepo.NewBlogDao(r.DB)

	/*
	 * 検索条件に合致する全件数を取得
	 */
	// ブログ数を返却無しなら0
	totalCount, err := dao.CountByTextFilter(ctx, filterWord)
	if err != nil {
		return nil, err
	}

	fmt.Println(totalCount)
	if totalCount == 0 {
		// 空のPaInfo & Edges & TotalCountを返す
		return models.EmptyBlogConnection(), nil
	}
	//
	// 検索結果全件数と１ページあたりの表示件数から、今回の検索による総ページ数を算出（例：トータル30件 / first5件 = 6page）
	totalPage := pageCondition.TotalPage(totalCount)
	mtp := pageCondition.MoveToPageNo()
	mtpi64 := int64(mtp)
	// 前ページ
	fmt.Println(mtpi64)
	fmt.Println(totalPage)
	hnp := totalPage - mtpi64
	fmt.Println(hnp)

	// ページ情報を計算・収集しておく
	pageInfo := &models.PageInfo{
		HasNextPage:     (totalPage - int64(pageCondition.MoveToPageNo())) >= 1, // 遷移後も、まだ先のページがあるか
		HasPreviousPage: pageCondition.MoveToPageNo() > 1,                       // 遷移後も、まだ前のページがあるか
	}

	/*
	 * 検索条件、ページング条件、ソート条件に合致する結果を取得
	 */
	blogs, err := dao.FindByCondition(ctx, filterWord, pageCondition, edgeOrder)
	if err != nil {
		return nil, err
	}

	fmt.Println("this here", blogs)
	if blogs == nil || len(blogs) == 0 {
		return models.EmptyBlogConnection(), nil
	}

	var edges []*models.BlogEdge
	for idx, blog := range blogs {
		// 当該レコードをユニークに特定するためのカーソルを計算
		cursor := util.CreateCursor("blogs", blog.ID)

		// 検索結果をEdge形式に変換（カーソルの値も格納）
		edges = append(edges, &models.BlogEdge{
			Cursor: cursor,
			Node: &models.Blog{
				ID:         string(blog.ID),
				Title:      blog.Title,
				Text:       blog.Text,
				CategoryID: blog.CategoryID,
				UserID:     blog.UserID,
				CreatedAt:  blog.CreatedAt,
				UpdatedAt:  blog.UpdatedAt,
			},
		})
		fmt.Printf("%s\n", "Hello Yoko!")

		if idx == 0 {
			// 今回表示するページの１件目のレコードを特定するカーソルをセット
			// （「前ページ」遷移時に「このカーソルよりも前のレコード」という検索条件に用いる）
			pageInfo.StartCursor = cursor
		}
		if idx == len(blogs)-1 {
			// 今回表示するページの最後のレコードを特定するカーソルをセット
			// （「次ページ」遷移時に「このカーソルよりも後のレコード」という検索条件に用いる）
			pageInfo.EndCursor = cursor
		}
	}

	for _, bbb := range edges {
		// 当該レコードをユニークに特定するためのカーソルを計算
		fmt.Println(bbb)
	}

	fmt.Println(pageInfo)
	fmt.Println(totalCount)
	fmt.Printf("%s\n", "Hello Yoko!")

	return &models.BlogConnection{
		PageInfo:   pageInfo,
		Edges:      edges,
		TotalCount: totalCount,
		TotalPage:  totalPage,
	}, nil
}

func (r *queryResolver) ImageUser(ctx context.Context) (string, error) {
	usr, err := middleware.GetCurrentUserFromCTX(ctx)
	if err != nil {
		return "", ErrUnauthenticated
	}

	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	image, err := imagerepo.GetByImageUser(tx, usr.ID)
	if err != nil {
		return "", err
	}

	if err := tx.Commit().Error; err != nil {
		return "", errors.New("Commit went wrong")
	}

	url, err := r.AWS.GetImageToS3(image.Name)
	if err != nil {
		return "", err
	}

	return url, nil
}

func (r *queryResolver) Imageblog(ctx context.Context, id string) (string, error) {
	// Begin() でトランザクションを開始させる。
	tx := database.DB.Begin()

	defer tx.Rollback()

	image, err := imagerepo.GetByImageBlog(tx, id)
	if err != nil {
		return "", err
	}

	if err := tx.Commit().Error; err != nil {
		return "", errors.New("Commit went wrong")
	}

	url, err := r.AWS.GetImageToS3(image.Name)
	if err != nil {
		return "", err
	}

	return url, nil
}
