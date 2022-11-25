window.addEventListener("load", () => {
    document.addEventListener("click", async evt => {
        switch (evt.target.dataset.type) {
            case "remove": {
                try {
                    await fetch(`/${evt.target.dataset.key}`, { method: "delete" });
                    evt.target.closest("li").remove();
                } catch (error) {
                    console.log(error);
                }
                break;
            }
            case "edit": {
                try {
                    const input = prompt(`Provide a new value for ${evt.target.dataset.key}`);
                    if (input.trim()) {
                        await fetch(`/`, { method: "put", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ param: evt.target.dataset.key, content: input }) });
                        evt.target.closest("div").previousElementSibling.innerHTML = `${evt.target.dataset.key} : ${input}`;
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            }
        }
    }, false);
});