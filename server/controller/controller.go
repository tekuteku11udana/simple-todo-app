package controller

import (
	"encoding/json"
	"net/http"
	"path"
	"simple-todo-app/controller/dto"
	"simple-todo-app/entity"
	"simple-todo-app/repository"
	"strconv"
)

func GetAllBlocks(w http.ResponseWriter, r *http.Request) {
	blocks, err := repository.SelectAllBlocks()
	if err != nil {
		w.WriteHeader(500)
		return
	}

	var blockResponses []dto.BlockResponse
	for _, b := range blocks {
		blockResponses = append(blockResponses, dto.BlockResponse{Id: b.Id, Index: b.Index, Text: b.Text})

	}

	var blocksResponse dto.BlocksResponse
	blocksResponse.Blocks = blockResponses

	output, _ := json.Marshal(blocksResponse.Blocks)

	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
}

func PostBlock(w http.ResponseWriter, r *http.Request) {
	body := make([]byte, r.ContentLength)
	r.Body.Read(body)
	var blockRequest dto.BlockRequest
	json.Unmarshal(body, &blockRequest)

	newBlock := entity.BlockEntity{Id: blockRequest.Id, Index: blockRequest.Index, Text: blockRequest.Text}
	id, err := repository.InsertBlock(newBlock)
	if err != nil {
		w.WriteHeader(500)
		return
	}
	w.Header().Set("Location", r.Host+r.URL.Path+strconv.Itoa(id))
	w.WriteHeader(201)
}

func PutBlock(w http.ResponseWriter, r *http.Request) {
	blockId, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		w.WriteHeader(400)
		return
	}

	body := make([]byte, r.ContentLength)
	r.Body.Read(body)
	var blockRequest dto.BlockRequest
	json.Unmarshal(body, &blockRequest)

	newBlock := entity.BlockEntity{Id: blockId, Index: blockRequest.Index, Text: blockRequest.Text}
	err = repository.UpdateBlock(newBlock)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	w.WriteHeader(204)
}

func DeleteBlock(w http.ResponseWriter, r *http.Request) {
	blockId, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		w.WriteHeader(400)
		return
	}

	err = repository.DeleteBlock(blockId)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	w.WriteHeader(204)
}