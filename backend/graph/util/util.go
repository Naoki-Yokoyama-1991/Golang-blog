package util

import (
	"encoding/base64"
	"fmt"
	"strings"
)

func CreateCursor(modelName, uniqueKey string) string {
	return base64.RawURLEncoding.EncodeToString([]byte(fmt.Sprintf("%s#####%s", modelName, uniqueKey)))
}

func DecodeCursor(cursor string) (string, string, error) {
	byteArray, err := base64.RawURLEncoding.DecodeString(cursor)
	if err != nil {
		return "", "", err
	}
	// 第1引数に値,第2引数に区切り文字列,第3引数に配列の長さを指定
	elements := strings.SplitN(string(byteArray), "#####", 2)
	return elements[0], elements[1], nil
}
