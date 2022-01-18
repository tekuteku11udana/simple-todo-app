package dto

type BlockResponse struct {
	Id    int    `json:"id"`
	Index int    `json:"index"`
	Text  string `json:"text"`
}

type BlockRequest struct {
	Id    int    `json:"id"`
	Index int    `json:"index"`
	Text  string `json:"text"`
}

type BlocksResponse struct {
	Blocks []BlockResponse `json:"blocks"`
}
