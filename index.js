function openLinkToGithub() {
    console.log('Clicked Span');
    location.assign("https://github.com/Computahwiz-Github");
}

function openLinkToSite() {
    console.log('Clicked Span');
    location.assign("./");
}

function closeWelcomeBoxClick() {
    const welcomeBoxElementList = document.getElementsByClassName("welcomeBox");
    if (welcomeBoxElementList[0].classList.value == "welcomeBox") {
        const welcomeBoxElement = welcomeBoxElementList[0];
        welcomeBoxElement.remove();
        const linkButtonsWrapper = document.getElementsByClassName("linkButtonsWrapper")
        const buttonWrapper = linkButtonsWrapper[0];
        buttonWrapper.style.marginTop = "50px";
    }
}

function profileButtonClick() {
    console.log("Profile Button Clicked");
    location.assign("./castle.html");
}

function homeButtonClick() {
    console.log("Home Button Clicked");
    location.assign("./");
}