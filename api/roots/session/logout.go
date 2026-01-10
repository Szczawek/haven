package session

import (
	"net/http"
)

func Logout(res http.ResponseWriter, req *http.Request) {
	cookie := &http.Cookie{
		Name:   "session",
		MaxAge: -1,
        Secure: true,
        HttpOnly: true,
    }
	http.SetCookie(res, cookie)
}
