package session

import (
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"time"
)

type CustomClaims struct {
	ID string `json:"id"`
	jwt.RegisteredClaims
}

func createToken(id string) (string, error) {
	privKey := os.Getenv("JWT_PRIVATE_KEY")
	key, err := jwt.ParseEdPrivateKeyFromPEM([]byte(privKey))
	if err != nil {
		return "", err
	}

	var claims = CustomClaims{ID: id}
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)
	signedToken, err := token.SignedString(key)

	return signedToken, err
}

func SetSession(res http.ResponseWriter, id string) {
	token, err := createToken(id)
	if err != nil {
		http.Error(res, "JWT token error", http.StatusInternalServerError)
		return
	}

	cookie := &http.Cookie{
		Name:     "auth",
		Value:    token,
		Secure:   true,
		HttpOnly: true,
		MaxAge:   60 * 60 * 24 * 7,
		Expires:  time.Now().Add(24 * 7 * time.Hour),
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(res, cookie)
	res.Write([]byte("logged!"))
}
