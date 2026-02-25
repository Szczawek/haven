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
	apiR := chi.NewRouter()
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
	r.Mount("/api", apiR)
	r.Get("/start-session", middleware.ActiveSession)

	// apiR.Use(middleware.doorTwo);
	apiR.Post("/login-to-account", account.LoginToAccount)
	apiR.Post("/create-account", account.CreateAccount)
	apiR.Get("/auto-login", account.AutoLogin)
	apiR.Post("/logout", session.Logout)
	apiR.Post("/add-item", shop.AddItem)
	apiR.Post("/add-post", blog.AddPost)
	apiR.Get("/get-posts", blog.GetPosts)

	fmt.Println("https://127.0.0.1:3000")
	log.Fatal(api.ListenAndServeTLS(cert, key))
}
