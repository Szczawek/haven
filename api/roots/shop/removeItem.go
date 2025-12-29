package shop

import (
	"api/roots/database"
	"encoding/json"
	"net/http"
	"strconv"
)

type DataRm struct {
	ID      int64 `json:"id"`
	OwnerID int32 `json:"ownerID"`
}

func RemoveItem(res http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	var dataRm DataRm
	if err := json.NewDecoder(req.Body).Decode(&dataRm); err != nil {
		http.Error(res, "json error", http.StatusInternalServerError)
		return
	}

	cookie, errC := req.Cookie("session")
	id := cookie.Value
	if id != strconv.Itoa(int(dataRm.OwnerID)) || errC != nil {
		http.Error(res, "Invalid data", http.StatusBadRequest)
		return
	}

	const commandRm string = "DELETE FROM shop WHERE id =? AND ownerID"
	_, err := db.DB.Exec(commandRm, dataRm.ID, dataRm.OwnerID)
	if err != nil {
		http.Error(res, "database error", http.StatusInternalServerError)
		return
	}
}}}}
