function fun1() {
    const enteredText = document.getElementById('EnterText');
    const output = document.getElementById('output');
    createMessage(enteredText.value);
    enteredText.value = "";
}

window.onload = function(e) {
    const buttonSend = document.getElementById('SendText');
    if (buttonSend) {
        buttonSend.addEventListener('click', fun1);
    }

    var foo = getParameterByName('error');
    if (foo && foo.length > 0) {
        document.getElementById("errorMsg").style.display = "block";
    }
}


function createMessage(msg) {
    const p = document.createElement("p");

    const lines = msg.split("\n");
    for(i = 0; i < lines.length; i++) {
        if (i > 0) {
            p.appendChild(document.createElement("br"));
        }
        const content = document.createTextNode(lines[i]);
        p.appendChild(content);
    }
  
    const sharedText = document.getElementById('SharedText');
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

