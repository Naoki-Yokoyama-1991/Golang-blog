package main

import (
	"github.com/yoko/blog/graph/app"
	// "github.com/aws/aws-sdk-go/aws"
	// "github.com/aws/aws-sdk-go/aws/session"
	// "github.com/aws/aws-sdk-go/service/s3"
)

func main() {

	// sess := session.Must(session.NewSessionWithOptions(session.Options{
	// 	SharedConfigState: session.SharedConfigEnable,
	// }))

	// targetFilePath := "./ccc.txt"
	// file, err := os.Open(targetFilePath)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer file.Close()

	// bucktName := "goblogbucket"
	// objectKey := "ccc.txt"

	// _, err = s3.New(sess).PutObject(&s3.PutObjectInput{
	// 	Bucket: aws.String(bucktName),
	// 	Key:    aws.String(objectKey),
	// 	ACL:    aws.String("private"),
	// 	Body:   file,
	// })

	// if err != nil {
	// 	log.Fatal(err)
	// }
	// log.Println("done")

	// from := "kionako96@gmail.com"
	// to := "kionako96@gmail.com"

	// // func PlainAuth(identity, username, password, host string) Auth
	// auth := smtp.PlainAuth("", from, "btdooqbqegbjjqkd", "smtp.gmail.com")

	// msg := []byte("" +
	// 	"From: 送信した人 <" + from + ">\r\n" +
	// 	"To: " + to + "\r\n" +
	// 	"Subject: 件名 subject です\r\n" +
	// 	"\r\n" +
	// 	"テスト\r\n" +
	// 	"")

	// // func SendMail(addr string, a Auth, from string, to []string, msg []byte) error
	// err := smtp.SendMail("smtp.gmail.com:587", auth, from, []string{to}, msg)
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "エラー: %v\n", err)
	// 	return
	// }

	// fmt.Print("success")

	app.Run()

}
