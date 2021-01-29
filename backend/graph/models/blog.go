package models

import (
	"time"
)

type Blog struct {
	ID           string     `json:"id"`
	Title        string     `json:"title"`
	Text         string     `json:"text"`
	UserID       string     `json:"user_id"`
	LikeCount    int        `gorm:"default:0" json:"like_count`
	commentCount int        `json:"comment_count"`
	CategoryID   string     `json:"categoryid"`
	CreatedAt    string     `json:"created_at"`
	UpdatedAt    *time.Time `gorm:"index"`
	ImageURL     string     `gorm:"type:TEXT"`
}

func (t *Blog) IsNode() {}

func (b *Blog) IsOwner(user *User) bool {
	return b.UserID == user.ID
}

func EmptyBlogConnection() *BlogConnection {
	return &BlogConnection{
		PageInfo:   &PageInfo{},
		Edges:      []*BlogEdge{},
		TotalCount: 0,
		TotalPage:  0,
	}
}

// ページングを伴う結果返却用
type BlogConnection struct {
	// ページ情報
	PageInfo *PageInfo `json:"pageInfo"`
	// 検索結果一覧（※カーソル情報を含む）
	Edges []*BlogEdge `json:"edges"`
	// 検索結果の全件数
	TotalCount int64 `json:"totalCount"`
	// 検索結果の全頁
	TotalPage int64 `json:"totalPage"`
}

func (BlogConnection) IsConnection() {}

// 検索結果一覧（※カーソル情報を含む）
type BlogEdge struct {
	Node   *Blog  `json:"node"`
	Cursor string `json:"cursor"`
}

func (BlogEdge) IsEdge() {}
