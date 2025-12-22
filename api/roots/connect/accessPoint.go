package connect

import (
	"net/http"
)

func AccessPoint(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("test"))
}
