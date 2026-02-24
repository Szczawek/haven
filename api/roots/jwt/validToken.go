package jwt 

import(
    "github.com/go-jwt/jwt/v5"
)

func ValidToken(value string) error {
    _, err := jwt.ParseWithClaims(value, &CustomClaims, func(token *jwt.Token) (error) {
        return nil
    })
    return err;
}
