package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"simple-todo-app/query"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Block struct {
	ID   string `db:"id"`
	Text string `db:"text"`
}

func main() {

	if err := godotenv.Load(".env"); err != nil {
		fmt.Println("cannot read .env file")
	}

	psqlInfo := os.Getenv("DSN_POSTGRES")

	db, dbErr := sql.Open("postgres", psqlInfo)
	if dbErr != nil {
		panic(dbErr)
	}
	defer db.Close()

	fmt.Println("DB Successfully connected!")

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, q *http.Request) {

		message := map[string]string{
			"message": "hello world",
		}
		jsonMessage, err := json.Marshal(message)
		if err != nil {
			panic(err.Error())
		}
		w.Write(jsonMessage)
	})

	mux.HandleFunc("/db", func(w http.ResponseWriter, q *http.Request) {
		query.CreateTable(db)
		query.InsertText(db, "This is inserted text.")
		rows, err := db.Query("SELECT * FROM blocks")
		if err != nil {
			log.Println(err)
		}
		defer rows.Close()

		var b Block
		for rows.Next() {
			err := rows.Scan(&b.ID, &b.Text)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Printf("ID: %s, Name: %s\n", b.ID, b.Text)
		}
		err = rows.Err()
		if err != nil {
			log.Fatal(err)
		}
	})

	log.Fatal(http.ListenAndServe(":8080", mux))
}
