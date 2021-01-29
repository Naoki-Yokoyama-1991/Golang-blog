package models

import "time"

// User domain model
type User struct {
	ID        string    `json:"id"`
	Email     string    `gorm:"size:255; UNIQUE_INDEX"`
	Password  string    `gorm:"NOT NULL"`
	FirstName string    `gorm:"size:255"`
	LastName  string    `gorm:"size:255"`
	Role      string    `gorm:"NOT_NULL;size:255;DEFAULT:'standard'"`
	Active    bool      `gorm:"NOT NULL; DEFAULT: true"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	ImageURL  string    `gorm:"type:TEXT"`
}

// func (c *User) IsOwner(user *User) bool {
// 	return c.ID == user.ID
// }
