package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/yoko/blog/graph/configs"
	"github.com/yoko/blog/graph/models"
)

var DB *gorm.DB

func Connection() {

	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	config := configs.GetConfig()
	db, err := gorm.Open(
		config.Mysql.Dialect(),
		config.Mysql.GetMysqlConnectionInfo(),
	)
	if err != nil {
		panic(err)
	}
	DB = db
	DB.LogMode(true)

	DB.AutoMigrate(&models.Category{}, &models.User{}, &models.Blog{}, &models.Comment{}, &models.Like{}, &models.PasswordReset{}, &models.Image{})

}

func Close() {
	if DB == nil {
		return
	}
	DB.Close()
}
