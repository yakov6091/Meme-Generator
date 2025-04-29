'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat pizza',
            size: 20,
            color: 'red',
            position: { x: 200, y: 150 },
            font: 'impact',
            isDrag: false

        },
        {
            txt: 'I am cool',
            size: 20,
            color: 'blue',
            position: { x: 200, y: 170 },
            font: 'impact',
            isDrag: false
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const meme = getMeme()
    if (!meme.lines.length) return
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
        font: 'impact',
        isDrag: false

    }
    return gMeme.lines.push(newLine)
}

function removeLine() {
    const meme = getMeme()
    if (!meme.lines.length) return

    meme.lines.splice(meme.selectedLineIdx, 1)

    // Adjust selectedLineIdx after removing
    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = meme.lines.length - 1
    }

    if (meme.selectedLineIdx < 0) {
        meme.selectedLineIdx = 0
    }
}

function setMemeTextFont(font) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
}

function moveLine(dx, dy) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    line.position.x += dx
    line.position.y += dy
}

function isLineClicked(clickedPos) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]

    const distanceX = Math.abs(clickedPos.x - line.position.x)
    const distanceY = Math.abs(clickedPos.y - line.position.y)

    return (distanceX < 100 && distanceY < 40)
}


function setLineDrag(isDrag) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    line.isDrag = isDrag
}


function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}