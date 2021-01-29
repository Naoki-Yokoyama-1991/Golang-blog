// User Service

package userservice

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"

	"github.com/yoko/blog/graph/common/hmachash"
	rdms "github.com/yoko/blog/graph/common/randomstring"
	"github.com/yoko/blog/graph/models"

	"github.com/yoko/blog/graph/repositories/passwordrepo"
	"github.com/yoko/blog/graph/repositories/userrepo"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo    userrepo.Repo
	PwdRepo passwordrepo.PwdRepo
	Rds     rdms.RandomString
	hmac    hmachash.HMAC
	pepper  string
}

// @User _ GetByID
func (us *UserService) GetByID(id string) (*models.User, error) {
	if id == "" {
		return nil, errors.New("id param is required")
	}
	user, err := userrepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// @User _ GetByEmail
func (us *UserService) GetByEmail(email string) (*models.User, error) {
	if email == "" {
		return nil, errors.New("email(string) is required")
	}
	user, err := us.Repo.GetByEmail(email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// @User _ Create
func (us *UserService) Create(tx *gorm.DB, user *models.User) error {
	hashedPass, err := us.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPass
	return us.Repo.Create(tx, user)
}

// @User _ Update
func (us *UserService) Update(user *models.User) error {
	return us.Repo.Update(user)
}

// @User _ HashPassword
func (us *UserService) HashPassword(rawPassword string) (string, error) {
	passAndPepper := rawPassword + us.pepper
	hashed, err := bcrypt.GenerateFromPassword([]byte(passAndPepper), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashed), err
}

// @User _ ComparePassword
func (us *UserService) ComparePassword(rawPassword string, passwordFromDB string) error {
	return bcrypt.CompareHashAndPassword(
		[]byte(passwordFromDB),
		[]byte(rawPassword+us.pepper),
	)
}

// @User _ Delete
func (us *UserService) Delete(user *models.User) error {
	return us.Repo.Delete(user)
}

// @User _ InitiateResetPassowrd
func (us *UserService) InitiateResetPassword(email string) (string, error) {
	user, err := us.Repo.GetByEmail(email)
	if err != nil {
		return "", err
	}

	// tokenを生成
	token, err := us.Rds.GenerateToken()
	if err != nil {
		return "", err
	}

	hashedToken := hmachash.Hash(token)

	pwd := models.PasswordReset{
		UserID: user.ID,
		Token:  hashedToken,
	}

	u, _ := uuid.NewRandom()
	pwd.ID = strings.Replace(u.String(), "-", "", -1)

	err = us.PwdRepo.Create(&pwd)
	if err != nil {
		return "", err
	}
	return token, nil
}

// @User _ CompleteUpdatePassword
func (us *UserService) CompleteUpdatePassword(token, newPassword string) (*models.User, error) {
	hashedToken := hmachash.Hash(token)

	pwr, err := us.PwdRepo.GetOneByToken(hashedToken)
	if err != nil {
		return nil, err
	}

	// If the password rest is over 1 hours old, it is invalid
	if time.Now().Sub(pwr.CreatedAt) > (1 * time.Hour) {
		return nil, errors.New("Invalid Token")
	}

	user, err := userrepo.GetByID(pwr.UserID)
	if err != nil {
		return nil, err
	}

	hashedPass, err := us.HashPassword(newPassword)
	if err = us.Repo.Update(user); err != nil {
		return nil, err
	}

	user.Password = hashedPass
	if err = us.Repo.Update(user); err != nil {
		return nil, err
	}

	if err = us.PwdRepo.Delete(pwr.ID); err != nil {
		fmt.Println("Failed to delete passwordreset record", pwr.ID, err.Error())
	}
	return user, nil
}
