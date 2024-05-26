const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    body {
        background-image: url(../Images/treeplanet.jpg);
    }
    #h_title {
        text-align: center;
        color: rgb(75, 202, 117);
        border: 0.3rem solid black;
        margin-left: 40%;
        margin-right: 40%;
        border-radius: 0.3rem;
        background-color: rgb(255, 255, 0);
    }
    #body {
        padding: 20px;
        max-width: 800px;
        margin: auto;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    a {
        color: white;
    }
`;
document.head.appendChild(style);
