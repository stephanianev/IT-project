function fun1() {
    const enteredText = document.getElementById('EnterText');
    const output = document.getElementById('output');
    createMessage(enteredText.value);
    enteredText.value = "";
}

window.onload = function(e) {
    const buttonSend = document.getElementById('SendText');
    buttonSend.addEventListener('click', fun1);
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