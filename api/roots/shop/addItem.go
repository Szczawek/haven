package shop

import (
	"api/roots/database"
	"encoding/json"
	"net/http"
	"strconv"
)

type Item struct {
	Name   string  `json:"name"`
	Price  float64 `json:"price"`
	Amount uint16  `json:"amount"`
}

func AddItem(res http.ResponseWriter, req *http.Request) {
	var pItem Item

	cookie, errC := req.Cookie("session")
	if errC != nil {
		http.Error(res, "cookies error", http.StatusBadRequest)
		return
	}
	id, _ := strconv.ParseUint(cookie.Value, 10, 16)

	if err := json.NewDecoder(req.Body).Decode(&pItem); err != nil {
		http.Error(res, "json error", http.StatusInternalServerError)
		return
	}
	if pItem.Price < 1.0 || pItem.Amount < 1 {
		http.Error(res, "Not valid data", http.StatusBadRequest)
		return
	}

	defer req.Body.Close()

	const command string = "INSERT INTO shop(name,price,amount,ownerID) VALUES(?,?,?,?)"
	_, err := db.DB.Exec(command, pItem.Name, pItem.Price, pItem.Amount, id)
	if err != nil {
		http.Error(res, "Database error", http.StatusInternalServerError)
		return
	}

	res.Write([]byte("Item was added!"))
}
