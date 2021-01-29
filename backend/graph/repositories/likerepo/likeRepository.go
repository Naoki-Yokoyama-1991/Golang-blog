package likerepo

import (
	"errors"
	"fmt"

	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/blogrepo"
)

// @Blog _ GetByBlogID
func GetByLikeID(blogid string, userid string) (*models.Like, error) {
	var like models.Like
	if err := database.DB.Where("blog_id = ? AND user_id = ?", blogid, userid).Find(&like).Error; err != nil {
		return nil, err
	}
	return &like, nil
}

// @Like _ PutLikeBlog
func PutLikeBlog(like *models.Like) error {

	if err := database.DB.Model(&like).Create(like).Error; err != nil {
		return err
	}

	return nil
}

// @Like _ DeleteLikeBlog
func DeleteLikeBlog(like *models.Like) error {
	if err := database.DB.Model(&like).Where("id = ?", like.ID).Delete(&like).Error; err != nil {
	}
	return nil
}

// @Like _ GetLikesCount
func GetLikesCount(like *models.Like) error {
	var likes []*models.Like
	if err := database.DB.Where("blog_id = ?", like.BlogID).Find(&likes).Error; err != nil {
		return err
	}

	blog, err := blogrepo.GetByBlogID(like.BlogID)
	if err != nil || blog == nil {
		return errors.New("blog not exist")
	}

	blog.LikeCount = len(likes)

	blog, err = blogrepo.BlogUpdate(blog)
	if err != nil {
		return fmt.Errorf("error while updating blog: %v", err)

	}
	return nil
}
