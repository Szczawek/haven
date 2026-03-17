package account

import (
	"api/roots/database"
	"api/roots/session"
	"database/sql"
	"encoding/json"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
)

func AutoLogin(res http.ResponseWriter, req *http.Request) {
	cookie, err := req.Cookie("session")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(res, "Cookies are empty", http.StatusUnauthorized)
			return
		}
		http.Error(res, "Cookies Error", http.StatusInternalServerError)
		return
	}
	value := cookie.Value
	publicKey := os.Getenv("jwt_PUBLIC_KEY")
	key, err := jwt.ParseEdPublicKeyFromPEM([]byte(publicKey))
	if err != nil {
		http.Error(res, "jwt error", http.StatusInternalServerError)
		return
	}
	token, err := jwt.ParseWithClaims(value, &session.CustomClaims{}, func(Token *jwt.Token) (any, error) {
		return key, nil
	})
	if err != nil {
		http.Error(res, "Unlogged", http.StatusUnauthorized)
		return
	}
	if claims, ok := token.Claims.(*session.CustomClaims); ok {
		getData(res, claims.ID)
		return
	}
	http.Error(res, "Empty claims in jwt", http.StatusInternalServerError)
}

// #Alwasy remember:
// encoding/json needs public struct and variable, so all thing with upperCase
type UserGet struct {
	Name string `json:"name"`
	ID   int    `json:"id"`
	Hash string `json:"hash"`
}

func getData(res http.ResponseWriter, id string) {
	var userData UserGet
	var command string = "SELECT name, id, hash FROM users WHERE id =?"
	row := db.DB.QueryRow(command, id)
	//No Questions about loading the same id;
	if err := row.Scan(&userData.Name, &userData.ID, &userData.Hash); err != nil {
		if err == sql.ErrNoRows {
			http.Error(res, "Error with database(empty record)", http.StatusInternalServerError)
			return
		}
		http.Error(res, "Error with database", http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(res).Encode(userData); err != nil {
		http.Error(res, "Ecoding error", http.StatusInternalServerError)
	}
}
