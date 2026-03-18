package account

import (
	"api/roots/database"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetUserData(res http.ResponseWriter, req *http.Request) {
	var userData UserGet
	idCookie, err := req.Cookie("id");
    if err !=nil {
        http.Error(res, "Empty cookie, can't get user data", http.StatusInternalServerError);
        return;
    }
    id := idCookie.Value;
	var command string = "SELECT name, id, hash FROM users WHERE id =?"
	row := db.DB.QueryRow(command, id)

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

type UserGet struct {
	Name string `json:"name"`
	ID   int    `json:"id"`
	Hash string `json:"hash"`
}
