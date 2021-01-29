package validator

type Validation interface {
	Validate() (bool, map[string]string)
}

type Validator struct {
	Errors map[string]string
}

// &Validator{Errors: make(map[string]string)}のスライスを作成
func New() *Validator {
	// make(map[<キーの型>]<値の型>) / makeでmap関数を初期化
	return &Validator{Errors: make(map[string]string)}
}

// エラーの数が0ならtrue
func (v *Validator) IsValid() bool {
	return len(v.Errors) == 0
}
