package validator

import (
	"fmt"
	"reflect"
)

// Requiredの値
func (v *Validator) Required(field string, value interface{}) bool {
	// field = stringじゃないならokにfalseが入る。
	if _, ok := v.Errors[field]; ok {
		return false
	}

	if IsEmpty(value) {
		v.Errors[field] = fmt.Sprintf("%s is required", field)
		return false
	}

	return true
}

// 空かどうか
func IsEmpty(value interface{}) bool {
	// reflect.Value型に変換
	t := reflect.ValueOf(value)

	// Kindでint, struct, mapなどの型種別が取得できる
	switch t.Kind() {
	case reflect.String, reflect.Array, reflect.Slice, reflect.Map:
		// 文字数がないならtrueあるならfalse
		return t.Len() == 0
	}

	return false
}
