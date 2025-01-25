function openLinkToGithub() {
    console.log('Clicked Span');
    location.assign("https://github.com/Computahwiz-Github");
}

function openLinkToSite() {
    console.log('Clicked Span');
    location.assign("./");
}

function profileButtonClick() {
    console.log("Profile Button Clicked");
    location.assign("./castle/");
}

function homeButtonClick() {
    console.log("Home Button Clicked");
    location.assign("./");
}

function debounce(func, timeout = 50) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const menuButtonElement = document.getElementById("MenuButton");
    const menuElement = document.getElementById("Menu");
    const alertButtonElement = document.getElementById("AlertButton");
    const alertBoxElement = document.getElementById("AlertBox");
    const alertCountElement = document.getElementById("AlertCount");
    const closeBoxElement = document.getElementById("CloseBox");
    const welcomeBoxElement = document.getElementById("WelcomeBox");
    const buttonWrapper = document.getElementById("ButtonsWrapper");
    let menuClicked = false;
    let alertClicked = false;
    let closeBoxClicked = false;

    document.addEventListener("click", () => {
        if (alertBoxElement.classList.value.includes("active") && !alertButtonElement.classList.value.includes("active")) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell.svg";
            console.log("NotAlertClicked: " + alertClicked);
            processAlert();
        }
    });

    menuButtonElement.addEventListener('mouseenter', () => {
        if (!menuClicked) {
            menuElement.src = "./icons/menu-selected.svg";
        }
        else if (!menuElement.classList.value.includes(":active") && menuClicked == false) {
            menuElement.src = "./icons/menu.svg";
        }
    });

    menuButtonElement.addEventListener('mouseleave', () => {
        if (!menuElement.classList.value.includes(":active") && menuClicked == false) {
            menuElement.src = "./icons/menu.svg";
        }
        else if (menuElement.classList.value.includes(":active")) {
            menuElement.src = "./icons/menu-selected.svg";
        }
    });

    menuButtonElement.addEventListener('click', () => {
        menuClicked = !menuClicked;
        if (!menuElement.classList.value.includes(":active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "./icons/menu-selected.svg";
        }
        else if (menuElement.classList.value.includes(":active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "./icons/menu.svg";
        }
    });

    function debounceMouseEnter() {
        alertCountMouseIn();
        /* console.log("AlertActive: " + alertBoxElement.classList.value.includes("active"));
        console.log("AlertClicked: " + alertClicked); */
        if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.src = "./icons/bell-filled.svg";
            //console.log("activeAlertEnter: " + alertBoxElement.classList.value.includes("active"));
        }
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell-filled.svg";
        }
        else if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell-filled.svg";
        }
    }

    function debounceMouseLeave() {
        alertCountMouseOut();
        /* console.log("AlertActive: " + alertBoxElement.classList.value.includes("active"));
        console.log("AlertClicked: " + alertClicked); */
        if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell.svg";
        }
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell-filled.svg";
        }
        else if (alertBoxElement.classList.value.includes("active") && alertClicked) {
            alertBoxElement.src = "./icons/bell-filled.svg";
        }
        else if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.src = "./icons/bell.svg";
        }
    }

    function debounceAlert() {
        alertClicked = !alertClicked;
        console.log("AlertActive: " + alertBoxElement.classList.value.includes("active"));
        console.log("AlertClicked: " + alertClicked);
        if (alertBoxElement.classList.value.includes("active") && alertClicked) {
            alertBoxElement.classList.toggle("active");
        }
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked && !alertButtonElement.classList.value.includes("active")) {
            alertBoxElement.classList.toggle("active");
        }
        else if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.classList.toggle("active");
        }
        else if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
        }

        if (welcomeBoxElement.style.display == "none") {
            alertButtonElement.style.pointerEvents = "none";
            setTimeout(() => {alertButtonElement.style.setProperty('pointer-events', 'auto')}, 400);

            buttonWrapper.style.position = "static";
            buttonWrapper.style.marginTop = "0rem";
            buttonWrapper.style.marginBottom = "1rem";

            welcomeBoxElement.style.zIndex = "0";
            welcomeBoxElement.style.display = "flex";

            var myTimeout1 = setTimeout(moveAlert, 5);

            function moveAlert() {
                welcomeBoxElement.style.transform = "scale(0.25)";
                welcomeBoxElement.style.transition = "all 150ms linear";      
            }

            //welcomeBoxElement.style.transformOrigin = "120% -4.5rem 5rem";
            const alertRect = alertBoxElement.getBoundingClientRect();
            //console.log(alertRect);
            const alertX = (alertRect.x / 20.25);
            const alertY = -(alertRect.height / 8);

            welcomeBoxElement.style.transformOrigin = `${alertX}rem ${alertY}rem`;
            
            myTimeout1 = setTimeout(shrinkAlert, 100);

            function shrinkAlert() {
                welcomeBoxElement.style.transform = "scale(1)";
                welcomeBoxElement.style.transition = "all 100ms ease-in-out";
                //alertBoxElement.src = "./icons/bell-filled.svg";
            }

            myTimeout1 = setTimeout(removeAlert, 350);          

            function removeAlert() {
                alertCountElement.style.display = "none";
                //console.log(alertButtonElement.classList.value.toString());
            }
        }
    }

    

    function debounceClick() {
        alertClicked = !alertClicked;
        //alertBoxElement.classList.toggle("active");
        //console.log("clickAlertEnter: " + alertClicked);
        /* if (!alertBoxElement.classList.value.includes("active")) {
            alertBoxElement.classList.toggle("active");
        } */
        
        if (alertBoxElement.classList.value.includes("active")) {
            alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell.svg";
            //console.log("activeAlertClick: " + alertBoxElement.classList.value.includes("active"));
        }
        /* else if (!alertBoxElement.classList.value.includes("active") && alertClicked) {
            alertBoxElement.toggleAttribute("active");
            processCloseBox();
        } */
        /* else if (!alertBoxElement.classList.value.includes("active") && !alertClicked && !welcomeBoxElement.style.display == "none") {
            //console.log("activeAlertClickq: " + alertBoxElement.classList.value.includes("active"));
        } */
        else if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "./icons/bell-filled.svg";
        }
        processAlert();
    }

    function debounceCloseBox() {
        //const welcomeBoxElement = document.getElementById("WelcomeBox");
        //const alertButtonElement = document.getElementById("AlertButton");
        //const alertBoxElement = document.getElementById("AlertBox");
        //const alertCountElement = document.getElementById("AlertCount");
        //const buttonWrapper = document.getElementById("ButtonsWrapper");
        alertClicked = !alertClicked;
        processAlert();
        if (welcomeBoxElement.classList.value == "welcomeBox") {
            alertButtonElement.style.setProperty('pointer-events', 'none');
            setTimeout(() => {alertButtonElement.style.setProperty('pointer-events', 'auto')}, 400);
            /* if (alertBoxElement.classList.value.includes("active")) {
                alertBoxElement.classList.toggle("active");
                alertBoxElement.src = "./icons/bell.svg";
            } */
            
            welcomeBoxElement.style.zIndex = "3";
            
            buttonWrapper.style.position = "absolute";
            buttonWrapper.style.marginTop = "7rem";
    
            var myTimeout = setTimeout(moveAlert, 5);
    
            function moveAlert() {
                welcomeBoxElement.style.transform = "scale(0.25)";
                welcomeBoxElement.style.transition = "all 100ms ease-in-out";            
            }
    
            //welcomeBoxElement.style.transformOrigin = "120% -4.5rem 5rem";
            const alertElement = document.getElementById("AlertBox");
            const alertRect = alertElement.getBoundingClientRect();
            //console.log(alertRect);
            const alertX = (alertRect.x / 20.25);
            const alertY = -(alertRect.height / 8);
    
            welcomeBoxElement.style.transformOrigin = `${alertX}rem ${alertY}rem`;
            
            myTimeout = setTimeout(shrinkAlert, 100);
    
            function shrinkAlert() {
                welcomeBoxElement.style.transform = "scale(0)";
                welcomeBoxElement.style.transition = "all 150ms linear";
                //alertElement.src = "./icons/bell-filled.svg";
            }
            
            myTimeout = setTimeout(addAlert, 350);
            alertCountElement.style.display = "flex";
            
            function addAlert() {
                //welcomeBoxElement.classList.toggle("disabled");
                welcomeBoxElement.style.display = "none";
            }
        }
    }

    function alertCountMouseIn () {
        alertCountElement.style.scale = "1";
    }
    function alertCountMouseOut () {
        alertCountElement.style.scale = "0.9";
    }
    function menuMouseDown () {
        menu.style.scale = "0.9";
    }
    function menuMouseUp () {
        menu.style.scale = "1";
    }
    function alertMouseDown () {
        alertButtonElement.style.backgroundColor = "#4e4e4e";
        alertBoxElement.style.scale = "0.9";
    }
    function alertMouseUp () {
        alertButtonElement.style.backgroundColor = "";
        alertBoxElement.style.scale = "1";
    }
    function profileMouseDown () {
        profilePicture.style.scale = "0.9";
    }
    function profileMouseUp () {
        profilePicture.style.scale = "1";
    }
    function closeBoxMouseDown () {
        closeBoxElement.style.scale = "0.95";
    }
    function closeBoxMouseUp () {
        closeBoxElement.style.scale = "1";
    }
    

    const profilePicture = document.getElementById("ProfilePicture");
    const menu = document.getElementById("Menu");

    const processAlert = debounce(() => debounceAlert());
    const processClick = debounce(() => debounceClick());
    const processMouseEnter = debounce(() => debounceMouseEnter());
    const processMouseLeave = debounce(() => debounceMouseLeave());
    const processCloseBox = debounce(() => debounceCloseBox());

    alertButtonElement.addEventListener('mouseenter', processMouseEnter);
    alertButtonElement.addEventListener('mouseleave', processMouseLeave);
    alertButtonElement.addEventListener('click', processAlert);
    alertButtonElement.addEventListener("mousedown", alertMouseDown);
    alertButtonElement.addEventListener("mouseup", alertMouseUp);
    menu.addEventListener("mousedown", menuMouseDown);
    menu.addEventListener("mouseup", menuMouseUp);
    profilePicture.addEventListener("mousedown", profileMouseDown);
    profilePicture.addEventListener("mouseup", profileMouseUp);
    welcomeBoxElement.addEventListener("mousedown", closeBoxMouseDown);
    welcomeBoxElement.addEventListener("mouseup", closeBoxMouseUp);
    welcomeBoxElement.addEventListener("click", processCloseBox);

    closeBoxElement.addEventListener('mouseenter', () => {
        closeBoxElement.src = "./icons/close-selected.svg";
        closeBoxElement.style.scale = "1.25";
    });

    closeBoxElement.addEventListener('mouseleave', () => {
        closeBoxElement.src = "./icons/close-filled.svg";
        closeBoxElement.style.scale = "1";
    });

    /* closeBoxElement.addEventListener('click', () => {
        closeBoxClicked = !closeBoxClicked;
        if (welcomeBoxElement.disabled.value == true) {
            welcomeBoxElement.enabled();
        }
        else {
            welcomeBoxElement.disabled();
        }
    }); */
});