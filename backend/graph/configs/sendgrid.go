package configs

import (
	"os"
)

// SendGridConfig object
type SendGridConfig struct {
	APIKey string `env:"SENDGRID_API_KEY"`
}

// GetSendGridConfig get Mainlgun config object
func GetSendGridConfig() SendGridConfig {
	return SendGridConfig{
		APIKey: os.Getenv("SENDGRID_API_KEY"),
	}
}
