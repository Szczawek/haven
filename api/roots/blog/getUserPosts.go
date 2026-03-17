package blog

import (
	"api/roots/database"
	"database/sql"
	"encoding/json"
	"net/http"
)

// change ID TO hash: #FEAUTURE;
type UserPostTemp struct {
	ID      int    `json:"id"`
	Content string `json:"content"`
}

func GetUserPosts(res http.ResponseWriter, req *http.Request) {
	hash := req.URL.Query().Get("hash")

	id, err := getUserID(hash)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(res, "User with that hash doesn't exists", http.StatusNotFound)
		} else {
			http.Error(res, "Database error, hash", http.StatusInternalServerError)
		}
		return
	}

	var arrOfPosts []UserPostTemp

	cmd := "SELECT * FROM posts WHERE userID = ?"
	rows, err := db.DB.Query(cmd, id)

	if err != nil {
		http.Error(res, "Database Query error", http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var singlePost UserPostTemp
		if err := rows.Scan(&singlePost); err != nil {
			http.Error(res, "Database error", http.StatusInternalServerError)
			return
		}
		arrOfPosts = append(arrOfPosts, singlePost)
	}

	defer rows.Close()

	if err := json.NewEncoder(res).Encode(arrOfPosts); err != nil {
		http.Error(res, "Json Encoding Error", http.StatusInternalServerError)
	}
}

func getUserID(hash string) (int, error) {
	cmd := "SELECT id FROM users where hash = ?"
	var id int

	if err := db.DB.QueryRow(cmd, hash).Scan(&id); err != nil {
		return -1, err
	}

	return id, nil
}
