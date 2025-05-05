'use strict'
const gImgs = [
    { id: 1, url: 'img/1.jpg' },
    { id: 2, url: 'img/2.jpg' },
    { id: 3, url: 'img/3.jpg' },
    { id: 4, url: 'img/4.jpg' },
    { id: 5, url: 'img/5.jpg' },
    { id: 6, url: 'img/6.jpg' },
    { id: 7, url: 'img/7.jpg' },
    { id: 8, url: 'img/8.jpg' },
    { id: 9, url: 'img/9.jpg' },
    { id: 10, url: 'img/10.jpg' },
]

function renderGallery() {
    // Show the gallery
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.classList.remove('hidden')

    // Hide the canvas and editor
    const elEditor = document.querySelector('.editor-container')
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elsavedGalleryContainer = document.querySelector('.saved-gallery-container')
    elEditor.classList.add('hidden')
    elCanvasContainer.classList.add('hidden')
    elsavedGalleryContainer.classList.add('hidden')

    const strHTML =
        `
        <input type="file" id="upload" class="file-input btn" name="image" onchange="onImgInput(event)" />
        
       ${gImgs.map(img =>
            `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
        ).join('')}

        `

    elGalleryContainer.innerHTML = strHTML
}

function onImgSelect(imgId) {
    // console.log('Image selected:', imgId)
    setImg(imgId)

    // Show the canvas and editor
    const elEditor = document.querySelector('.editor-container')
    const elCanvasContainer = document.querySelector('.canvas-container')
    elEditor.classList.remove('hidden')
    elCanvasContainer.classList.remove('hidden')

    //hide the gallery
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.classList.add('hidden')

    //hide the saved gallery
    const elSavedGalleryContainer = document.querySelector('.saved-gallery-container')
    elSavedGalleryContainer.classList.add('hidden')

    renderMeme()
}


function renderSavedGallery() {
    const elSavedGalleryContainer = document.querySelector('.saved-gallery-container')
    elSavedGalleryContainer.classList.remove('hidden')

    const elEditor = document.querySelector('.editor-container')
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGalleryContainer = document.querySelector('.gallery-container')
    elEditor.classList.add('hidden')
    elCanvasContainer.classList.add('hidden')
    elGalleryContainer.classList.add('hidden')

    elSavedGalleryContainer.innerHTML = gMemes.map(meme => {
        return `
        <button class="remove-btn" onclick="onRemoveMeme('${meme.id}')">X</button>
        <img src="${meme.data}" onclick="onSelectPic('${meme.id}')" />
        `
    }).join('')
    // _savePicsToStorage()
}

function onSaveMeme() {
    const data = gElCanvas.toDataURL()
    addMeme(data)
    renderGallery()
}

function onRemoveMeme(memeId) {
    removeMeme(memeId)
    renderSavedGallery()
}

function onSelectPic(memeId) {
    const meme = getMemeById(memeId)
    // console.log(meme)
    setImg(meme.selectedImgId)
    const img = new Image()
    img.src = meme.data
    renderImg(img)
    onImgSelect(meme.selectedImgId)
}