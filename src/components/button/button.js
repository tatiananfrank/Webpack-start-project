"use strict";

let buttons = document.querySelectorAll(".button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        alert("oops");
    })
}