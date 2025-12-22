package config

import (
	"fmt"
	"net/http"
)

func NotFound(res http.ResponseWriter, req *http.Request) {
	res.WriteHeader(404)
	res.Write([]byte("There isn't such a route anvaliable for you."))
	fmt.Println("404 user")
}
