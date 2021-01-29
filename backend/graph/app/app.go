package app

import (
	"log"
	"net/http"

	"github.com/yoko/blog/graph/configs"

	"github.com/go-chi/chi"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	middlewares "github.com/go-chi/chi/middleware"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"

	// "github.com/yoko/blog/graph/common/hmachash"
	"github.com/rs/cors"
	database "github.com/yoko/blog/graph/database"
	"github.com/yoko/blog/graph/generated"
	dataloder "github.com/yoko/blog/graph/graphql/dataloader"
	graphql "github.com/yoko/blog/graph/graphql/resolver"
	"github.com/yoko/blog/graph/middleware"
	"github.com/yoko/blog/graph/repositories/userrepo"
)

const defaultPort = "8080"

func Run() {
	/*
		====== Setup configs ============
	*/
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	config := configs.GetConfig()

	/*
		====== Setup database ============
	*/
	database.Connection()

	defer database.Close()

	port := config.Port
	host := config.Host
	if port == "" {
		port = defaultPort
	}

	userRepo := userrepo.Repo{DB: database.DB}

	/*
		====== aws s3 ============
	*/
	// aws.NewS3(config.Access_Key_Id, config.Secret_Access_Key)

	/*
		====== router middleware ============
	*/

	var mb int64 = 1 << 20

	router := chi.NewRouter()

	router.Use(cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:8080"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
		ExposedHeaders: []string{"Content-Length", "Link"},
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)
	router.Use(middlewares.RequestID)
	router.Use(middlewares.Logger)
	router.Use(middleware.AuthMiddleware(userRepo))

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graphql.Resolver{}}))

	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{
		MaxMemory:     32 * mb,
		MaxUploadSize: 50 * mb,
	})
	srv.Use(extension.Introspection{})
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", dataloder.DataloaderMiddlewares(srv))

	log.Printf("connect to http://%s:%s/ for GraphQL playground", host, port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
