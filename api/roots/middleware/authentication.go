package middleware

import (
	"api/roots/session"
    "os"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
    "fmt"
)

func Authentication(res http.ResponseWriter, req *http.Request) error {
	cookie, err := req.Cookie("auth")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(res, "Empty cookie", http.StatusUnauthorized)
			return err
		}
		http.Error(res, "Cookie isn't anvaliable, error", http.StatusInternalServerError)
		return err
	}
	value := cookie.Value
	publicKey := os.Getenv("jwt_PUBLIC_KEY");
    if publicKey == "" {
        http.Error(res, "No env with that name", http.StatusInternalServerError);
        return fmt.Errorf("empty env");
    }
	key, err := jwt.ParseEdPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		http.Error(res, "JWT parse error", http.StatusInternalServerError)
		return err;
	}
    token, err := jwt.ParseWithClaims(value, &session.CustomClaims{}, func(Token *jwt.Token) (any, error) {
		return key, nil
	})
	if err != nil {
		http.Error(res, "Incorrect JWT auth", http.StatusUnauthorized);
		return err
	}
    fmt.Println(token)
    return nil 
	//if claims, ok := token.Claims.(*session.CustomClaims); ok {
	//	getData(res, claims.ID)
	//	return
//	}
//	http.Error(res, "Empty claims in jwt", http.StatusInternalServerError)
}


