package resolver

import (
	"context"

	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/blogrepo"
)

// @Blog Resolver _ UserLoader / Tag / Commentsdate
func (m *blogResolver) User(ctx context.Context, obj *models.Blog) (*models.User, error) {
	return dataloader.GetLoader(ctx).User.Load(obj.UserID)
}

func (r *blogResolver) Category(ctx context.Context, obj *models.Blog) (*models.Category, error) {
	return dataloader.GetLoader(ctx).Category.Load(obj.CategoryID)
}

func (r *blogResolver) Comments(ctx context.Context, obj *models.Blog) ([]*models.Comment, error) {
	return blogrepo.GetCommentsForBlog(obj)
}

func (r *blogResolver) Likes(ctx context.Context, obj *models.Blog) ([]*models.Like, error) {
	return blogrepo.GetLikesForBlog(obj)
}

func (r *blogResolver) BlogImage(ctx context.Context, obj *models.Blog) ([]*models.Image, error) {
	return blogrepo.GetImageForBlog(obj)
}
