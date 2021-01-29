// Blog Repository

package blogrepo

import (
	"context"
	"errors"
	"fmt"
	"sort"

	"github.com/jinzhu/gorm"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/models"
	"github.com/yoko/blog/graph/util"
)

type Repo struct {
	DB *gorm.DB
}

// @Blog _ GetByBlogID
func GetByBlogID(id string) (*models.Blog, error) {
	var blog models.Blog
	if err := database.DB.Where("id = ?", id).Find(&blog).Error; err != nil {
		return nil, err
	}
	return &blog, nil
}

// @Blog _ Update
func BlogUpdate(blog *models.Blog) (*models.Blog, error) {
	if err := database.DB.Model(&blog).Where("id = ?", blog.ID).Save(blog).Error; err != nil {
		return nil, err
	}
	return blog, nil
}

// @Blog _ Delete
func (repo *Repo) BlogDelete(blog *models.Blog) error {
	var comment models.Comment
	var like models.Like
	var image models.Image

	if ok := database.DB.Model(&blog).Where("id = ?", blog.ID).Delete(blog); ok != nil {
		database.DB.Model(&comment).Where("blog_id = ?", blog.ID).Delete(comment)
		database.DB.Model(&like).Where("blog_id = ?", blog.ID).Delete(like)
		database.DB.Model(&image).Where("blog_id = ?", blog.ID).Delete(image)
	}
	return nil
}

// @Blog _ Create
func (repo *Repo) BlogCreate(tx *gorm.DB, blog *models.Blog) error {
	if err := tx.Create(blog).Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

// @Blog _ GetBlogs
func GetBlogs(filter *models.BlogFilter, limit, offset *int) ([]*models.Blog, error) {
	var blogs []*models.Blog

	// Find 全てのレコードを取得する
	// First 主キーでソートし、最初のレコードを取得する

	query := database.DB.Order("id")

	// if filter != nil {
	// 条件に一致したレコードを取得します
	if filter.Title != nil && *filter.Title != "" && limit != nil && offset != nil {
		if err := query.Where("title LIKE ?", fmt.Sprintf("%%%s%%", *filter.Title)).Limit(*limit).Offset(*offset).Find(&blogs).Error; err != nil {
			return nil, err
		}
	}
	// }

	// limit関数で取得するレコードの最大数を指定します。

	// Offset関数で取得レコードの先頭いくつをスキップするかを指定します

	// Select関数でカラムを指定します。

	return blogs, nil
}

// @Blog _ GetCommentsForBlog
func GetCommentsForBlog(blog *models.Blog) ([]*models.Comment, error) {
	var comments []*models.Comment
	if err := database.DB.Where("blog_id = ?", blog.ID).Order("id").Select("id, comment").Find(&comments).Error; err != nil {
		return nil, err
	}
	return comments, nil
}

// @Blog _ GetLikesForBlog
func GetLikesForBlog(blog *models.Blog) ([]*models.Like, error) {
	var likes []*models.Like
	if err := database.DB.Where("blog_id = ?", blog.ID).Order("id").Find(&likes).Error; err != nil {
		return nil, err
	}
	return likes, nil
}

// @Blog _ GetCommentsForUser
func GetUserBlog(id string) (*models.User, error) {
	var user *models.User
	if err := database.DB.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func GetBlogList() ([]*models.Blog, error) {
	var blogs []*models.Blog
	query := database.DB.Order("id")

	if err := query.Find(&blogs).Error; err != nil {
		return nil, err
	}

	return blogs, nil
}

type BlogDao interface {
	CountByTextFilter(ctx context.Context, filterWord *models.TextFilterCondition) (int64, error)
	FindByCondition(ctx context.Context, filterWord *models.TextFilterCondition, pageCondition *models.PageCondition, edgeOrder *models.EdgeOrder) ([]*models.Blog, error)
}

func NewBlogDao(db *gorm.DB) BlogDao {
	return &Repo{DB: db}
}

// ブログのトータル数を返却
func (repo *Repo) CountByTextFilter(ctx context.Context, filterWord *models.TextFilterCondition) (int64, error) {
	// 絞り込み無しのパターン
	if filterWord == nil || filterWord.FilterWord == "" {
		var cnt int64
		var blogs []*models.Blog
		if err := database.DB.Model(&blogs).Count(&cnt).Error; err != nil {
			return 0, errors.New("err refined search")
		}
		return cnt, nil
	}
	// デフォルトは部分一致
	matchStr := filterWord.FilterWord
	if filterWord.MatchingPattern != nil && *filterWord.MatchingPattern == models.MatchingPatternExactMatch {
		matchStr = filterWord.FilterWord
	}
	// Where("title LIKE ?", fmt.Sprintf("%%%s%%", *filter.Title)).Limit(*limit).Offset(*offset).Find(&blogs).Error
	fmt.Printf("%v\n", matchStr)
	var cnt int64
	var blogs []*models.Blog
	res := database.DB.Where("title LIKE ?", fmt.Sprintf("%%%s%%", matchStr)).Find(&blogs).Count(&cnt)
	if res.Error != nil {
		return 0, res.Error
	}
	return cnt, nil
}

func (repo *Repo) FindByCondition(ctx context.Context, filterCondition *models.TextFilterCondition, pageCondition *models.PageCondition, edgeOrder *models.EdgeOrder) ([]*models.Blog, error) {

	// 条件によらず固定の部分
	base := database.DB

	/*
	 * 文字列フィルタ条件が指定されていた場合
	 */
	if filterCondition.ExistsFilter() {
		// デフォルトは部分一致(例：「テスト」 -> 「%テスト%」)
		matchStr := filterCondition.MatchString()
		fmt.Printf("%v\n", matchStr)
		// todoテーブルのtextカラムかuserテーブルのnameカラムとLIKE検索
		base = base.Where("title LIKE ?", fmt.Sprintf("%%%s%%", matchStr))
	}

	/*
	 * ページング指定無しの初期ページビュー
	 */
	if pageCondition.IsInitialPageView() {
		if pageCondition.HasInitialLimit() {
			if edgeOrder.ExistsOrder() {
				switch edgeOrder.Direction {
				case models.OrderDirectionAsc:
					base = base.Order("updated_at asc").Limit(*pageCondition.InitialLimit)
				case models.OrderDirectionDesc:
					base = base.Order("updated_at desc").Limit(*pageCondition.InitialLimit)
				}
			} else {
				base = base.Order("updated_at").Limit(*pageCondition.InitialLimit)
			}
		}
	}

	if pageCondition.ExistsPaging() && edgeOrder.ExistsOrder() {

		switch edgeOrder.Direction {

		/*
		 *　★ 7, 8, 9, 10, 11 の昇順で並んでいる場合
		 */
		case models.OrderDirectionAsc:

			// 次ページ
			if pageCondition.Forward != nil {
				// 「このレコードよりも後のレコードを取得」という条件に使うための比較対象レコードを取得
				target, err := repo.getCompareTarget(pageCondition.Forward.After)
				if err != nil {
					return nil, err
				}
				base = base.Order("updated_at asc").Where("updated_at > ?", target.UpdatedAt).Limit(pageCondition.Forward.First)
			}

			// 前ページ
			if pageCondition.Backward != nil {
				// 「このレコードよりも前のレコードを取得」という条件に使うための比較対象レコードを取得
				target, err := repo.getCompareTarget(pageCondition.Backward.Before)
				if err != nil {
					return nil, err
				}
				base = base.Order("updated_at desc").Where("updated_at < ?", target.UpdatedAt).Limit(pageCondition.Backward.Last)
			}
		/*
		 *　★ 11, 10, 9, 8, 7 の降順で並んでいる場合
		 */
		case models.OrderDirectionDesc:

			// 次ページ
			if pageCondition.Forward != nil {
				// 「このレコードよりも後のレコードを取得」という条件に使うための比較対象レコードを取得
				target, err := repo.getCompareTarget(pageCondition.Forward.After)
				if err != nil {
					return nil, err
				}
				base = base.Order("updated_at desc").Where("updated_at < ?", target.UpdatedAt).Limit(pageCondition.Forward.First)
			}

			// 前ページ
			if pageCondition.Backward != nil {
				// 「このレコードよりも前のレコードを取得」という条件に使うための比較対象レコードを取得
				target, err := repo.getCompareTarget(pageCondition.Backward.Before)
				if err != nil {
					return nil, err
				}
				base = base.Order("updated_at asc").Where("updated_at > ?", target.UpdatedAt).Limit(pageCondition.Backward.Last)
			}
		}
	}

	var results []*models.Blog
	if err := base.Find(&results).Error; err != nil {
		return nil, err
	}

	if edgeOrder.ExistsOrder() {
		reOrder(results, edgeOrder)
	}

	return results, nil
}

func reOrder(results []*models.Blog, edgeOrder *models.EdgeOrder) {
	if results == nil {
		return
	}
	if len(results) == 0 {
		return
	}
	if edgeOrder.Direction == models.OrderDirectionAsc {
		sort.Slice(results, func(i int, j int) bool {
			return results[i].UpdatedAt.String() < results[j].UpdatedAt.String()
		})
	}
	if edgeOrder.Direction == models.OrderDirectionDesc {
		sort.Slice(results, func(i int, j int) bool {
			return results[i].UpdatedAt.String() > results[j].UpdatedAt.String()
		})
	}
}

func (repo *Repo) getCompareTarget(cursor *string) (*models.Blog, error) {
	if cursor == nil {
		return nil, errors.New("cursor is nil")
	}
	_, blogID, err := util.DecodeCursor(*cursor)
	if err != nil {
		return nil, err
	}

	// 比較対象カーソルに該当するレコードを取得
	var target models.Blog
	if err := database.DB.Where("id = ?", blogID).First(&target).Error; err != nil {
		return nil, err
	}
	// 前ページのラストのNodeの位置情報を持つBLOG
	return &target, nil
}

func col_ASC(o *models.EdgeOrder) string {
	// 書式指定子に沿ってフォーマットした文字列を返してくれる。
	return fmt.Sprintf("%s", models.OrderDirectionAsc.String())
}

func col_DESC(o *models.EdgeOrder) string {
	// 書式指定子に沿ってフォーマットした文字列を返してくれる。
	return fmt.Sprintf("%s", models.OrderDirectionDesc.String())
}

// @Blog _ GetImageUser
func GetImageForBlog(blog *models.Blog) ([]*models.Image, error) {
	var image []*models.Image
	if err := database.DB.Where("blog_id = ?", blog.ID).Order("id").Select("name").Find(&image).Error; err != nil {
		return nil, err
	}
	return image, nil
}
