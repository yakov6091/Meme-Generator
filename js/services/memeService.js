'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat pizza',
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = text
    renderMeme()
}

function setImg(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}


