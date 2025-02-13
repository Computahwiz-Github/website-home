document.addEventListener('DOMContentLoaded', () => {
    const menuButtonElement = document.getElementById("MenuButton");
    const menuElement = document.getElementById("Menu");
    const alertButtonElement = document.getElementById("AlertButton");
    const alertBoxElement = document.getElementById("AlertBox");
    const alertCountElement = document.getElementById("AlertCount");
    /* const closeBoxElement = document.getElementById("CloseBox"); */
    /* const welcomeMessageElement = document.getElementById("WelcomeMessage"); */
    const buttonWrapper = document.getElementById("ButtonsWrapper");
    const toggleSwitch = document.getElementById("ToggleSwitch");
    const enableOutlinesLabel = document.getElementById("EnableOutlinesLabel");
    const menuContentElement = document.getElementById("MenuContent");
    const profilePictureElement = document.getElementById("ProfilePicture");
    const bodyImageElements = document.getElementsByClassName("bodyImages");
    let menuClicked = false;
    let alertClicked = false;

    checkOutlinesToggled(toggleSwitch);

    for (let imageIndex = 0; imageIndex < bodyImageElements.length; imageIndex++) {
        const imageElement = bodyImageElements[imageIndex];
        if (imageIndex % 3 === 0) {
            imageElement.style.setProperty("grid-column", "1");
        }
        else if (imageIndex % 3 === 1) {
            imageElement.style.setProperty("grid-column", "2");
        }
        else if (imageIndex % 3 === 2) {
            imageElement.style.setProperty("grid-column", "3");
        }
    }

    document.addEventListener("click", () => {
        if (alertBoxElement.classList.value.includes("active") &&
            !alertButtonElement.classList.value.includes("active")) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell.svg";
            console.log("NotAlertClicked: " + alertClicked);
            processAlert();
        }
    });

    menuButtonElement.addEventListener('mouseenter', () => {
        if (!menuClicked) {
            menuElement.src = "../icons/menu-selected.svg";
        }
        else if (!menuElement.classList.value.includes(":active") && menuClicked == false) {
            menuElement.src = "../icons/menu.svg";
        }
    });

    menuButtonElement.addEventListener('mouseleave', () => {
        if (!menuElement.classList.value.includes(":active") && menuClicked == false) {
            menuElement.src = "../icons/menu.svg";
        }
        else if (menuElement.classList.value.includes(":active")) {
            menuElement.src = "../icons/menu-selected.svg";
        }
    });

    menuButtonElement.addEventListener('click', () => {
        menuClicked = !menuClicked;
        toggleSwitch.classList.toggle("visible");
        enableOutlinesLabel.classList.toggle("visible");
        menuContentElement.classList.toggle("visible");

        if (!menuElement.classList.value.includes(":active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "../icons/menu-selected.svg";
        }
        else if (menuElement.classList.value.includes(":active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "../icons/menu.svg";
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
            alertBoxElement.src = "../icons/bell-filled.svg";
            //console.log("activeAlertEnter: " + alertBoxElement.classList.value.includes("active"));
        }
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell-filled.svg";
        }
        else if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell-filled.svg";
        }
    }

    function debounceMouseLeave() {
        alertCountMouseOut();
        /* console.log("AlertActive: " + alertBoxElement.classList.value.includes("active"));
        console.log("AlertClicked: " + alertClicked); */
        if (alertBoxElement.classList.value.includes("active") && !alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell.svg";
        }
        else if (!alertBoxElement.classList.value.includes("active") && alertClicked) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell-filled.svg";
        }
        else if (alertBoxElement.classList.value.includes("active") && alertClicked) {
            alertBoxElement.src = "../icons/bell-filled.svg";
        }
        else if (!alertBoxElement.classList.value.includes("active") && !alertClicked) {
            alertBoxElement.src = "../icons/bell.svg";
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
            const alertX = (alertRect.x / 20.75);
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

    function alertCountMouseIn () {
        alertCountElement.style.scale = "1";
    }
    function alertCountMouseOut () {
        alertCountElement.style.scale = "0.9";
    }
    function menuMouseDown () {
        menuElement.style.scale = "0.9";
    }
    function menuMouseUp () {
        menuElement.style.scale = "1";
    }
    function menuClick () {
        if (menuButtonElement.src == "../icons/menu.svg") {
            menuElement.style.borderRadius = "10px";
            menuElement.style.boxShadow = "0px 0px 10px 0px rgb(0, 0, 0, 0.5)";
            menuElement.style.backgroundColor = "#2e2e2e";
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
        profilePictureElement.style.scale = "0.9";
    }
    function profileMouseUp () {
        profilePictureElement.style.scale = "1";
    }

    addButtonListeners(alertButtonElement, menuElement, profilePictureElement, 
        menuMouseDown, menuMouseUp, menuClick, alertMouseDown, alertMouseUp, 
        profileMouseDown, profileMouseUp, debounceMouseEnter, debounceMouseLeave, 
        debounceAlert);
});

function addButtonListeners(alertButtonElement, menuElement, profilePictureElement, 
    menuMouseDown, menuMouseUp, menuClick, alertMouseDown, alertMouseUp, 
    profileMouseDown, profileMouseUp, debounceMouseEnter, debounceMouseLeave, 
    debounceAlert) {
        const processAlert = debounce(() => debounceAlert());
        const processMouseEnter = debounce(() => debounceMouseEnter());
        const processMouseLeave = debounce(() => debounceMouseLeave());

        alertButtonElement.addEventListener('click', processAlert);
        alertButtonElement.addEventListener('mouseenter', processMouseEnter);
        alertButtonElement.addEventListener('mouseleave', processMouseLeave);
        alertButtonElement.addEventListener("mousedown", alertMouseDown);
        alertButtonElement.addEventListener("mouseup", alertMouseUp);
        menuElement.addEventListener("mousedown", menuMouseDown);
        menuElement.addEventListener("mouseup", menuMouseUp);
        menuElement.addEventListener("click", menuClick);
        profilePictureElement.addEventListener("mousedown", profileMouseDown);
        profilePictureElement.addEventListener("mouseup", profileMouseUp);
}

function openLinkToGithub() {
    console.log('Clicked Span');
    location.assign("https://github.com/Computahwiz-Github");
}

function openLinkToSite() {
    console.log('Clicked Span');
    location.assign("../");
}

function profileButtonClick() {
    console.log("Profile Button Clicked");
    location.assign("../castle/");
}

function homeButtonClick() {
    console.log("Home Button Clicked");
    location.assign("../");
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
    const divElements = document.querySelectorAll('div');

    divElements.forEach(divElement => {
        if (divElement.style.outline == "") {
            divElement.style.outline = "dashed red";
        }
        else {
            divElement.style.outline = "";
        }
      });
      
    console.log("Borders: " + divElements[0].style.outline.toString());
}

function debounce(func, timeout = 50) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

/* function addImagesFromFolder() {
    const fileReader = new FileReader();
    fetch(URL.createObjectURL(fileReader.result), {})
    let folder = "./uploaded images";
    let isImageFile = false;

    fileReader.onloadend = function() {
        const mimeType = fileReader.result.slice(0, fileReader.result.indexOf(";"));
        isImageFile = mimeType.startsWith("image/")
    };

    fileReader.readAsDataURL(folder);
}

async function getDirectory(dirname) {
    let response = await fetch(dirname);
    let str = await response.text();
    let el = document.createElement('html');
    el.innerHTML = str;
  
    // this parse will work for http-server and may have to be modified for other
    // servers. Inspect the returned string to determine the proper parsing method
    let list = el.getElementsByTagName("table")[0].getElementsByTagName("a");
    let arr = [];
    for (i = 0; i < list.length; i++) {
      arr[i] = list[i].innerHTML;
    }
    arr.shift(); // get rid of first result which is the "../" directory reference
    console.log(arr); // this is your list of files (or directories ending in "/")
    return(arr);
  } */