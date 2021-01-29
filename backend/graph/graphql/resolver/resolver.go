package resolver

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/aws"
	"github.com/yoko/blog/graph/generated"
	"github.com/yoko/blog/graph/repositories/blogrepo"
	"github.com/yoko/blog/graph/services/authservice"
	"github.com/yoko/blog/graph/services/blogservice"
	"github.com/yoko/blog/graph/services/categoryservice"
	"github.com/yoko/blog/graph/services/commentservice"
	"github.com/yoko/blog/graph/services/emailservice"
	"github.com/yoko/blog/graph/services/userservice"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

var (
	ErrBadCredentials  = errors.New("email/password combination don't work")
	ErrUnauthenticated = errors.New("unauthenticated")
	ErrForbidden       = errors.New("unauthorized")
	ErrInput           = errors.New("input errors")
)

// Resolver struct
type Resolver struct {
	UserService     userservice.UserService
	BlogService     blogservice.BlogService
	AuthService     authservice.AuthService
	CommentService  commentservice.CommentService
	CategoryService categoryservice.CategoryService
	EmailService    emailservice.EmailService
	Repo            blogrepo.Repo
	DB              *gorm.DB
	AWS             aws.S3
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Blog returns generated.BlogResolver implementation.
func (r *Resolver) Blog() generated.BlogResolver { return &blogResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

// Like returns generated.LikeResolver implementation.
func (r *Resolver) Like() generated.LikeResolver { return &likeResolver{r} }

// Image returns generated.ImageResolver implementation.

// type likeResolver struct{ *Resolver }
type categoryResolver struct{ *Resolver }
type blogResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type commentResolver struct{ *Resolver }
type likeResolver struct{ *Resolver }
type imageResolver struct{ *Resolver }
