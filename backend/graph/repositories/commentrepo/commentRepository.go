package commentrepo

import (
	"github.com/jinzhu/gorm"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
)

type Repo struct {
	DB *gorm.DB
}

// @Comment _ GetByID
func (repo *Repo) GetByCommentID(id string) (*models.Comment, error) {
	var comment models.Comment
	if err := database.DB.Where("id = ?", id).First(&comment).Error; err != nil {
		return nil, err
	}
	return &comment, nil
}

// @Comment _ Create
func (repo *Repo) CommentCreate(tx *gorm.DB, comment *models.Comment) error {
	if err := tx.Create(comment).Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// @Comment _ Delete
func (repo *Repo) CommentDelete(comment *models.Comment) error {
	return database.DB.Model(&comment).Where("id = ?", comment.ID).Delete(comment).Error
}

// @Comment _ GetCommentsByBlogID
func GetCommentsByBlogID(blogID string, limit, offset *int) ([]*models.Comment, error) {
	var comments []*models.Comment

	if blogID != "" && limit != nil && offset != nil {
		database.DB.Where("blog_id = ?", blogID).Order("id").Limit(*limit).Offset(*offset).Find(&comments)
	}
	return comments, nil
}
