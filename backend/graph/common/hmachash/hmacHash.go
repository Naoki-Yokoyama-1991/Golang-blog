package hmachash

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"hash"
	"os"
)

type HMAC struct {
	hmac hash.Hash
}

func NewHMAC(key string) hash.Hash {
	hm := hmac.New(sha256.New, []byte(key))
	return hm
}

// ハッシュは、HMACを使用して提供された入力文字列をハッシュします
// HMACオブジェクトの作成時に提供された秘密鍵
func Hash(input string) string {
	h := NewHMAC(os.Getenv("HMAC_KEY"))
	h.Reset()
	// サーバーサイドに送りたいデータを書きこむ
	h.Write([]byte(input))
	// 終わりのnilをたす
	hashedData := h.Sum(nil)
	return base64.URLEncoding.EncodeToString(hashedData)
}

// type HMAC struct {
// 	hmac hash.Hash
// }

// func NewHMAC(key string) HMAC {
// 	h := hmac.New(sha256.New, []byte(key))
// 	return HMAC{
// 		hmac: h
// 	}
// }

// //ハッシュは、HMACを使用して提供された入力文字列をハッシュします
// // HMACオブジェクトの作成時に提供された秘密鍵
// func (h HMAC) Hash(input string) string {
// 	h.hmac.Reset()
// 	h.hmac.Write([]byte(input))
// 	hashedData := h.hmac.Sum(nil)
// 	return base64.URLEncoding.EncodeToString(hashedData)
// }
