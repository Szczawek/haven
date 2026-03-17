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
	Hash     string `json:"hash"`
}

type NotTheSameTemp struct {
	Login string `json:"login"`
	Hash  string `json:"hash"`
}

type ErrorRes struct {
	Email bool `json:"email"`
	Hash  bool `json:"hash"`
}

func CreateAccount(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()

	var data CreateAccTemp
	if err := json.NewDecoder(req.Body).Decode(&data); err != nil {
		http.Error(res, "json error", http.StatusInternalServerError)
		return
	}

	cmd := "SELECT login, hash FROM users WHERE login =? OR hash =?"
	row := db.DB.QueryRow(cmd, data.Login, data.Hash)
	var potUser NotTheSameTemp
	if err := row.Scan(&potUser.Login, &potUser.Hash); err != nil {
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

	var errMsg = ErrorRes{
		Email: potUser.Login == data.Login,
		Hash:  potUser.Hash == data.Hash,
	}

	res.WriteHeader(406)
	if err := json.NewEncoder(res).Encode(errMsg); err != nil {
		http.Error(res, "Encoding error", http.StatusInternalServerError)
	}
}

func insertData(res http.ResponseWriter, data CreateAccTemp) {
	cmd := "INSERT INTO users(name,login,password,hash) VALUES(?,?,?,?)"
	r, err := db.DB.Exec(cmd, data.Name, data.Login, data.Password, data.Hash)
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
}
