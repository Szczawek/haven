package account

import (
	"api/roots/database"
	"database/sql"
	"encoding/json"
	"net/http"
)

// This function should be high secure, it is all in or all out;
func AutoLogin(res http.ResponseWriter, req *http.Request) {
	cookie, err := req.Cookie("session")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(res, "Cookies are empty", http.StatusInternalServerError)
			return
		}
		http.Error(res, "Cookies Error", http.StatusInternalServerError)
		return
	}
	id := cookie.Value
	getData(res, id)
}

// #Alwasy remember:
// encoding/json needs public struct and variable, so all thing with upperCase
type UserGet struct {
	Name string `json:"name"`
	ID   int    `json:"id"`
}

func getData(res http.ResponseWriter, id string) {
	var userData UserGet
	var command string = "SELECT name, id FROM users WHERE id =?"
	row := db.DB.QueryRow(command, id)
	//No Questions about loading the same id;
	if err := row.Scan(&userData.Name, &userData.ID); err != nil {
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
