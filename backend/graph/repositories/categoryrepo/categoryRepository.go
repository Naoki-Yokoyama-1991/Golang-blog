// Category Repository

package categoryrepo

import (
	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
)

type Repo struct {
	DB *gorm.DB
}

// @Category GetByCategoryID
func (repo *Repo) GetByCategoryID(id string) (*models.Category, error) {
	var category models.Category
	if err := database.DB.Where("id = ?", id).First(&category).Error; err != nil {
		return nil, err
	}
	return &category, nil
}

// @Category Create
func (repo *Repo) CategoryCreate(tx *gorm.DB, category *models.Category) error {
	if err := tx.Create(category).Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// @Category _ Delete
func (us *Repo) CategoryDelete(category *models.Category) error {
	return database.DB.Model(&category).Where("id = ?", category.ID).Delete(category).Error
}

// @Category _ Update
func (repo *Repo) CategoryUpdate(category *models.Category) (*models.Category, error) {
	if err := database.DB.Model(&category).Where("id = ?", category.ID).Save(category).Error; err != nil {
		return nil, err
	}
	return category, nil
}

// @Category _ GetBlogsForCategory
func GetBlogsForCategory(category *models.Category) ([]*models.Blog, error) {
	var blogs []*models.Blog
	if err := database.DB.Where("category_id = ?", category.ID).Order("id").Find(&blogs).Error; err != nil {
		return nil, err
	}
	return blogs, nil
}

// @Category _ GetBlogsForCategory
func CategoryBlogList(ID string) ([]*models.Blog, error) {
	var blogs []*models.Blog
	if err := database.DB.Where("category_id = ?", ID).Order("id").Find(&blogs).Error; err != nil {
		return nil, err
	}
	return blogs, nil
}

// @Category _ GetCategories
func GetCategories() ([]*models.Category, error) {
	var categories []*models.Category
	database.DB.Order("id").Find(&categories)
	return categories, nil
}
