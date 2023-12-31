let cad=`
    <h1>Adopciones y Tránsitos</h1>
    <div class="etiquetas">
        <nav>
            <a class="b1" href="./index.html"> Bigotes </a>
            <a class="b1" href="./adoptar.html">Adoptá</a>
            <a class="b1" href="./donacion.html">Doná</a>
            <a class="b1" href="./voluntariado.html">Participá</a>
            <a class="b1" href="./QuienesSomos.html">Quienes Somos</a>
            <a class="b1" href="./gala.html">Gala 2023</a>
            <a class="b1" href="./pet.html">Ingresar</a>
        </nav>
    </div>
`
document.querySelector("header").innerHTML=cad


//Flechas
let rightArrow = document.querySelector("#carousel-1 .right-arrow");
let leftArrow = document.querySelector("#carousel-1 .left-arrow");
//Lista de todas las img del carusel
let screenStore = document.querySelectorAll("#carousel-1 .carousel-screen");
let numOfScreens = screenStore.length;
//List de todos los circulos del carusel
let circleStore = document.querySelectorAll("#carousel-1 .circle-container .circle");
//Inicio en una ing
let currentScreen = 0;
//este o no en la animacion
let inAnim = false;
//tiempo de animacion
let animTime = 500;

//ordena posicion de partida
sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
//ordena estilo del circulo
highlightCircle(circleStore[0]);

//AL hacer click en flecha derecha
rightArrow.addEventListener("click", () => {
    startAnim("right");
});

//AL hacer click en flecha izquierda
leftArrow.addEventListener("click", () => {
    startAnim("left");
});

//Comienoz de la animacion
function startAnim(direction) {
    if(!inAnim) {
        inAnim = true;
        if(direction === "right") {
            moveRight();
            highlightCircle(circleStore[currentScreen + 1], "right");
        }else if(direction === "left"){
            moveLeft();
            highlightCircle(circleStore[currentScreen - 1], "left");
        }else{
            isAnim = false;
            return
        }
    }
}

//Mover a la derecha
function moveRight() {
    //Proxima imagen
    if(currentScreen < numOfScreens - 1){
    toLeft(screenStore[currentScreen]);
    comeRight(screenStore[currentScreen + 1]);
    setTimeout(() => {
        inAnim = false;
        currentScreen++;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime)
    }else{
        //la proxima es la primera
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[0]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = 0;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime)
    }
}

//Moverse a La izquierda
function moveLeft() {
    //Moverse a la anterior
    if(currentScreen > 0){
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[currentScreen - 1]);
        setTimeout(() => {
        inAnim = false;
        currentScreen--;
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        }, animTime)
    }else{
        //Moverse a la ultima del conteiner
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[numOfScreens - 1]);
        setTimeout(() => {
            inAnim = false;
            currentScreen = numOfScreens - 1;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
            }, animTime)
    }
}

//Para que funcionen los clicks sobre los circulos
circleStore.forEach(circle => {
    circle.addEventListener("click", event => {
        if(!inAnim){
        //Convertir NodeList a Array, para usar el metodo 'indexOf'.
        let circleStoreArray = Array.prototype.slice.call(circleStore);
        let circleIndex = circleStoreArray.indexOf(event.target);
        //Configurar estilo del circulo
        highlightCircle(event.target);
        //Ver si tenemos que movernos a la derecha, a la izquierda o a ningun lado.
        if(circleIndex > currentScreen){
            changeScreenCircleClick(circleIndex, "right");
        }else if (circleIndex < currentScreen){
            changeScreenCircleClick(circleIndex, "left");
        }
    }
})
})

function changeScreenCircleClick(circleIndex, direction) {
    inAnim = true;
    if(direction === "right"){
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[circleIndex]);
        toLeft(screenStore[currentScreen]);
        comeRight(screenStore[circleIndex]);
    }else if (direction === "left"){
        sortPositioning(screenStore[currentScreen], screenStore[circleIndex], screenStore[currentScreen + 1]);
        toRight(screenStore[currentScreen]);
        comeLeft(screenStore[circleIndex]);
    }else{
        inAnim = false;
        return
    }
    setTimeout(() => {
    inAnim = false;
    currentScreen = circleIndex;
    sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
    }, animTime)
}

function highlightCircle(circleSelect, direction) {
    if(circleSelect === undefined && direction === "right"){
        circleSelect = circleStore[0];
    }else if (circleSelect === undefined && direction === "left"){
        circleSelect = circleStore[numOfScreens - 1];
    }
    circleStore.forEach(circle => {
        if(circle === circleSelect){
            circle.classList.add("circle-fill");
        }else{
            circle.classList.remove("circle-fill");
        }
    })
}


//Metodos para animaciones
function toLeft(screen) {
    screen.style.animation = "toLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function toRight(screen) {
    screen.style.animation = "toRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function comeRight(screen) {
    screen.style.animation = "comeRight 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}

function comeLeft(screen) {
    screen.style.animation = "comeLeft 0.5s ease-in-out forwards";
    setTimeout(() => {
        screen.style.animation = "";
    }, animTime);
}



//Ordenar psoicionamiento para evitar superposicion de img
function sortPositioning(mainScreen, leftScreen, rightScreen) {
    //cuando la primera img es indenfinida, repito la primera. 
    if(rightScreen === undefined){
        rightScreen = screenStore[0];
    }
    //Si la izquiera es indefinida, uso la ultima.
    if(leftScreen === undefined){
        leftScreen = screenStore[numOfScreens - 1];
    }
    screenStore.forEach(screen => {
        if(screen === mainScreen){
            screen.style.display = "block";
            screen.style.left = "0px";
        }else if (screen === leftScreen){
            screen.style.display = "block";
            screen.style.left = "-100%";
        }else if (screen === rightScreen){
            screen.style.display = "block";
            screen.style.left = "100%";
        }else{
            screen.style.display = "none";
        }
    })
}

//Auto Scroll
let carousel = document.getElementById("carousel-1");
let scrollTime = Number(carousel.getAttribute("auto-scroll"));
//Solo si se implementa
if(scrollTime) {
    //Auto Scroll
    let autoWipe = setInterval(() => {
        startAnim("right");
    }, scrollTime);
    //Limpiar tyiempo al hacer hover sobre el carusel
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoWipe);
    });
    //Re inicializar el tiempo al hacer hover fuera del carusel
    carousel.addEventListener("mouseleave", () => {
         autoWipe = setInterval(() => {
            startAnim("right");
        }, scrollTime);
    })

}