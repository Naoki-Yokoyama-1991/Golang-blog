// Category Service

package categoryservice

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/categoryrepo"
)

type CategoryService struct {
	Repo categoryrepo.Repo
}

// @Category _ GetByID
func (us *CategoryService) GetByCategoryID(id string) (*models.Category, error) {
	if id == "" {
		return nil, errors.New("id param is required")
	}
	category, err := us.Repo.GetByCategoryID(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

// @Category _ Create
func (us *CategoryService) CategoryCreate(tx *gorm.DB, category *models.Category) error {
	return us.Repo.CategoryCreate(tx, category)
}

// @Category _ Update
func (us *CategoryService) CategoryUpdate(category *models.Category) (*models.Category, error) {
	category, err := us.Repo.CategoryUpdate(category)
	if err != nil {
		return nil, err
	}
	return category, nil
}

// @Category _ Delete
func (us *CategoryService) CategoryDelete(category *models.Category) error {
	return us.Repo.CategoryDelete(category)
}
