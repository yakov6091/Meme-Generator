'use strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px impact`;
            gCtx.fillStyle = line.color;
            gCtx.textAlign = 'center';

            gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height / 2)

        })
    }
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onDownloadImg(elBtn) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    // console.log(imgContent)
    elBtn.href = imgContent
    elBtn.download = 'my-meme.jpg'
}

function onSetColor(color) {
    changeColor(color)
    renderMeme()
}

function onFontIncrease() {
    increaseFont()
    renderMeme()
}

function onFontDecrease() {
    decreaseFont()
    renderMeme()
}