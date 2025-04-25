'use strict'
const gImgs = [
    { id: 1, url: 'img/2.jpg' },
    { id: 2, url: 'img/3.jpg' }
]

function renderGallery() {
    const elGalleryContainer = document.querySelector('.gallery-container')
    const strHTML = gImgs.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
    }).join('')

    elGalleryContainer.innerHTML = strHTML
}

function onImgSelect(imgId) {
    // console.log('Image selected:', imgId)
    setImg(imgId)
    // showEditor()
    renderMeme()
}