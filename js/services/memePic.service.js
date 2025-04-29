'use strict'
const STORAGE_KEY = 'memeDB'

var gMemes = loadFromStorage(STORAGE_KEY) || []

function removeMeme(memeId) {
    const memeIdx = gMemes.findIndex(meme => meme.id === memeId)
    gMemes.splice(memeIdx, 1)
    _savePicsToStorage()
}

function addMeme(data) {
    const meme = _createMeme(data)
    gMemes.unshift(meme)
    _savePicsToStorage()
    return meme
}

function getMemeById(memeId) {
    const meme = gMemes.find(meme => meme.id === memeId)
    return meme
}

function _createMeme(data) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        data,
        selectedImgId: gMeme.selectedImgId
    }
}

function _savePicsToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}
