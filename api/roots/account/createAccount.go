package account

import (
	"api/roots/database"
	"api/roots/hash"
	"api/roots/session"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

type CreateAccTemp struct {
	Name     string `json:"name"`
	Login    string `json: "login"`
	Password string `json: "password"`
}

func CreateAccount(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()

	var data CreateAccTemp
	if err := json.NewDecoder(req.Body).Decode(&data); err != nil {
		http.Error(res, "json error", http.StatusInternalServerError)
		return
	}

	cmd := "SELECT id FROM users WHERE login =?"
	row := db.DB.QueryRow(cmd, data.Login)
	var id int
	if err := row.Scan(&id); err != nil {
		if err == sql.ErrNoRows {
			password, err := argonPassword.Hash(data.Password)
			if err != nil {
				http.Error(res, "Hash err; Problem with hash process", http.StatusInternalServerError)
				return
			}
			data.Password = password
			insertData(res, data)
			return
		}
		http.Error(res, "Database err; Problem with row.Scan", http.StatusInternalServerError)
		return
	}
	res.Write([]byte("You can't use that email!"))
}

func insertData(res http.ResponseWriter, data CreateAccTemp) {
	cmd := "INSERT INTO users(name,login,password) VALUES(?,?,?)"
	r, err := db.DB.Exec(cmd, data.Name, data.Login, data.Password)
	if err != nil {
		http.Error(res, "Database err. Inserting data failure", http.StatusInternalServerError)
		return
	}
	id, err := r.LastInsertId()
	if err != nil {
		http.Error(res, "Database err; Can't read last id", http.StatusInternalServerError)
		return
	}
	num := strconv.FormatInt(id, 10)
	session.Login(res, num)
	res.Write([]byte("Account wast created!"))
}
