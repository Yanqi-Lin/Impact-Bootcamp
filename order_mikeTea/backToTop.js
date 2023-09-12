const backToTopBtn = document.getElementById("back-to-top");

document.addEventListener('scroll', () => {
    const dist = document.documentElement.scrollTop;
    if (dist == 0) {
        backToTopBtn.style.display = "none";
    } else {
        backToTopBtn.style.display = "block";
    }
})

backToTopBtn.addEventListener("click",() => {
    window.scrollTo(0, 0);
})

