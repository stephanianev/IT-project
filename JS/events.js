function showText(img) {
    var text_element_id = img.getAttribute('target');
    var text_element = document.getElementById(text_element_id);
    text_element.classList.remove('hidden-text');
    text_element.classList.add('shown-text');
    img.classList.add('backimage');
}

function hideText(img) {
    var text_element_id = img.getAttribute('target');
    var text_element = document.getElementById(text_element_id);
    text_element.classList.add('hidden-text');
    text_element.classList.remove('shown-text');
    img.classList.remove('backimage');
}

let mybutton = document.getElementById("buttonTop");


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    moveToHash('#header');
}

function moveToHash(hash) {
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 800, function () {
        window.location.hash = hash;
    });
}

$("a").on('click', function (event) {

    if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;
        moveToHash(hash);
    }
});