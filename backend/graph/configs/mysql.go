package configs

import (
	"fmt"
	"os"
)

// MysqlConfig object
type MysqlConfig struct {
	USER     string `env:"DB_USER"`
	PASS     string `env:"DB_PASS"`
	PROTOCOL string `env:"DB_PROTOCOL"`
	DBNAME   string `env:"DB_NAME"`
}

// Dialect returns "mysql"
func (c MysqlConfig) Dialect() string {
	return "mysql"
}

// GetMysqlConnectionInfo returns Postgres URL string
func (c MysqlConfig) GetMysqlConnectionInfo() string {
	if c.PASS == "" {
		return fmt.Sprint(
			c.USER + ":" + c.PROTOCOL + "/" + c.DBNAME)
	}
	return fmt.Sprint(
		c.USER + ":" + c.PASS + "@" + c.PROTOCOL + "/" + c.DBNAME)
}

// GetMysqlConfig returns PostgresConfig object
func GetMysqlConfig() MysqlConfig {
	return MysqlConfig{
		USER:     os.Getenv("DB_USER"),
		PROTOCOL: os.Getenv("DB_PROTOCOL"),
		PASS:     os.Getenv("DB_PASS"),
		DBNAME:   os.Getenv("DB_NAME"),
	}
}
