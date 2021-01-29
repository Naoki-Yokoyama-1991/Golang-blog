# ベースとなるDockerイメージ指定
FROM golang:latest
# 環境変数の設定
ENV APP_PORT /backend

ENV DOCKERIZE_VERSION v0.6.1

# 作成者
# MAINTAINER Yokoyama Naoki

# コンテナ内に作業ディレクトリを作成
RUN mkdir $APP_PORT

# コンテナログイン時のディレクトリ指定
WORKDIR $APP_PORT

# ホストのファイルをコンテナの作業ディレクトリに移行
ADD . $APP_PORT

# package download
RUN go get

# ポート番号の指定
EXPOSE 8080

# コンテナ起動時に実行するコマンド
CMD ["go", "run", "main.go"]
