package randomstring

import (
	// 強い乱数
	"crypto/rand"
	"encoding/base64"
)

const TokenBytes = 32

type RandomString struct{}

// Generate token of a predetermined byte size.
// Generate a byte slice of size nBytes and then
// return a string that is the base64 URL encoded version
// of that byte slice
func (rd *RandomString) GenerateToken() (string, error) {
	b, err := rd.generateRandomBytes(TokenBytes)
	if err != nil {
		return "", err
	}
	// base64とは、64進数を意味する言葉で、すべてのデータをアルファベット(a~z, A~z)と数字(0~9)、一部の記号(+,/)の64文字で表すエンコード方式です
	// URLEncodingとは、URLで使えない文字を別の表現に置き換えることなんだな～
	return base64.URLEncoding.EncodeToString(b), nil
}

func (rd *RandomString) generateRandomBytes(n int) ([]byte, error) {
	// バイト型のスライス長さキャパ・キャパシティー 32
	b := make([]byte, n)
	// Readメソッドの引数に指定した[]byteスライスに内容が読み込まれます。
	// ランダムの整数を32個生成
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}
	return b, nil
}
