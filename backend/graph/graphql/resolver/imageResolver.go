package resolver

import (
	"context"

	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/models"
)

func (r *imageResolver) User(ctx context.Context, obj *models.Image) (*models.User, error) {
	return dataloader.GetLoader(ctx).User.Load(obj.UserID)
}

func (r *imageResolver) Blog(ctx context.Context, obj *models.Image) (*models.Blog, error) {
	return dataloader.GetLoader(ctx).Blog.Load(obj.BlogID)
}
