var currentScreen = 0;
var screenList = ["home", "web-dev", "software-dev", "media-strategy", "about", "contact"];
var canScroll = true;

var particleList = [];

const homeScreen                 = document.querySelector("#home-screen");
const webDevScreen               = document.querySelector("#web-dev-screen");
const softwareDevScreen          = document.querySelector("#software-dev-screen");
const mediaStrategyScreen        = document.querySelector("#media-strategy-screen");
const aboutScreen                = document.querySelector("#about-screen");
const contactScreen              = document.querySelector("#contact-screen");

const headerHome                 = document.querySelector("#header-home");
const headerWebDevelopment       = document.querySelector("#header-web-development");
const headerSoftwareDevelopment  = document.querySelector("#header-software-development");
const headerMediaStrategy        = document.querySelector("#header-media-strategy");
const headerAbout                = document.querySelector("#header-about");
const headerContact              = document.querySelector("#header-contact");

const upArrowButton              = document.querySelector("#up-arrow");
const downArrowButton            = document.querySelector("#down-arrow");

const canvas = document.querySelector("#particle-container");
const context = canvas.getContext("2d");

class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xIncrease = 0;
        this.yIncrease = 0;
    }

    setInitialPosition() {
        this.x = Math.random();
        this.y = Math.random();
    }
}

function particleRender() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < particleList.length; i++) {
        context.beginPath();
        context.fillStyle = "#725AC1";
        context.arc(canvas.width * particleList[i].x, canvas.height * particleList[i].y, 2, 0, 2 * Math.PI);
        context.fill();
    }
}

function init() {
    updateRender();

    for(var i = 0; i < 40; i++) {
        const particle = new Particle();
        particle.setInitialPosition();
        var xOrientationChance = Math.random();
        var yOrientationChance = Math.random();

        if(xOrientationChance > 0.5)
            particle.xIncrease = 0.0002;
        else
            particle.xIncrease = -0.0002;

        if(yOrientationChance > 0.5)
            particle.yIncrease = 0.0002;
        else
            particle.yIncrease = -0.0002;

        particleList.push(particle);
    }

    setInterval(() => {
        for(var i = 0; i < particleList.length; i++) {
            particleList[i].x += particleList[i].xIncrease;
            particleList[i].y += particleList[i].yIncrease;

            if(particleList[i].x > 1) {
                particleList[i].x = 0; 
            } else if(particleList[i].x < 0) {
                particleList[i].x = 1; 
            }

            if(particleList[i].y > 1) {
                particleList[i].y = 0; 
            } else if(particleList[i].y < 0) {
                particleList[i].y = 1; 
            }
        }

        particleRender();
    }, 1000 / 60);
}

function switchScreen(orientation, screenIndex) {
    if(canScroll) {
        canScroll = false;
        
        if(screenIndex == undefined)
            currentScreen += orientation;
        else
            currentScreen = screenIndex;

        if(currentScreen > screenList.length - 1) {
            currentScreen = 0;
        } else if(currentScreen < 0) {
            currentScreen = screenList.length - 1;
        }

        updateRender();

        setTimeout(() => { canScroll = true }, 1000);
    }
}

function resetCanvasSize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function updateRender() {
    if(currentScreen == 0) {
        upArrowButton.classList.add("invisible");
    } else {
        upArrowButton.classList.remove("invisible");
    }

    if(currentScreen == screenList.length - 1) {
        downArrowButton.classList.add("invisible");
    } else {
        downArrowButton.classList.remove("invisible");
    }

    headerHome.classList.add("half-visible");
    headerWebDevelopment.classList.add("half-visible");
    headerSoftwareDevelopment.classList.add("half-visible");
    headerMediaStrategy.classList.add("half-visible");
    headerAbout.classList.add("half-visible");
    headerContact.classList.add("half-visible");

    homeScreen.classList.add("invisible-fade");
    webDevScreen.classList.add("invisible-fade");
    softwareDevScreen.classList.add("invisible-fade");
    mediaStrategyScreen.classList.add("invisible-fade");
    aboutScreen.classList.add("invisible-fade");
    contactScreen.classList.add("invisible-fade");

    switch(currentScreen) {
        case 0: {
            headerHome.classList.remove("half-visible");
            break;
        }
        
        case 1: {
            headerWebDevelopment.classList.remove("half-visible");
            break;
        }
        
        case 2: {
            headerSoftwareDevelopment.classList.remove("half-visible");
            break;
        }
        
        case 3: {
            headerMediaStrategy.classList.remove("half-visible");
            break;
        }

        case 4: {
            headerAbout.classList.remove("half-visible");
            break;
        }

        case 5: {
            headerContact.classList.remove("half-visible");
            break;
        }
    }

    setTimeout(() => {
        homeScreen.classList.add("invisible");
        webDevScreen.classList.add("invisible");
        softwareDevScreen.classList.add("invisible");
        mediaStrategyScreen.classList.add("invisible");
        aboutScreen.classList.add("invisible");
        contactScreen.classList.add("invisible");
    }, 500);

    setTimeout(() => {
        switch(currentScreen) {
            case 0: {
                homeScreen.classList.remove("invisible");
                break;
            }
            
            case 1: {
                webDevScreen.classList.remove("invisible");
                break;
            }

            case 2: {
                softwareDevScreen.classList.remove("invisible");
                break;
            }

            case 3: {
                mediaStrategyScreen.classList.remove("invisible");
                break;
            }
    
            case 4: {
                aboutScreen.classList.remove("invisible");
                break;
            }
    
            case 5: {
                contactScreen.classList.remove("invisible");
                break;
            }
        }
    }, 600);

    setTimeout(() => {
        switch(currentScreen) {
            case 0: {
                homeScreen.classList.remove("invisible-fade");
                break;
            }
            
            case 1: {
                webDevScreen.classList.remove("invisible-fade");
                break;
            }

            case 2: {
                softwareDevScreen.classList.remove("invisible-fade");
                break;
            }

            case 3: {
                mediaStrategyScreen.classList.remove("invisible-fade");
                break;
            }
    
            case 4: {
                aboutScreen.classList.remove("invisible-fade");
                break;
            }
    
            case 5: {
                contactScreen.classList.remove("invisible-fade");
                break;
            }
        }
    }, 1000);
}

init();
resetCanvasSize();

window.addEventListener("wheel", ev => { switchScreen(Math.sign(ev.deltaY)); });
window.addEventListener("resize", ev => { resetCanvasSize(); })