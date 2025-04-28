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

        meme.lines.forEach((line, index) => {
            // Set text properties
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.fillStyle = line.color;
            gCtx.textAlign = 'center';
            gCtx.textBaseline = 'middle'

            // Measure text dimensions
            const textWidth = gCtx.measureText(line.txt).width
            const textHight = line.size * 0.6

            // Update position to center the text
            if (line.position.x === undefined || line.position.y === undefined) {
                line.position.x = gCanvas.width / 2 // Center horizontally
                line.position.y = gCanvas.height / 2 // Center vertically
            }

            // Highlighting border
            if (index === meme.selectedLineIdx) {
                const padding = 10
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 2
                gCtx.strokeRect(
                    line.position.x - textWidth / 2 - padding,
                    line.position.y - textHight / 2 - padding,
                    textWidth + padding * 2,
                    textHight + padding * 2
                )
            }

            // Render text
            gCtx.fillText(line.txt, line.position.x, line.position.y)

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

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSwitchLine() {
    selectLine()
    renderMeme()
}

function OnSetMemeTextFont() {
    const fontSelect = document.querySelector('.text-typo')
    const selectedFont = fontSelect.value

    SetMemeTextFont(selectedFont)
    renderMeme()
}