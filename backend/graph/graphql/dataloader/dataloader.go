package dataloader

import (
	"context"
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/models"
)

const userloaderKey = "userloader"

// HandlerはServeHTTPをServeHTTP(ResponseWriter, *Request)をメソッドに持つインターフェース
func DataloaderMiddleware(db *gorm.DB, next http.Handler) http.Handler {
	// HandlerFuncは型
	// HandlerFuncはServeHTTP(ResponseWriter, *Request)をメソッドとして持っている
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userloader := UserLoader{
			// maxBatch の 数だけIN句にパラメータが渡されたSQL分が複数回実行される
			maxBatch: 100,
			wait:     1 * time.Millisecond,
			fetch: func(ids []string) ([]*models.User, []error) {
				var users []*models.User

				if err := db.Where("id in (?)", ids).Find(&users).Error; err != nil {
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

		ctx := context.WithValue(r.Context(), userloaderKey, &userloader)

		// ServeHTTPはHandlerFunc自身を呼び出す
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetUserLoader(ctx context.Context) *UserLoader {
	return ctx.Value(userloaderKey).(*UserLoader)
}
