package middleware

import (
	"fmt"
	"net/http"
)

func AuthDoor(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		cookie, err := req.Cookie("session")
		value := cookie.Value
		if err != nil {
			http.Error(res, "Not logged!", http.StatusUnauthorized)
			return
		}
		fmt.Println(value)
		next.ServeHTTP(res, req)
	})
}
