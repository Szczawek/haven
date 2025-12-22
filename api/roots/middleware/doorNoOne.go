package middleware

import (
	"fmt"
	"net/http"
)

func GateOne(next http.Handler, err error) http.Handler {
	if err != nil {
		fmt.Println("sdsd")
	}
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		next.ServeHTTP(res, req)
	})
}
