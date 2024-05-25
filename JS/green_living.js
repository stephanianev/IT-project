window.onload = function() {
    revealPostsSection();
    const chatType = getChatType();
    const postForm = document.getElementById('PostForm');

    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            window.location.href = "new_page.html"; // Redirect to new page
        });
    }

    if (chatType) {
        if (chatType === "green_living") {
            const buttonSend = document.getElementById('SendText');
            buttonSend.addEventListener('click', postMessage);
            setInterval(loadMessages, 1000);
        } else if (chatType === "eco_cooking") {
            // Add event listeners and intervals for eco_cooking
        } else if (chatType === "eco_activities") {
            // Add event listeners and intervals for eco_activities
        } else if (chatType === "eco_tourism") {
            // Add event listeners and intervals for eco_tourism
        }
    }
}

function revealPostsSection() {
    const sharedText = document.getElementById('SharedText');
    sharedText.style.display = 'block';
}

function getChatType() {
    const e = document.getElementById('chatType');
    if (e) {
        return e.value;
    } 
    return null;
}

function loadMessages() {
    // Implement loading messages based on chatType
    const chatType = getChatType();
    if (chatType === "green_living") {
        fetch("/load_msg_living")
            .then(response => response.json())
            .then(data => {
                if (data.messages) {
                    const messages = data.messages;
                    displayMessages(messages);
                }
            })
            .catch(error => console.error('Error loading messages:', error));
    } else if (chatType === "eco_cooking") {
        // Fetch and display messages for eco_cooking
    } else if (chatType === "eco_activities") {
        // Fetch and display messages for eco_activities
    } else if (chatType === "eco_tourism") {
        // Fetch and display messages for eco_tourism
    }
}

function displayMessages(messages) {
    const output = document.getElementById('output');
    output.innerHTML = ""; // Clear previous messages
    messages.forEach(message => {
        const p = document.createElement("p");
        // Create message content
        p.textContent = message.userName + ": " + message.message;
        output.appendChild(p);
    });
}

function postMessage() {
    const element = document.getElementById('EnterText');
    const msg = element.value;
    const chatType = getChatType();

    if (chatType) {
        let url;
        switch (chatType) {
            case "green_living":
                url = "/add_msg_living";
                break;
            case "eco_cooking":
                url = "/add_msg_cooking";
                break;
            case "eco_activities":
                url = "/add_msg_activities";
                break;
            case "eco_tourism":
                url = "/add_msg_tourism";
                break;
            default:
                break;
        }

        if (url) {
            fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: msg
                    })
                })
                .then(response => {
                    if (response.ok) {
                        element.value = ""; // Clear input after posting
                    }
                })
                .catch(error => console.error('Error posting message:', error));
        }
    }
}
