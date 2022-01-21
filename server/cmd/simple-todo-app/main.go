package main

import (
	"net/http"
	"simple-todo-app/controller"

	_ "github.com/lib/pq"
)

type Block struct {
	ID   string `db:"id"`
	Text string `db:"text"`
}

func main() {

	server := http.Server{
		Addr: ":8080",
	}
	http.HandleFunc("/api/v1/blocks/", controller.HandleBlocksRequest)
	server.ListenAndServe()

}
