package session

import (
	"net/http"
	"time"
)

func Login(res http.ResponseWriter, id string) {
	cookies := &http.Cookie{
		Name:     "session",
		Value:    id,
		Secure:   true,
		HttpOnly: true,
		MaxAge:   60 * 60 * 24 * 7,
		Expires:  time.Now().Add(24 * 7 * time.Hour),
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(res, cookies)
}
