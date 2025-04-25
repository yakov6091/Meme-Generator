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
    const text = document.querySelector('.meme-text').value

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px arial`;
            gCtx.fillStyle = line.color;
            gCtx.strokeStyle = 'blue';
            gCtx.textAlign = 'center';

            gCtx.fillText(line.txt, gElCanvas.width / 2, 50)
            gCtx.strokeText(line.txt, gElCanvas.width / 2, 50)
        })
    }
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()

}
