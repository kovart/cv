const Typed = require('typed.js')

const typed = new Typed('#goal', {
    startDelay: 1250,
    strings: ['Front-End ^500 Developer'],
    typeSpeed: 40,
    cursorChar: '_'
})


const decode = require('./content-encoder')

let emailEl = document.getElementById('email')
emailEl.addEventListener('click', function emailClickHandler(e) {
    e.preventDefault()
    decode(emailEl)
    emailEl.removeAttribute('title')
    emailEl.removeEventListener('click', emailClickHandler)
})

let phoneEl = document.getElementById('phone')
phoneEl.addEventListener('click', function emailClickHandler(e) {
    e.preventDefault()
    decode(phoneEl)
    phoneEl.removeAttribute('title')
    phoneEl.removeEventListener('click', emailClickHandler)
})

let contactMeBtn = document.getElementById('contact-me')
contactMeBtn.addEventListener('click', function emailClickHandler(e) {
    e.preventDefault()
    decode(contactMeBtn)
    contactMeBtn.removeEventListener('click', emailClickHandler)
    contactMeBtn.click()
})

let downloadCVBtn = document.getElementById('download-cv')
downloadCVBtn.addEventListener('click', function emailClickHandler(e) {
    e.preventDefault()
    decode(downloadCVBtn)
    downloadCVBtn.removeEventListener('click', emailClickHandler)
    downloadCVBtn.click()
})
