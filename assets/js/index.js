const btnOpen = document.querySelectorAll(".btn-more-info");
const btnClose = document.querySelectorAll(".btn-close");
const petContainer = document.querySelectorAll(".pet-container");
const petOption = document.querySelectorAll(".pet-option");
const petOptionImg = document.querySelectorAll(".pet-option-img");
const petOptionInfo = document.querySelectorAll(".pet-option-info");
const petOptionInfoTexto = document.querySelectorAll(".pet-option-info-text");
var moreInfo = new Array(btnOpen.length).fill(false);

const petsInfoResize = (moreInfo, i) => {
    if(moreInfo[i]) {
        if(window.innerWidth <= 600) {
            petContainer[i].style.width = "100%";
            btnClose[i].style.display = "block";
            btnOpen[i].style.display = "none";
            petOption[i].style.flexDirection = "column";
            petOptionImg[i].style.width = "100%";
            petOptionInfoTexto[i].style.display = "inline";
        } else if (window.innerWidth <= 850) {
            petContainer[i].style.width = "100%";
            btnClose[i].style.display = "block";
            btnOpen[i].style.display = "none";
            petOptionImg[i].style.width = "100%";
            petOption[i].style.flexDirection = "column";
            petOptionInfoTexto[i].style.display = "inline";
        } else {
            petContainer[i].style.width = "100%";
            btnClose[i].style.display = "block";
            btnOpen[i].style.display = "none";
            petOption[i].style.flexDirection = "row";
            petOptionImg[i].style.width = "30%";
            petOptionInfo[i].style.width = "70%";
            petOptionInfoTexto[i].style.display = "inline";
        }
    } else {
        if(window.innerWidth <= 600) {
            petContainer[i].style.width = "100%";
            btnClose[i].style.display = "none";
            btnOpen[i].style.display = "block";
            petOptionInfoTexto[i].style.display = "none";
        } else if (window.innerWidth <= 850) {
            petContainer[i].style.width = "50%";
            btnClose[i].style.display = "none";
            btnOpen[i].style.display = "block";
            petOptionInfoTexto[i].style.display = "none";
        } else {
            petContainer[i].style.width = "33.33%";
            btnClose[i].style.display = "none";
            btnOpen[i].style.display = "block";
            petOption[i].style.flexDirection = "column";
            petOptionImg[i].style.width = "100%";
            petOptionInfo[i].style.width = "100%";
            petOptionInfoTexto[i].style.display = "none";
        }
    }
}

btnOpen.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        moreInfo[i] = !moreInfo[i];
        petsInfoResize(moreInfo, i);
    });
});

btnClose.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        moreInfo[i] = !moreInfo[i];
        petsInfoResize(moreInfo, i);
    });
});


window.addEventListener("resize", (e) => {
    for(let i = 0; i < btnOpen.length; i++) {
        petsInfoResize(moreInfo, i);
    }
});