package repository

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"

	"github.com/joho/godotenv"
)

var Db *sql.DB

// "defer Db.Close()" is NOT necessarily needed...?
func init() {
	var err error
	if err := godotenv.Load(); err != nil {
		fmt.Println("cannot read .env file")
	}

	dataSourceName := os.Getenv("DSN_POSTGRES")

	Db, err = sql.Open("postgres", dataSourceName)
	if err != nil {
		panic(err)
	}
	fmt.Println("DB Successfully connected!")
}
