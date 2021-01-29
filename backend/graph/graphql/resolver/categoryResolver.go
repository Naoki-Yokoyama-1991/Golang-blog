package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/yoko/blog/graph/graphql/dataloader"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/categoryrepo"
)

func (r *categoryResolver) User(ctx context.Context, obj *models.Category) (*models.User, error) {
	return dataloader.GetLoader(ctx).User.Load(obj.UserID)
}

func (r *categoryResolver) Blogs(ctx context.Context, obj *models.Category) ([]*models.Blog, error) {
	return categoryrepo.GetBlogsForCategory(obj)
}
