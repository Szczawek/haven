package main

import (
	"api/roots/account"
	"api/roots/config"
	"api/roots/connect"
	"api/roots/database"
	"api/roots/session"
	"api/roots/shop"
	"fmt"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
	"time"
)

type Person struct {
	ID   int
	Name string
}

func main() {
	if err := db.Init(); err != nil {
		fmt.Printf("error: %#v\n", err)
	}

	r := chi.NewRouter()
	api := &http.Server{
		Addr:           ":3000",
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	r.Use(config.CorsConfig)
	r.NotFound(config.NotFound)
	r.Post("/api/login-to-account", account.LoginToAccount)
	r.Post("/api/create-account", account.CreateAccount)
	r.Get("/api/auto-login", account.AutoLogin)
	r.Get("/api", connect.AccessPoint)
	r.Post("/api/logout", session.Logout)
	r.Post("/api/add-item", shop.AddItem)
	fmt.Println("https://127.0.0.1:3000")
	log.Fatal(api.ListenAndServeTLS("ssl/api.cert", "ssl/api.key"))
}
