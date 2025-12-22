package config

import (
	"github.com/go-chi/cors"
)

var CorsConfig = cors.Handler(cors.Options{
	AllowedOrigins:   []string{"https://127.0.0.1"},
	AllowedMethods:   []string{"GET", "PUT", "POST"},
	AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
	AllowCredentials: true,
	MaxAge:           300,
})
