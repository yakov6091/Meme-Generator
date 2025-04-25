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
    img.src = 'img/1.jpg'
    const text = document.querySelector('.meme-text').value

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => {
            gCtx.font = `${line.size}px`;
            gCtx.fillStyle = line.color;
            gCtx.strokeStyle = 'blue';
            gCtx.textAlign = 'center';

            gCtx.fillText(text, gElCanvas.width / 2, 50);
            gCtx.strokeText(text, gElCanvas.width / 2, 50);
        })
    }

}
