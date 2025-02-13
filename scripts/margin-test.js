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

    /* bodyImageElements.addEventListener('mouseenter', () => {
        enhanceZoom();
    }); */

    const blurryDivs = document.querySelectorAll(".blur-load");
    blurryDivs.forEach((blurryDiv) => {
        const img = blurryDiv.querySelector("img");

        function loaded() {
            //show image
            blurryDiv.classList.add("loaded");
            //console.log("img complete: " + img.complete);
            console.log(blurryDiv.style.backgroundImage.toString());
            img.style.zIndex = -1;
            const setBackgroundDiv = debounce(function() {
                blurryDiv.style.background = "none";
                console.log("2000ms");
                console.log("blurdiv display " + blurryDiv.style.backgroundImage.toString());
                img.style.zIndex = "auto";
            }, 2000);
            setBackgroundDiv();
        }

        if (img.complete) {
            loaded();
            console.log("img.complete loaded");
        }
        else {
            img.addEventListener("load", loaded);
        }
    })
    
    const bodyImageElementCollection = document.querySelectorAll("img.bodyImages");
        bodyImageElementCollection.forEach(imageElement => {
            imageElement.addEventListener('mouseenter', () => {
                if (imageElement.style.gridColumn === 1) {
                    console.log("1");
                    console.log(imageElement);
                }
                if (imageElement.style.gridColumn === 2) {
                    console.log("2");
                }
                if (imageElement.style.gridColumn === 3) {
                    console.log("3");
                }
            });
        });

    document.addEventListener("click", () => {
        if (alertBoxElement.classList.value.includes("active") &&
            !alertButtonElement.classList.value.includes("active")) {
            //alertBoxElement.classList.toggle("active");
            alertBoxElement.src = "../icons/bell.svg";
            console.log("NotAlertClicked: " + alertClicked);
            //processAlert();
        }
    });

    menuButtonElement.addEventListener('mouseenter', () => {
        if (!menuClicked) {
            menuElement.src = "../icons/menu-selected.svg";
        }
    });

    menuButtonElement.addEventListener('mouseleave', () => {
        if (!menuElement.classList.value.includes(":active") && menuClicked == false) {
            menuElement.src = "../icons/menu.svg";
        }
    });

    menuButtonElement.addEventListener('click', () => {
        menuClicked = !menuClicked;
        menuContentElement.classList.toggle("visible");

        if (!menuElement.classList.value.includes("active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "../icons/menu-selected.svg";
            menuButtonElement.style.boxShadow= "0px 0px 10px 0px rgb(0, 0, 0, 0.75)";
        }
        else if (menuElement.classList.value.includes("active")) {
            menuElement.classList.toggle("active");
            menuElement.src = "../icons/menu.svg";
            menuButtonElement.style.boxShadow= "";
        }
    });

    toggleSwitch.addEventListener("mouseenter", () => {
        enableOutlinesLabel.style.backgroundColor = "#4e4e4e";
    });
    toggleSwitch.addEventListener("mouseleave", (e) => {
        if (e.relatedTarget != enableOutlinesLabel) {
            enableOutlinesLabel.style.backgroundColor = "";
        }
    });
    enableOutlinesLabel.addEventListener("mouseenter", () => {
        enableOutlinesLabel.style.backgroundColor = "#4e4e4e";
    });
    enableOutlinesLabel.addEventListener("mouseleave", () => {
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

    /* function debounceAlert() {
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
    } */

    function profileMouseDown () {
        profilePictureElement.style.scale = "0.9";
    }
    function profileMouseUp () {
        profilePictureElement.style.scale = "1";
    }
    function alertMouseDown () {
        alertButtonElement.style.backgroundColor = "#4e4e4e";
        alertBoxElement.style.scale = "0.9";
    }
    function alertMouseUp () {
        alertButtonElement.style.backgroundColor = "";
        alertBoxElement.style.scale = "1";
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
            menuButtonElement.style.boxShadow = "0px 0px 10px 0px rgb(0, 0, 0, 0.5)";
            menuElement.style.backgroundColor = "#2e2e2e";
        }
        else if (menuButtonElement.src == "../icons/menu-selected.svg") {
            menuButtonElement.style.boxShadow = "";
        }
    }

    /* addButtonListeners(alertButtonElement, menuElement, profilePictureElement, 
        profileMouseDown, profileMouseUp, debounceMouseEnter, debounceMouseLeave, 
        debounceAlert); */
    addButtonListeners(alertButtonElement, menuButtonElement, profilePictureElement, 
        profileMouseDown, profileMouseUp, alertMouseDown, alertMouseUp, debounceMouseEnter, 
        debounceMouseLeave, menuMouseDown, menuMouseUp, menuClick);
});

function addButtonListeners(alertButtonElement, menuButtonElement, profilePictureElement, 
    profileMouseDown, profileMouseUp, alertMouseDown, alertMouseUp, debounceMouseEnter, 
    debounceMouseLeave, menuMouseDown, menuMouseUp, menuClick) {
        //const processAlert = debounce(() => debounceAlert());
        /* const processMouseEnter = debounce(() => debounceMouseEnter());
        const processMouseLeave = debounce(() => debounceMouseLeave()); */

        //alertButtonElement.addEventListener('click', processAlert);
        /* alertButtonElement.addEventListener('mouseenter', processMouseEnter);
        alertButtonElement.addEventListener('mouseleave', processMouseLeave);
        alertButtonElement.addEventListener("mousedown", alertMouseDown());
        alertButtonElement.addEventListener("mouseup", alertMouseUp()); */
        menuButtonElement.addEventListener("mousedown", menuMouseDown);
        menuButtonElement.addEventListener("mouseup", menuMouseUp);
        menuButtonElement.addEventListener("click", menuClick);
        profilePictureElement.addEventListener("mousedown", profileMouseDown);
        profilePictureElement.addEventListener("mouseup", profileMouseUp);
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

function enableOutlinesLabelToggle() {
    const toggleSwitch = document.getElementById("ToggleSwitch");
    let switchToggled = toggleSwitch.getElementsByTagName("input")[0];
    switchToggled.checked = !switchToggled.checked;
    /* console.log(toggleSwitch.getElementsByTagName("input")[0].checked); */
    const processToggle = debounce(() => enableOutlinesClick());
    processToggle();
}

function showFamilyProjectsClick() {
    const lowerBodyDiv = document.querySelectorAll("div.lowerBody");
    console.log(lowerBodyDiv.length);
    lowerBodyDiv.forEach(innerElement => {
        if (innerElement.innerHTML.includes("iframe")) {
            console.log("includes iframe");
            innerElement.innerHTML = "";
            innerElement.style.background = "";
            innerElement.style.boxShadow = "";
        }
        else {
            console.log(innerElement.toString());
            console.log("creating iframes");

            innerElement.style.background = "#2e2e2e";
            innerElement.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.5)";
            innerElement.style.animation = "growOut 400ms ease-in alternate";
            innerElement.innerHTML += '<iframe height="450" width="75%" title="Media player" src="https://embed.music.apple.com/us/album/dust-up-4-ep-version/1658655560?itscg=30200&amp;itsct=music_box_player&amp;ls=1&amp;app=music&amp;mttnsubad=1658655560&amp;theme=auto" id="embedPlayer" \
            style="margin-top: 0.5rem; border: 0px; border-radius: 12px; width: 75%; height: 450px; max-width: 660px;"></iframe>';
            innerElement.innerHTML += '<iframe height="450" width="75%" title="Media player" src="https://embed.music.apple.com/us/album/little-hours-ep/1732558189?itscg=30200&amp;itsct=music_box_player&amp;ls=1&amp;app=music&amp;mttnsubad=1732558189&amp;theme=auto" id="embedPlayer2" \
            style="margin-top: 0.5rem; border: 0px; border-radius: 12px; width: 75%; height: 450px; max-width: 660px;"></iframe>';
        }
    });
}
function debounce(func, timeout = 50) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}