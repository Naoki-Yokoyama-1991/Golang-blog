package sendgridclient

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/yoko/blog/graph/configs"
)

type SendGridClient struct {
}

func (sg *SendGridClient) Welcome(subject, toEmail, text, htmlStr string) error {
	config := configs.GetConfig()

	fromName := strings.ToUpper(strings.Split(config.FromEmail, "@")[0])
	from := mail.NewEmail(fromName, config.FromEmail)

	toName := strings.ToUpper(strings.Split(toEmail, "@")[0])
	to := mail.NewEmail(toName, toEmail)

	message := sg.createNewMessage(
		from,
		subject,
		to,
		text,
		htmlStr,
	)
	ctx, cancel := sg.setContext(10)
	defer cancel()
	return sg.send(ctx, message)
}

func (sg *SendGridClient) ResetPassword(subject, text, toEmail, htmlStr, token string) error {

	config := configs.GetConfig()
	// url.Values{}はクエリパラメータをkey-value形式で保持する型を定義(http://gaforum.jp/"?s=gaiq")
	// v := url.Values{}
	// v.Set("token", token)

	//組み立てたクエリはEncodeメソッドを呼び出す事で?key1=value1&keyN=valueN形式に変換することが出来る
	fromName := strings.ToUpper(strings.Split(config.FromEmail, "@")[0])
	from := mail.NewEmail(fromName, config.FromEmail)
	toName := strings.ToUpper(strings.Split(toEmail, "@")[0])
	to := mail.NewEmail(toName, toEmail)
	// resetURL := sg.getURL() + "/password/" + v.Encode()
	resetURL := sg.getURL() + "/password/" + token
	resetText := fmt.Sprintf(text, resetURL, token)
	resetHTML := fmt.Sprintf(htmlStr, resetURL, token)

	message := sg.createNewMessage(from, subject, to, resetText, resetHTML)

	// 	response, err := client.Send(message)

	ctx, cancel := sg.setContext(10)
	defer cancel()
	return sg.send(ctx, message)

	// if err != nil {
	// 	return "Failed to send email via sendgrid client", err
	// }
	// return fmt.Sprintf("Sent the email with status code: %s", http.StatusText(response.StatusCode)), nil
}

func (sg *SendGridClient) getURL() string {
	config := configs.GetConfig()

	url := "http://" + config.Host + ":" + config.ClientPort
	return url
}

func (sg *SendGridClient) setContext(seconds time.Duration) (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), time.Second*seconds)
}

func (sg *SendGridClient) createNewMessage(from *mail.Email, subject string, to *mail.Email, text string, htmlStr string) *mail.SGMailV3 {
	message := mail.NewSingleEmail(
		from,
		subject,
		to,
		text,
		htmlStr,
	)
	return message
}

func (sg *SendGridClient) send(ctx context.Context, message *mail.SGMailV3) error {
	config := configs.GetConfig()

	client := sendgrid.NewSendClient(config.Sendgrid.APIKey)
	_, err := client.Send(message)
	if err != nil {
		return err
	}
	return nil
}
