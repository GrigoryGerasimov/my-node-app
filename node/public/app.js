window.addEventListener("load", () => {
    document.addEventListener("click", async evt => {
        if (evt.target.dataset.type === "remove") {
            try {
                await fetch(`/${evt.target.dataset.key}`, { method: "delete" })
                evt.target.closest("li").remove();
            } catch (error) {
                console.log(error)
            }
        }
    }, false);
});