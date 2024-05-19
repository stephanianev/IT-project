function fun1() {
    const enteredText = document.getElementById('EnterText');
    const output = document.getElementById('output');

    // output.innerHTML = enteredText.value;
    createMessage(enteredText.value);
    enteredText.value = "";
}

window.onload = function(e) {
    const buttonSend = document.getElementById('SendText');
    buttonSend.addEventListener('click', fun1);
}


function createMessage(msg) {
    const p = document.createElement("p");
    const content = document.createTextNode(msg);
    p.appendChild(content);
  
    const sharedText = document.getElementById('SharedText');
    const output = document.getElementById('output');

    sharedText.insertBefore(p, output);
}