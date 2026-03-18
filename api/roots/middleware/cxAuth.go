package middleware

import (
	"fmt"
	"net/http"
	"time"
)

func CxAuth(res http.ResponseWriter, req *http.Request) error {
	token, err := req.Cookie("csrtToken")

	if err != nil {
		cookie := &http.Cookie{
			Name:     "csrtToken",
			Value:    "1",
			HttpOnly: false,
			Secure:   true,
			Path:     "/",
			MaxAge:   60 * 15,
			Expires:  time.Now().Add(15 * time.Minute),
			SameSite: http.SameSiteLaxMode,
		}
		http.SetCookie(res, cookie)
		res.Write([]byte("csrf token added!"))
		return err
	}
	value := req.Header.Get("cx-token")
	fmt.Println(value)
	fmt.Println(token.Value)
	if token.Value != value {
		http.Error(res, "csrf token error", http.StatusInternalServerError)
		return fmt.Errorf("csrf error")
	}
	return nil
}
