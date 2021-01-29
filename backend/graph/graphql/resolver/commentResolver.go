package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/models"
)

// @Comment Resolver _ User / Blog
func (r *commentResolver) User(ctx context.Context, obj *models.Comment) (*models.User, error) {
	return dataloader.GetLoader(ctx).User.Load(obj.UserID)
}

func (r *commentResolver) Blog(ctx context.Context, obj *models.Comment) (*models.Blog, error) {
	return dataloader.GetLoader(ctx).Blog.Load(obj.BlogID)
}
