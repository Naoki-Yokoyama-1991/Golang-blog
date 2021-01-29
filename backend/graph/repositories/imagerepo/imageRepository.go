package imagerepo

import (
	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/models"
)

type Repo struct {
	DB *gorm.DB
}

func ImageCreate(tx *gorm.DB, image *models.Image) error {
	if err := tx.Create(image).Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

//@Image GetImageUser
func GetByImageUser(tx *gorm.DB, id string) (*models.Image, error) {
	var image models.Image
	if err := tx.Where("user_id = ?", id).First(&image).Error; err != nil {
		return nil, err
	}
	return &image, nil
}

//@Image GetImageBlog
func GetByImageBlog(tx *gorm.DB, id string) (*models.Image, error) {
	var image models.Image
	if err := tx.Where("blog_id = ?", id).First(&image).Error; err != nil {
		return nil, err
	}
	return &image, nil
}

func ImageUserDelete(tx *gorm.DB, image *models.Image) error {
	return tx.Model(&image).Where("user_id", image.UserID).Delete(image).Error
}

func ImageBlogDelete(tx *gorm.DB, image *models.Image) error {
	return tx.Model(&image).Where("blog_id = ?", image.BlogID).Delete(image).Error
}
