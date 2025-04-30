'use strict'
let gElCanvas
let gCtx
let gStartPos

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
    console.log(img.src = `img/${meme.selectedImgId}.jpg`);


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
                line.position.x = gElCanvas.width / 2 // Center horizontally
                line.position.y = gElCanvas.height / 2 // Center vertically
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

    setMemeTextFont(selectedFont)
    renderMeme()
}

function onSaveMeme() {
    const data = gElCanvas.toDataURL()
    addMeme(data)
    renderGallery()
}

function onDown(ev) {
    console.log('onDown')
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return

    gStartPos = pos
    setLineDrag(true)

    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gStartPos) return
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (!line.isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    console.log('onUp')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}


function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }
    uploadImg(canvasData, onSuccess)
}