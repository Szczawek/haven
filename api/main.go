package main

import (
	"api/roots/account"
	"api/roots/blog"
	"api/roots/config"
	"api/roots/database"
	"api/roots/middleware"
	"api/roots/session"
	"api/roots/shop"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	if err := os.Getenv("API_CERT"); err == "" {
		if err := godotenv.Load(".env"); err != nil {
			log.Fatal("Env doesn't work")
		}
	}
	if err := db.Init(); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	r := chi.NewRouter()
	rLog := chi.NewRouter()
	api := &http.Server{
		Addr:           ":3000",
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	cert := os.Getenv("API_CERT")
	key := os.Getenv("API_KEY")

	r.Use(config.CorsConfig)
	r.NotFound(config.NotFound)
	r.Mount("/api/v2", rLog)
	r.Post("/api/login-to-account", account.LoginToAccount)
	r.Post("/api/create-account", account.CreateAccount)
	r.Get("/api/auto-login", account.AutoLogin)
	r.Get("/api/get-posts", blog.GetPosts)
	r.Get("/api/get-user-posts", blog.GetUserPosts)

	rLog.Use(middleware.AuthDoor)
	rLog.Post("/logout", session.Logout)
	rLog.Post("/add-item", shop.AddItem)
	rLog.Post("/add-post", blog.AddPost)

	fmt.Println("https://127.0.0.1:3000")
	log.Fatal(api.ListenAndServeTLS(cert, key))
}
