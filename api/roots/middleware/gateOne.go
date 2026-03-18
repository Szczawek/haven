package middleware

import (
	"net/http"
)

func GateOne(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
        if err := Authentication(res,req); err != nil {
            return;
        }
        if err := CxAuth(res, req); err != nil {
            return;
        }
		next.ServeHTTP(res, req)
	})
}
