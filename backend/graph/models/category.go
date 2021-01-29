package models

import (
	"time"
)

type Category struct {
	ID        string     `json:"categoryid"`
	UserID    string     `json:"user_id"`
	Name      string     `gorm:"not null;unique_index:idx_name"`
	CreatedAt time.Time  `gorm:"index;not null;default:CURRENT_TIMESTAMP"`
	UpdatedAT *time.Time `gorm:"index"`
	Blogs     []*Blog
}
