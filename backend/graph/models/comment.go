package models

type Comment struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	BlogID    string `json:"blogID"`
	Comment   string `json;"comment"`
	CreatedAt string `json:"time"` // (My|Postgre)SQL
}

func (c *Comment) IsOwner(user *User) bool {
	return c.UserID == user.ID
}
