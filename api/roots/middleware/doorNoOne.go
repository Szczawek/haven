package middleware

import (
	"fmt"
	"net/http"
//    "api/roots/session"
)

var GlobalToken string;

func GateOne(next http.Handler, err error) http.Handler {
	if err != nil {
        fmt.Println("sdsd")
	}

    if(GlobalToken == "") {
    } 

	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		next.ServeHTTP(res, req)
	})
}
