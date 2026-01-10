package account

import (
	"api/roots/database"
	"api/roots/hash"
	"api/roots/session"
	"database/sql"
	"encoding/json"
	"net/http"
)

type Data struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}
type outData struct {
	id       string
	password string
}

func LoginToAccount(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	var loginData Data
	if err := json.NewDecoder(req.Body).Decode(&loginData); err != nil {
		http.Error(res, "JSON Error", http.StatusInternalServerError)
		return
	}

	cmdLogin := "SELECT id, password FROM users WHERE login =?"
	row := db.DB.QueryRow(cmdLogin, loginData.Login)

	var otpData outData
	if err := row.Scan(&otpData.id, &otpData.password); err != nil {
		if err == sql.ErrNoRows {
			http.Error(res, "Incorrect data", http.StatusForbidden)
			return
		}
		http.Error(res, "Database err. Scaning rows problem", http.StatusInternalServerError)
		return
	}
	if err := argonPassword.UnHash(loginData.Password, otpData.password); err != nil {
		http.Error(res, "Incorrect data", http.StatusForbidden)
		return
	}
	session.Login(res, otpData.id)
	json.NewEncoder(res).Encode(otpData.id)
}
