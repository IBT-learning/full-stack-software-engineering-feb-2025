let btn = document.getElementById("btn");
let heading = document.getElementsByTagName("h1")[0]
let second = document.getElementById("second-h1");
const container = document.querySelector("#container");
const box = document.querySelector("#btn");
const btn2 = document.querySelector("#addMe")

// console.log(box)

// console.log(window);

function changeStyle() {
    heading.innerHTML = "I just changed through DOM Manipulation!";
    heading.style.color = "red";
    second.classList.add("second")
    second.classList.add("another")
    second.classList.remove("box");
    // console.log(container.classList)
    // second.removeAttribute("class")
    // second.setAttribute("class", "second another")
    // second.classList.add("box-italic")
}

function addElem(){
    // console.log(container)
    const newElem = document.createElement("p");
    newElem.innerText = "Hii, I just got added dynamically into the DOM!";
    container.appendChild(newElem);
}

function removeElem() {
    document.body.removeChild(container);
}

btn.addEventListener("click", changeStyle)
btn2.addEventListener("click", removeElem)