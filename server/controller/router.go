package controller

import (
	"net/http"
)

func HandleBlocksRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		GetAllBlocks(w, r)
	case "POST":
		PostBlock(w, r)
	case "PUT":
		PutBlock(w, r)
	case "DELETE":
		DeleteBlock(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed) // 405
	}
}
