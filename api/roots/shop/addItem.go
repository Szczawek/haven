package shop

import (
	"api/roots/database"
	"encoding/json"
	"net/http"
	"strconv"
)

type Item struct {
	Name    string  `json:"name"`
	Price   float64 `json:"price"`
	Amount  uint16  `json:"amount"`
	OwnerID uint16  `json:"ownerID"`
}

func AddItem(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	var pItem Item

	cookie, errC := req.Cookie("session")
	id := cookie.Value

	if errC != nil || id != strconv.Itoa(int(pItem.OwnerID)) {
		http.Error(res, "invalid data", http.StatusBadRequest)
		return
	}
	if pItem.Price < 1.0 || pItem.Amount < 1 {
		http.Error(res, "Not valid data", http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(req.Body).Decode(&pItem); err != nil {
		http.Error(res, "json error", http.StatusInternalServerError)
		return
	}

	const command string = "INSERT INTO shop(name,price,amout) VALUES(?,?,?)"
	_, err := db.DB.Exec(command, pItem.Name, pItem.Price, pItem.Amount)
	if err != nil {
		http.Error(res, "Database error", http.StatusInternalServerError)
		return
	}
	res.Write([]byte("Item was added!"))
}
