document.addEventListener('DOMContentLoaded', () => {
    const menuButtonElement = document.getElementById("MenuButton");
    const menuElement = document.getElementById("Menu");
    const alertButtonElement = document.getElementById("AlertButton");
    const alertBoxElement = document.getElementById("AlertBox");
    const alertCountElement = document.getElementById("AlertCount");
    const closeBoxElement = document.getElementById("CloseBox");
    const welcomeMessageElement = document.getElementById("WelcomeMessage");
    const buttonWrapper = document.getElementById("ButtonsWrapper");
    const toggleSwitch = document.getElementById("ToggleSwitch");
    const enableOutlinesLabel = document.getElementById("EnableOutlinesLabel");
    const menuContentElement = document.getElementById("MenuContent");
    let menuClicked = false;
    let alertClicked = false;

    checkOutlinesToggled(toggleSwitch);

    document.addEventListener("click", () => {
        if (alertBoxElement.classList.value.includes("active") &&
            !alertButtonElement.classList.value.includes("active")) {
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
        toggleSwitch.classList.toggle("visible");
        enableOutlinesLabel.classList.toggle("visible");
        menuContentElement.classList.toggle("visible");

        if (!menuElement.classList.value.includes("active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "./icons/menu-selected.svg";
            menuButtonElement.style.boxShadow = "0px 0px 10px 0px rgb(0, 0, 0, 0.5)";
            menuButtonElement.style.backgroundColor = "#2e2e2e";
            menuButtonElement.style.borderRadius = "10px";
        }
        else if (menuElement.classList.value.includes("active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "./icons/menu.svg";
            menuButtonElement.style.boxShadow = "";
            menuButtonElement.style.backgroundColor = "";
        }
    });

    toggleSwitch.addEventListener("mouseenter", () => {
        enableOutlinesLabel.style.backgroundColor = "#4e4e4e";
    });
    toggleSwitch.addEventListener("mouseleave", () => {
        enableOutlinesLabel.style.backgroundColor = "";
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
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked && 
        !alertButtonElement.classList.value.includes("active")) {
            alertBoxElement.classList.toggle("active");
        }
        else if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.classList.toggle("active");
        }
        else if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
        }
        console.log("hide" + welcomeMessageElement.classList.contains("visible") );
        if (welcomeMessageElement.classList.contains("visible")) {
            alertButtonElement.style.pointerEvents = "none";
            closeBoxElement.style.pointerEvents = "none";
            setTimeout(() => {alertButtonElement.style.setProperty('pointer-events', 'auto')}, 400);
            setTimeout(() => {closeBoxElement.style.setProperty('pointer-events', 'auto')}, 400);

            buttonWrapper.style.position = "static";
            buttonWrapper.style.marginTop = "0rem";
            buttonWrapper.style.marginBottom = "1rem";

            welcomeMessageElement.classList.toggle("visible");
            welcomeMessageElement.style.zIndex = "0";

            var myTimeout1 = setTimeout(moveAlert, 5);

            function moveAlert() {
                welcomeMessageElement.style.transform = "scale(0.25)";
                welcomeMessageElement.style.transition = "all 150ms linear";      
            }

            //welcomeBoxElement.style.transformOrigin = "120% -4.5rem 5rem";
            const alertRect = alertBoxElement.getBoundingClientRect();
            //console.log(alertRect);
            const alertX = (alertRect.x / 40);
            const alertY = -(alertRect.height / 12);

            welcomeMessageElement.style.transformOrigin = `${alertX}rem ${alertY}rem`;
            
            myTimeout1 = setTimeout(shrinkAlert, 100);

            function shrinkAlert() {
                welcomeMessageElement.style.transform = "scale(1)";
                welcomeMessageElement.style.transition = "all 100ms ease-in-out";
                //alertBoxElement.src = "./icons/bell-filled.svg";
            }

            myTimeout1 = setTimeout(removeAlert, 350);          

            function removeAlert() {
                alertCountElement.classList.toggle("visible");
                console.log("remove" + welcomeMessageElement.classList.toString() );
                //console.log(alertButtonElement.classList.value.toString());
            }
        }
    }

    function debounceCloseBox() {
        alertClicked = !alertClicked;
        processAlert();
        if (welcomeMessageElement.classList.value == "welcomeMessage") {
            alertButtonElement.style.setProperty('pointer-events', 'none');
            closeBoxElement.style.setProperty('pointer-events', 'none');
            setTimeout(() => {alertButtonElement.style.setProperty('pointer-events', 'auto')}, 400);
            setTimeout(() => {closeBoxElement.style.setProperty('pointer-events', 'auto')}, 400);
            /* if (alertBoxElement.classList.value.includes("active")) {
                alertBoxElement.classList.toggle("active");
                alertBoxElement.src = "./icons/bell.svg";
            } */
            
            welcomeMessageElement.style.zIndex = "3";
            alertCountElement.classList.toggle("visible");
            
            buttonWrapper.style.position = "absolute";
            buttonWrapper.style.marginTop = "7rem";
    
            var myTimeout = setTimeout(moveAlert, 5);
    
            function moveAlert() {
                welcomeMessageElement.style.transform = "scale(0.25)";
                welcomeMessageElement.style.transition = "all 100ms ease-in-out";            
            }
    
            //welcomeBoxElement.style.transformOrigin = "120% -4.5rem 5rem";
            const alertElement = document.getElementById("AlertBox");
            const alertRect = alertElement.getBoundingClientRect();
            //console.log(alertRect);
            let alertX = (alertRect.x / 26);
            let alertY = -(alertRect.height / 12);
            console.log(document.body.offsetWidth);
            if (document.body.offsetWidth <= 1250) {
                alertX = (alertRect.x / 24);
                alertY = -(alertRect.height / 20);
            }
    
            welcomeMessageElement.style.transformOrigin = `${alertX}rem ${alertY}rem`;
            
            myTimeout = setTimeout(shrinkAlert, 100);
    
            function shrinkAlert() {
                welcomeMessageElement.style.transform = "scale(0)";
                welcomeMessageElement.style.transition = "all 150ms linear";
                //alertElement.src = "./icons/bell-filled.svg";
            }
            
            myTimeout = setTimeout(addAlert, 350);
            
            function addAlert() {
                //welcomeBoxElement.classList.toggle("disabled");
                welcomeMessageElement.classList.toggle("visible");
                console.log("alert" + welcomeMessageElement.classList.toString() );
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
    function menuClick () {
        if (menuButton.src == "./icons/menu.svg") {
            menu.style.borderRadius = "10px";
            menu.style.boxShadow = "0px 0px 10px 0px rgb(0, 0, 0, 0.5)";
            menu.style.backgroundColor = "#2e2e2e";
        }
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
    const menuButton = document.getElementById("MenuButton");

    const processAlert = debounce(() => debounceAlert());
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
    menu.addEventListener("click", menuClick);
    profilePicture.addEventListener("mousedown", profileMouseDown);
    profilePicture.addEventListener("mouseup", profileMouseUp);
    welcomeMessageElement.addEventListener("mousedown", closeBoxMouseDown);
    welcomeMessageElement.addEventListener("mouseup", closeBoxMouseUp);
    closeBoxElement.addEventListener("click", processCloseBox);

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

function checkOutlinesToggled(toggleSwitch) {
    let switchToggled = toggleSwitch.getElementsByTagName("input")[0].checked;
    if (switchToggled) {
        console.log("Div Borders Enabled: " + switchToggled);
        enableOutlinesClick();
    }
    else {
        const divElements = document.querySelectorAll('div');
        console.log("Div Borders Enabled: " + switchToggled);
        console.log("Borders: " + divElements[0].style.outline.toString());
    }
}

function enableOutlinesClick() {
    let divElements = document.querySelectorAll('div');

    divElements.forEach(divElement => {
        if (divElement.style.outline == "") {
            divElement.style.outline = "dashed red";
        }
        else {
            divElement.style.outline = "";
        }
        console.log("Borders: " + divElements[0].style.outline.toString());
      });
}
function debounce(func, timeout = 50) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}