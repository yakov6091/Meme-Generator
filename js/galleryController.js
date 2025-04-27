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
    elEditor.classList.add('hidden')
    elCanvasContainer.classList.add('hidden')

    const strHTML = gImgs.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
    }).join('')

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

    renderMeme()
}