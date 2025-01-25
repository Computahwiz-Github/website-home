function openLinkToGithub() {
    console.log('Clicked Span');
    location.assign("https://github.com/Computahwiz-Github");
}

function openLinkToSite() {
    console.log('Clicked Span');
    location.assign("../");
}

function playMeAGoodFartJamie() {
    var audio = new Audio('../audio/Fart.mp3');
    audio.play();
}

function letMeHearAnotherSean() {
    var audio = new Audio('../audio/FartReverb.mp3');
    audio.play();
}
