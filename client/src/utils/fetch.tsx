import { Block } from "../type/type"

export const putNewText = (id: string, index: number,text: string) => {
    fetch(`/api/v1/blocks/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([{id: id, index: index, text: text}])
    })
    .then(data => {
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}

export const postNewBlock = (newId: string, newIndex: number, newText: string) => {

    fetch(`/api/v1/blocks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: newId, index: newIndex, text: newText})
    })
    
    .then(data => {
        
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}

export const putAllBlocks = (newBlocks: Block[]) => {
    fetch(`/api/v1/blocks/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlocks)
    })
    
    .then(data => {
        
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}