package emailservice

import "github.com/yoko/blog/graph/infra/sendgridclient"

type EmailService struct {
	client sendgridclient.SendGridClient
}

func (es *EmailService) Welcome(toEmail string) error {
	return es.client.Welcome(welcomeSubject, welcomeText, toEmail, welcomeHTML)
}

func (es *EmailService) ResetPassword(toEmail, token string) error {
	return es.client.ResetPassword(resetSubject, resetTextTmpl, toEmail, resetHTMLTmpl, token)
}
