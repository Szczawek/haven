package account

import (
	"api/roots/database"
	"api/roots/hash"
	"api/roots/session"
	"database/sql"
	"encoding/json"
	"net/http"
)

type AccLogin struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}
type LoggedUserTemp struct {
	ID   string
	Pass string
}

func LoginToAccount(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	var data AccLogin
	if err := json.NewDecoder(req.Body).Decode(&data); err != nil {
		http.Error(res, "JSON Error", http.StatusInternalServerError)
		return
	}

	cmd := "SELECT id, password FROM users WHERE login =?"
	row := db.DB.QueryRow(cmd, data.Login)

	var user LoggedUserTemp
	if err := row.Scan(&user.ID, &user.Pass); err != nil {
		if err == sql.ErrNoRows {
			http.Error(res, "Incorrect data", http.StatusForbidden)
			return
		}
		http.Error(res, "Database err. Scaning rows problem", http.StatusInternalServerError)
		return
	}
	if err := argonPassword.UnHash(data.Password, user.Pass); err != nil {
		http.Error(res, "Incorrect data", http.StatusForbidden)
		return
	}
	session.Login(res, user.ID)
}
