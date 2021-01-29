package models

import "time"

type Like struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	BlogID    string    `json:"blog_id"`
	CreatedAt time.Time `json:"createdAt"`
}
