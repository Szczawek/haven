package account

import (
	"api/roots/database"
	"api/roots/session"
	"database/sql"
	"encoding/json"
	"net/http"
)

type Data struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func LoginToAccount(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	var loginData Data
	if err := json.NewDecoder(req.Body).Decode(&loginData); err != nil {
		http.Error(res, "JSON Error", http.StatusInternalServerError)
		return
	}

	cmdLogin := "SELECT id FROM users WHERE login =? AND password = ?"
	row := db.DB.QueryRow(cmdLogin, loginData.Login, loginData.Password)
	var id string
	if err := row.Scan(&id); err != nil {
		if err == sql.ErrNoRows {
			http.Error(res, "Incorect data", http.StatusForbidden)
			return
		}
		http.Error(res, "Database error", http.StatusInternalServerError)
		return
	}
	session.Login(res, id)
	json.NewEncoder(res).Encode(id)
}
