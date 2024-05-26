function getChatType() {
    const e = document.getElementById('chatType');
    if (e) {
        return e.value;
    } 

    return null;
}

window.onload = function(e) {
    const buttonSend = document.getElementById('SendText');
    const chatType = getChatType();

    if (buttonSend && chatType) {
        if (chatType == "green_living") {
            buttonSend.addEventListener('click', post_msg_living);
            setInterval(load_msg_living, 1000);
        } else if (chatType == "eco_cooking") {
            buttonSend.addEventListener('click', post_msg_cooking);
            setInterval(load_msg_cooking, 1000);
        } else if (chatType == "eco_activities") {
            buttonSend.addEventListener('click', post_msg_activities);
            setInterval(load_msg_activities, 1000);
        } else if (chatType == "eco_tourism") {
            buttonSend.addEventListener('click', post_msg_tourism);
            setInterval(load_msg_tourism, 1000);
        }
    }

    var foo = getParameterByName('error');
    if (foo && foo.length > 0) {
        const errorElem = document.getElementById("errorMsg");
        if (errorElem) {
            errorElem.style.display = "block";
        }
    }
}


function createMessage(lines) {
    const p = document.createElement("p");

    for(i = 0; i < lines.length; i++) {
        if (i > 0) {
            p.appendChild(document.createElement("br"));
        }

        const span = document.createElement("span");
        span.setAttribute("class", "messageUserName");
        const text = document.createTextNode(lines[i]["userName"]);
        span.appendChild(text);
        p.appendChild(span);

        const content = document.createTextNode(lines[i]["message"]);
        p.appendChild(content);
    }
  
    const sharedText = document.getElementById('SharedText');
    sharedText.innerHTML = '<p id="output"></p>';
    const output = document.getElementById('output');

    sharedText.insertBefore(p, output);
}

function submitRegisterForm() {
    const form = document.getElementById("registerForm");
    form.submit();
}

function submitLoginForm() {
    const form = document.getElementById("loginForm");
    form.submit();
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function load_msg_living() {
    load_msg_internal("/load_msg_living");
}

function load_msg_cooking() {
    load_msg_internal("/load_msg_cooking");
}

function load_msg_activities() {
    load_msg_internal("/load_msg_activities");
}

function load_msg_tourism() {
    load_msg_internal("/load_msg_tourism");
}

function load_msg_internal(url) {
    fetch(url)
        .then((response) => {
            // return response.text();
            return response.json();
        })
        .then((data) => {
            if (data["messages"]) {
                const obj = data["messages"];
                createMessage(obj);
            }
        });
}

function post_msg_living() {
    post_msg_internal("/add_msg_living")
}

function post_msg_cooking() {
    post_msg_internal("/add_msg_cooking")
}

function post_msg_activities() {
    post_msg_internal("/add_msg_activities")
}

function post_msg_tourism() {
    post_msg_internal("/add_msg_tourism")
}

function post_msg_internal(url) {
    element = document.getElementById('EnterText');
    msg = element.value;

    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"message": msg})
    })
    .then((response) => {
        element.value = "";
    })
}