package models

import "github.com/yoko/blog/graph/validator"

func (r RegisterInput) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("email", r.Email)
	v.IsEmail("email", r.Email)

	v.Required("password", r.Password)
	v.MinLength("password", r.Password, 8)

	v.Required("confirmPassword", r.ConfirmPassword)
	v.EqualToField("confirmPassword", r.ConfirmPassword, "password", r.Password)

	v.Required("firstName", r.FirstName)
	v.MinLength("firstName", r.FirstName, 2)

	v.Required("lastName", r.LastName)
	v.MinLength("lastName", r.LastName, 2)

	return v.IsValid(), v.Errors
}

func (l LoginInput) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("email", l.Email)
	v.IsEmail("email", l.Email)

	v.Required("password", l.Password)

	return v.IsValid(), v.Errors
}

func (u UpdateUser) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("firstName", u.FirstName)
	v.MinLength("firstName", u.FirstName, 2)

	v.Required("lastName", u.LastName)
	v.MinLength("lastName", u.LastName, 2)

	v.Required("email", u.Email)
	v.IsEmail("email", u.Email)

	return v.IsValid(), v.Errors
}

func (c NewBlog) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("title", c.Title)
	v.MinLength("title", c.Title, 1)

	v.Required("text", c.Text)
	v.MinLength("text", c.Text, 3)

	return v.IsValid(), v.Errors
}

func (ub UpdateBlog) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("title", ub.Title)
	v.MinLength("title", *ub.Title, 1)

	v.Required("text", ub.Text)
	v.MinLength("text", *ub.Text, 3)

	return v.IsValid(), v.Errors
}

func (co NewComment) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("comment", co.Comment)
	v.MinLength("comment", co.Comment, 3)

	return v.IsValid(), v.Errors
}

func (ca CategoryInput) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("category", ca.Name)
	v.MinLength("comment", ca.Name, 2)

	return v.IsValid(), v.Errors
}

func (bf BlogFilter) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("title", bf.Title)
	v.MinLength("title", *bf.Title, 1)

	return v.IsValid(), v.Errors
}

func (p ResetPassword) Validate() (bool, map[string]string) {
	v := validator.New()

	v.Required("password", p.Password)
	v.MinLength("password", p.Password, 8)

	v.Required("confirmPassword", p.ConfirmPassword)
	v.EqualToField("confirmPassword", p.ConfirmPassword, "password", p.Password)

	return v.IsValid(), v.Errors
}
