package models

import "time"

// Image .
type Image struct {
	ID        string     `json:"id"`
	UserID    string     `json:"user_id"`
	BlogID    string     `json:"blog_id`
	Name      string     `gorm:"not null;unique_index:idx_name"`
	CreatedAt time.Time  `gorm:"index;not null;default:CURRENT_TIMESTAMP"`
	UpdatedAT *time.Time `gorm:"index"`
}
