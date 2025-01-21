function openLinkToGithub() {
    console.log('Clicked Span');
    window.open("https://github.com/Computahwiz-Github/Death-Statues-Mod-1.20.X", '_blank');
}

function openLinkToSite() {
    console.log('Clicked Span');
    window.open("https://www.isaiah.digital", '_blank');
}

function closeWelcomeBoxClick() {
    const welcomeBoxElementList = document.getElementsByClassName("welcomeBox");
    if (welcomeBoxElementList[0].classList.value == "welcomeBox") {
        const welcomeBoxElement = welcomeBoxElementList[0];
        welcomeBoxElement.animate({});
        welcomeBoxElement.remove();
    }
}