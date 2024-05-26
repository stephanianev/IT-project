document.addEventListener("DOMContentLoaded", function () {
    const postTextarea = document.querySelector(".post-textarea");
    const postButton = document.querySelector(".post-button");
    const postSelect = document.querySelector(".post-select");

    // Character counter
    postTextarea.addEventListener("input", function () {
        const maxLength = 280; // Adjust as needed
        const currentLength = postTextarea.value.length;
        const remaining = maxLength - currentLength;
        const counterElement = document.querySelector(".char-counter");
        if (counterElement) {
            counterElement.textContent = `${remaining} characters remaining`;
        } else {
            const counter = document.createElement("div");
            counter.classList.add("char-counter");
            counter.textContent = `${remaining} characters remaining`;
            postTextarea.parentNode.insertBefore(counter, postTextarea.nextSibling);
        }
    });

    // Clear text field
    const clearTextField = () => {
        postTextarea.value = "";
        // Clear character counter
        const counterElement = document.querySelector(".char-counter");
        if (counterElement) {
            counterElement.textContent = "280 characters remaining";
        }
    };

    // Post confirmation
    const confirmPost = () => {
        const confirmation = confirm("Are you sure you want to post?");
        if (confirmation) {
            alert("Post successful!");
            clearTextField();
        }
    };

    // Change background depending on the chosen theme
    postSelect.addEventListener("change", function () {
        const selectedTheme = postSelect.value;
        document.body.style.backgroundColor = getThemeColor(selectedTheme);
    });

    function getThemeColor(theme) {
        switch (theme) {
            case "eco-cooking":
                return "#e6f5e9";
            case "eco-activities":
                return "#f9ebd2";
            case "green-living":
                return "#d6f5e9";
            case "eco-tourism":
                return "#f0f0f0";
        }
    }

    // Add event listener to the post button
    postButton.addEventListener("click", confirmPost);
});

