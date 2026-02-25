package middleware

import (
	"encoding/json"
	"net/http"
)

func ActiveSession(res http.ResponseWriter, req *http.Request) {
	token := "1234"
	json.NewEncoder(res).Encode(token)

}
