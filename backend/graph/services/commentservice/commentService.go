package commentservice

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/commentrepo"
)

type CommentService struct {
	Repo commentrepo.Repo
}

// @Comment _ Create
func (us *CommentService) CommentCreate(tx *gorm.DB, blog *models.Comment) error {
	return us.Repo.CommentCreate(tx, blog)
}

// @Comment _ GetByID
func (us *CommentService) GetByCommentID(id string) (*models.Comment, error) {
	if id == "" {
		return nil, errors.New("id param is required")
	}
	comment, err := us.Repo.GetByCommentID(id)
	if err != nil {
		return nil, err
	}
	return comment, nil
}

// @Comment _ Delete
func (us *CommentService) CommentDelete(comment *models.Comment) error {
	return us.Repo.CommentDelete(comment)
}
