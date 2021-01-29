package passwordrepo

import (
	"github.com/jinzhu/gorm"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
)

type PwdRepo struct {
	db *gorm.DB
}

func (repo *PwdRepo) GetOneByToken(token string) (*models.PasswordReset, error) {
	var pwr models.PasswordReset
	if err := database.DB.Where("token = ?", token).First(&pwr).Error; err != nil {
		return nil, err
	}
	return &pwr, nil
}

func (repo *PwdRepo) Create(pwr *models.PasswordReset) error {
	return database.DB.Create(pwr).Error
}

func (repo *PwdRepo) Delete(id string) error {
	pwr := models.PasswordReset{
		ID: id,
	}
	return database.DB.Delete(&pwr).Error
}
