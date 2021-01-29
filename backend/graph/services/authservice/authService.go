package authservice

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/yoko/blog/graph/models"
)

// type AuthService interface {
// 	IssueToken(u user.User) (string, error)
// }

type AuthService struct {
	jwtSecret string
}

func (auth *AuthService) IssueToken(u models.User) (string, error) {
	expiredAt := time.Now().Add(time.Hour * 24 * 7) // a week

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: expiredAt.Unix(),
		Id:        u.ID,
		IssuedAt:  time.Now().Unix(),
		Issuer:    "meetmeup",
	})

	return token.SignedString([]byte(os.Getenv("JWT_SIGN_KEY")))

}
