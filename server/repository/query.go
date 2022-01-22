package repository

import (
	"log"
	"simple-todo-app/entity"

	"github.com/google/uuid"
)

func SelectAllBlocks() (blocks []entity.BlockEntity, err error) {
	blocks = []entity.BlockEntity{}
	rows, err := Db.Query("SELECT id, index, text FROM blocks ORDER BY index ASC;")
	if err != nil {
		log.Print(err)
		return
	}

	for rows.Next() {
		block := entity.BlockEntity{}
		err = rows.Scan(&block.Id, &block.Index, &block.Text)
		if err != nil {
			log.Print(err)
			return
		}
		blocks = append(blocks, block)
	}

	return

}

func InsertBlock(block entity.BlockEntity) (err error) {
	log.Printf("block.Id: %v", block.Id)
	blockId, err := uuid.Parse(block.Id)
	if err != nil {
		log.Print(err)
		return
	}
	log.Printf("blockId decoded: %v", blockId)
	_, err = Db.Exec("INSERT INTO blocks (id, index, text) VALUES ($1, $2, $3)", blockId, block.Index, block.Text)
	if err != nil {
		log.Print(err)
		return
	}
	// err = Db.QueryRow("SELECT id FROM blocks ORDER BY id DESC LIMIT 1").Scan(&id)
	return
}

func UpdateBlock(block entity.BlockEntity) (err error) {
	log.Printf("block: %v", block)
	_, err = Db.Exec("UPDATE blocks SET index = $1, text = $2 WHERE id = $3", block.Index, block.Text, block.Id)
	return
}

func DeleteBlock(id string) (err error) {
	_, err = Db.Exec("DELETE FROM blocks WHERE id = $1", id)
	return
}
