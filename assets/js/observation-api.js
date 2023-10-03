const observer = new IntersectionObserver(entries => {
    Array.from(entries).forEach(entry => {
        if(entry.intersectionRatio >= .1) {
            entry.target.classList.remove("init-hidden");
            entry.target.classList.add("init-hidden-off");
        } else {
            entry.target.classList.remove("init-hidden-off");
            entry.target.classList.add("init-hidden");
        }
    });
}, {
    threshold: .1
});

Array.from(document.querySelectorAll(".init-hidden")).forEach(e => {
    observer.observe(e);
});