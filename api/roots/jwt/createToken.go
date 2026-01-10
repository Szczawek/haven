package token

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)

const signedKey string = "2323"

type CustomClaims struct {
	id string `json:"id"`
	jwt.RegisteredClaims
}

func CreateToken(key string) (string, error) {
	claims := CustomClaims("1", jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
	})
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(signedKey)
	return ss, err
}
