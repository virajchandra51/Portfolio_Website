
let progress = document.getElementById('progressbar')
let th = document.body.scrollHeight - window.innerHeight
window.onscroll = function(){
let ph = (window.pageYOffset / th) *100
progress.style.height = ph + "%"}