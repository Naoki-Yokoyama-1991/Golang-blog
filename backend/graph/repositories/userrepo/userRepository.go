// User Service

package userrepo

import (
	"github.com/jinzhu/gorm"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
)

type Repo struct {
	DB *gorm.DB
}

// @User _ GetByUserID
func GetByID(id string) (*models.User, error) {
	var user models.User
	if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// @User _ GetByEmai
func (repo *Repo) GetByEmail(email string) (*models.User, error) {
	var user models.User
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// @User _ Update
func (repo *Repo) Update(user *models.User) error {
	return database.DB.Save(user).Error
}

// @User _ Create
func (repo *Repo) Create(tx *gorm.DB, user *models.User) error {
	if err := tx.Create(user).Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// @User _ Delete
func (repo *Repo) Delete(user *models.User) error {
	var blog models.Blog
	var comment models.Comment
	var like models.Like
	var category models.Category
	var image models.Image

	if ok := database.DB.Model(&user).Where("id = ?", user.ID).Delete(user); ok != nil {
		database.DB.Model(&blog).Where("user_id = ?", user.ID).Delete(blog)
		database.DB.Model(&comment).Where("user_id = ?", user.ID).Delete(comment)
		database.DB.Model(&like).Where("user_id = ?", user.ID).Delete(like)
		database.DB.Model(&category).Where("user_id = ?", user.ID).Delete(category)
		database.DB.Model(&image).Where("user_id = ?", user.ID).Delete(image)
	}
	return nil
}

// @User _ GetBlogsUser
func GetBlogsForUser(user *models.User) ([]*models.Blog, error) {
	var blogs []*models.Blog
	if err := database.DB.Where("user_id = ?", user.ID).Order("id").Select("id, text, title").Find(&blogs).Error; err != nil {
		return nil, err
	}
	return blogs, nil
}

// @User _ GetBlogsUser
func GetLikesForUser(user *models.User) ([]*models.Like, error) {
	var likes []*models.Like
	if err := database.DB.Where("user_id = ?", user.ID).Order("id").Find(&likes).Error; err != nil {
		return nil, err
	}
	return likes, nil
}

func GetUserAll() ([]*models.User, error) {
	var users []*models.User
	query := database.DB.Order("id")

	if err := query.Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

// @User _ GetImageUser
func GetImageForUser(user *models.User) (*models.Image, error) {
	var image *models.Image
	if err := database.DB.Where("user_id = ?", user.ID).Order("id").Select("name").Find(&image).Error; err != nil {
		return nil, err
	}
	return image, nil
}
