
const imgs = document.getElementsByTagName("img");
const fs_img = document.getElementById("fs_img");
const fs_img_container= document.getElementById("fs_img_container");
const close_fs = document.getElementById("close_fs");

fs_img.addEventListener("click", (e)=>{
    e.stopPropagation();
});


close_fs.addEventListener("click", ()=>{
    fs_img.style.display="none";
    fs_img_container.style.display="none";
});

fs_img_container.addEventListener("click", ()=>{
    fs_img.style.display="none";
    fs_img_container.style.display="none";
});


if (window.location.href.includes("posts")){
    [...imgs].forEach((img)=>{
        img.addEventListener("click", () => {
            fs_img.src=img.src;
            fs_img.style.display="block";
            fs_img_container.style.display="block";
        });
    });
}
