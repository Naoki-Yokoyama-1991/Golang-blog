package models

import "time"

type PasswordReset struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Token     string    `gorm:"not null;unique_index"`
	Password  string    `gorm:"NOT NULL"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
