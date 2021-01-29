// Blog Service

package blogservice

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/blogrepo"
)

type BlogService struct {
	Repo blogrepo.Repo
}

// @Blog _ GetByID
func (us *BlogService) GetByBlogID(id string) (*models.Blog, error) {
	if id == "" {
		return nil, errors.New("id param is required")
	}
	blog, err := blogrepo.GetByBlogID(id)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

// @Blog _ Update
func BlogUpdate(blog *models.Blog) (*models.Blog, error) {
	blog, err := blogrepo.BlogUpdate(blog)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

// @Blog _ Delete
func (us *BlogService) BlogDelete(blog *models.Blog) error {
	return us.Repo.BlogDelete(blog)
}

// @Blog _ Create
func (us *BlogService) BlogCreate(tx *gorm.DB, blog *models.Blog) error {
	return us.Repo.BlogCreate(tx, blog)
}
