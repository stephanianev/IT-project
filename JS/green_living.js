
window.onload = function(e) {
    const buttonSend = document.getElementById('SendText');
    if (buttonSend) {
        buttonSend.addEventListener('click', post_msg);
    }

    var foo = getParameterByName('error');
    if (foo && foo.length > 0) {
        document.getElementById("errorMsg").style.display = "block";
    }

    setInterval(load_msg, 1000);
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

function load_msg() {
    url ="/load_msg";
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

function post_msg() {
    element = document.getElementById('EnterText');
    msg = element.value;

    url = "/add_msg";
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({message: msg})
    })
    .then((response) => {
        element.value = "";
    })
}

