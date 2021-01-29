package dataloader

import (
	"context"
	"errors"
	"net/http"
	"time"

	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
)

const LOADERKEY = "LOADER"

var (
	ErrDataLoaderNotFound = errors.New("Document not found")
)

type Loader struct {
	Image    *ImageLoader
	Blog     *BlogLoader
	User     *UserLoader
	Comment  *CommentLoader
	Category *CategoryLoader
}

var loader = NewLoader(context.TODO())

func DataloaderMiddlewares(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), LOADERKEY, loader)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetLoader(ctx context.Context) *Loader {
	loader, ok := ctx.Value(LOADERKEY).(*Loader)
	if ok {
		return loader
	} else {
		return nil
	}
}

func NewLoader(ctx context.Context) *Loader {
	loader := Loader{}
	wait := 10 * time.Microsecond
	maxBatch := 1000
	loader.User = &UserLoader{
		wait:     wait,
		maxBatch: maxBatch,
		fetch: func(ids []string) ([]*models.User, []error) {
			var users []*models.User

			if err := database.DB.Where("id in (?)", ids).Find(&users).Error; err != nil {
				return nil, []error{err}
			}

			// keyはstringの値はmodels.Userの長さキャパシティーはlen(users)
			u := make(map[string]*models.User, len(users))

			for _, user := range users {
				u[user.ID] = user
			}

			result := make([]*models.User, len(ids))

			for i, id := range ids {
				result[i] = u[id]
			}

			return result, nil
		},
	}

	loader.Blog = &BlogLoader{
		wait:     wait,
		maxBatch: maxBatch,
		fetch: func(ids []string) ([]*models.Blog, []error) {
			var blogs []*models.Blog

			if err := database.DB.Where("id in (?)", ids).Find(&blogs).Error; err != nil {
				return nil, []error{err}
			}

			// keyはstringの値はmodels.Userの長さキャパシティーはlen(blogs)
			b := make(map[string]*models.Blog, len(blogs))

			for _, blog := range blogs {
				b[blog.ID] = blog
			}

			result := make([]*models.Blog, len(ids))

			for i, id := range ids {
				result[i] = b[id]
			}

			return result, nil
		},
	}

	loader.Comment = &CommentLoader{
		wait:     wait,
		maxBatch: maxBatch,
		fetch: func(ids []string) ([]*models.Comment, []error) {
			var comments []*models.Comment

			if err := database.DB.Where("id in (?)", ids).Find(&comments).Error; err != nil {
				return nil, []error{err}
			}

			c := make(map[string]*models.Comment, len(comments))

			for _, comment := range comments {
				c[comment.ID] = comment
			}

			result := make([]*models.Comment, len(ids))

			for i, id := range ids {
				result[i] = c[id]
			}

			return result, nil

		},
	}

	loader.Category = &CategoryLoader{
		wait:     wait,
		maxBatch: maxBatch,
		fetch: func(ids []string) ([]*models.Category, []error) {
			var categorys []*models.Category

			if err := database.DB.Where("id in (?)", ids).Find(&categorys).Error; err != nil {
				return nil, []error{err}
			}

			cg := make(map[string]*models.Category, len(categorys))

			for _, category := range categorys {
				cg[category.ID] = category
			}

			result := make([]*models.Category, len(ids))

			for i, id := range ids {
				result[i] = cg[id]
			}

			return result, nil
		},
	}

	loader.Image = &ImageLoader{
		wait:     wait,
		maxBatch: maxBatch,
		fetch: func(ids []string) ([]*models.Image, []error) {
			var images []*models.Image

			if err := database.DB.Where("id in (?)", ids).Find(&images).Error; err != nil {
				return nil, []error{err}
			}

			cg := make(map[string]*models.Image, len(images))

			for _, image := range images {
				cg[image.ID] = image
			}

			result := make([]*models.Image, len(ids))

			for i, id := range ids {
				result[i] = cg[id]
			}

			return result, nil
		},
	}

	return &loader
}
