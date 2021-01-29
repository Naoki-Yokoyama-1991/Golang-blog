package aws

import (
	"bytes"
	"fmt"
	"net/http"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/awsutil"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/yoko/blog/graph/configs"
)

type S3 struct {
	APPID  string
	SECRET string
}

// func NewS3(appid, secret string) *S3 {
// 	objs := &S3{APPID: appid, SECRET: secret}
// 	return objs
// }

// type S3Interface interface {
// 	PostImageToS3(image graphql.Upload) error
// }

func (objs *S3) PostImageToS3(image graphql.Upload) (string, error) {
	if image.ContentType != "image/png" && image.ContentType != "image/jpeg" {
		return "", fmt.Errorf("bad content type: %s", image.ContentType)
	}

	config := configs.GetConfig()
	ob := S3{APPID: config.Access_Key_Id, SECRET: config.Secret_Access_Key}
	creds := credentials.NewStaticCredentials(ob.APPID, ob.SECRET, "")

	cfg := aws.NewConfig().WithRegion("ap-northeast-1").WithCredentials(creds)
	svc := s3.New(session.New(), cfg)

	size := image.Size
	// バイナリデータを扱う
	buffer := make([]byte, size)
	// バイト列を読み出す
	image.File.Read(buffer)
	// メモリの情報を直接渡す
	fileBytes := bytes.NewReader(buffer)
	fileType := http.DetectContentType(buffer)
	path := "/images/" + image.Filename
	fmt.Println(path)
	fmt.Println(size)
	// fmt.Println(fileBytes)
	// image upload
	params := &s3.PutObjectInput{
		Bucket:        aws.String("goblogbucket"),
		Key:           aws.String(path),
		Body:          fileBytes,
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(fileType),
	}
	resp, err := svc.PutObject(params)
	if err != nil {
		return "", fmt.Errorf("err %s", err)
	}

	//url 取得
	param := &s3.GetObjectInput{
		Bucket: aws.String("goblogbucket"),
		Key:    aws.String(path),
	}
	req, _ := svc.GetObjectRequest(param)

	url, err := req.Presign(15 * time.Minute)
	if err != nil {
		return "", fmt.Errorf("err %s", err)
	}
	fmt.Println(url)
	fmt.Printf("response %s", awsutil.StringValue(resp))

	return url, nil
}

func (objs *S3) DeleteS3Image(imageName string) error {
	config := configs.GetConfig()
	ob := S3{APPID: config.Access_Key_Id, SECRET: config.Secret_Access_Key}
	creds := credentials.NewStaticCredentials(ob.APPID, ob.SECRET, "")

	cfg := aws.NewConfig().WithRegion("ap-northeast-1").WithCredentials(creds)
	svc := s3.New(session.New(), cfg)

	path := "/images/" + imageName

	input := &s3.DeleteObjectInput{
		Bucket: aws.String("goblogbucket"),
		Key:    aws.String(path),
	}

	result, err := svc.DeleteObject(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			default:
				fmt.Println(aerr.Error())
			}
		} else {
			fmt.Println(err.Error())
		}
		return err
	}

	fmt.Println(result)
	return err
}

func (objs *S3) GetImageToS3(imageName string) (string, error) {

	config := configs.GetConfig()
	ob := S3{APPID: config.Access_Key_Id, SECRET: config.Secret_Access_Key}
	creds := credentials.NewStaticCredentials(ob.APPID, ob.SECRET, "")

	cfg := aws.NewConfig().WithRegion("ap-northeast-1").WithCredentials(creds)
	svc := s3.New(session.New(), cfg)

	path := "/images/" + imageName
	fmt.Println(path)
	// fmt.Println(fileBytes)
	// image upload

	//url 取得
	param := &s3.GetObjectInput{
		Bucket: aws.String("goblogbucket"),
		Key:    aws.String(path),
	}
	req, _ := svc.GetObjectRequest(param)

	url, err := req.Presign(15 * time.Minute)
	if err != nil {
		return "", fmt.Errorf("err %s", err)
	}
	fmt.Println(url)

	return url, nil
}
