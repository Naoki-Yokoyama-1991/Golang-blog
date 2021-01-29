package configs

import (
	"os"
)

// Config object
type Config struct {
	Pepper            string         `env:"PEPPER"`
	Mysql             MysqlConfig    `json:"mysql"`
	Sendgrid          SendGridConfig `json:"sendgrid"`
	JWTSecret         string         `env:"JWT_SIGN_KEY"`
	HMACKey           string         `env:"HMAC_KEY"`
	Host              string         `env:"APP_HOST"`
	ClientPort        string         `env:"CLIENT_APP_PORT"`
	Port              string         `env:"APP_PORT"`
	FromEmail         string         `env:"EMAIL_FROM"`
	Access_Key_Id     string         `env:"ACCESS_KEY_ID"`
	Secret_Access_Key string         `env:"SECRET_ACCESS_KEY"`
}

// GetConfig gets all config for the application
func GetConfig() Config {
	return Config{
		Pepper:            os.Getenv("PEPPER"),
		Mysql:             GetMysqlConfig(),
		Sendgrid:          GetSendGridConfig(),
		JWTSecret:         os.Getenv("JWT_SIGN_KEY"),
		HMACKey:           os.Getenv("HMAC_KEY"),
		Host:              os.Getenv("APP_HOST"),
		Port:              os.Getenv("PORT"),
		ClientPort:        os.Getenv("CLIENT_APP_PORT"),
		FromEmail:         os.Getenv("EMAIL_FROM"),
		Access_Key_Id:     os.Getenv("ACCESS_KEY_ID"),
		Secret_Access_Key: os.Getenv("SECRET_ACCESS_KEY"),
	}
}
