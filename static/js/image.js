
const imgs = document.getElementsByTagName("img")

if (window.location.href.includes("posts")){
    [...imgs].forEach((img)=>{
    img.addEventListener("click", () => {
            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else if (img.mozRequestFullScreen) { // Firefox
                img.mozRequestFullScreen();
            } else if (img.webkitRequestFullscreen) { // Chrome, Safari and Opera
                img.webkitRequestFullscreen();
            } else if (img.msRequestFullscreen) { // IE/Edge
                img.msRequestFullscreen();
            }
        });

    });
}
