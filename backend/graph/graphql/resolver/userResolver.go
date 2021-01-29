package resolver

import (
	"context"

	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/repositories/userrepo"
)

func (u *userResolver) Blogs(ctx context.Context, obj *models.User) ([]*models.Blog, error) {
	return userrepo.GetBlogsForUser(obj)
}

func (r *userResolver) Likes(ctx context.Context, obj *models.User) ([]*models.Like, error) {
	return userrepo.GetLikesForUser(obj)
}

func (r *userResolver) ProfileImage(ctx context.Context, obj *models.User) (*models.Image, error) {
	return userrepo.GetImageForUser(obj)
}
