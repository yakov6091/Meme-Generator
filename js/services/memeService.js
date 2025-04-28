'use strict'

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat pizza',
            size: 20,
            color: 'red',
            position: { x: 200, y: 150 },
            font: 'impact'
        },
        {
            txt: 'I am cool',
            size: 20,
            color: 'blue',
            position: { x: 200, y: 170 },
            font: 'impact'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = text
}

function setImg(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}

function changeColor(color) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color
}

function increaseFont() {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].size += 5
}

function decreaseFont() {
    const meme = getMeme()
    if (meme.lines[meme.selectedLineIdx].size > 5)
        meme.lines[meme.selectedLineIdx].size -= 5
}

function selectLine() {
    const meme = getMeme()

    meme.selectedLineIdx++
    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = 0
    }
}

function addLine() {
    const yPos = 50 + gMeme.lines.length * 20
    const newLine = {
        txt: 'Some text',
        size: 20,
        color: 'pink',
        position: { x: 200, y: yPos },
        font: 'impact'

    }
    return gMeme.lines.push(newLine)
}

function SetMemeTextFont(font) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
}