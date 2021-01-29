package models

import (
	"fmt"
	"io"
	"strconv"
)

// 並べ替え条件
type EdgeOrder struct {
	// ソート方向
	Direction OrderDirection `json:"direction"`
}

func (o *EdgeOrder) ExistsOrder() bool {
	return o != nil
}

type OrderDirection string

const (
	// 昇順
	OrderDirectionAsc OrderDirection = "ASC"
	// 降順
	OrderDirectionDesc OrderDirection = "DESC"
)

var AllOrderDirection = []OrderDirection{
	OrderDirectionAsc,
	OrderDirectionDesc,
}

func (e OrderDirection) IsValid() bool {
	switch e {
	case OrderDirectionAsc, OrderDirectionDesc:
		return true
	}
	return false
}

func (e OrderDirection) String() string {
	return string(e)
}

func (e *OrderDirection) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = OrderDirection(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid OrderDirection", str)
	}
	return nil
}

func (e OrderDirection) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
