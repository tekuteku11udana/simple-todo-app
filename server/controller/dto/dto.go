package dto

type BlockResponse struct {
	Id   string `json:"id"`
	Text string `json:"text"`
}

type BlockRequest struct {
	Id    string `json:"id"`
	Index int    `json:"index"`
	Text  string `json:"text"`
}

type BlocksResponse struct {
	Blocks []BlockResponse `json:"blocks"`
}
