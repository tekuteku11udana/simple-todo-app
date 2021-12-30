package query

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func CreateTable(db *sql.DB) {
	db.Exec(`CREATE TABLE IF NOT EXISTS blocks (id SERIAL NOT NULL PRIMARY KEY, text TEXT)`)
}

func InsertText(db *sql.DB, text string) {
	// db.Exec("INSERT INTO test_user (name) VALUES ('tom')")
	db.Exec(fmt.Sprintf("INSERT INTO blocks (text) VALUES ('%s')", text))
}
