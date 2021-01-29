package resolver

import (
	"context"

	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/models"
)

func (r *likeResolver) User(ctx context.Context, obj *models.Like) (*models.User, error) {
	return dataloader.GetLoader(ctx).User.Load(obj.UserID)
}

func (r *likeResolver) Blog(ctx context.Context, obj *models.Like) (*models.Blog, error) {
	return dataloader.GetLoader(ctx).Blog.Load(obj.BlogID)
}
