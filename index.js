let currentMember = 0;
let members = ["member-0","member-1","member-2","member-3","member-4","member-5","member-6"];
timeOfLastMemberUpdate = getCurrentTime();
let active = false;
let automaticChange;
let changeInterval = 5000;

for (let i = 1; i < members.length; i++) {
    document.getElementById(members[i]).classList.add("hidden-small");
}

function getCurrentTime(){
    let d = new Date();
    return d.getTime();
}

function moveToTeamWrapper(){
    window.scroll({
        top: document.getElementById("team-wrapper").offsetTop,
        behavior: "smooth"
    });
}

function unloadCurrentMember(){
    timeOfLastMemberUpdate = getCurrentTime();
    document.getElementById(members[currentMember]).classList.add("hidden-small");
}
function loadCurrentMember(){
    if(window.screen.width <= 600){
        document.getElementById(members[currentMember]).classList.remove("hidden-small");
    }
}

function loadLeftMember(){
    unloadCurrentMember();
    currentMember -=1;
    if (currentMember < 0){
        currentMember = 6;
    }
    loadCurrentMember();

}

function loadRightMember(){
    unloadCurrentMember();
    currentMember +=1;
    if (currentMember > 6){
        currentMember = 0;
    }
    loadCurrentMember();
}

function changeAutomaticallyMember(){
    let timeSinceLastUpdate = getCurrentTime() - timeOfLastMemberUpdate;
    if ( timeSinceLastUpdate> 1000){
        loadRightMember();
    }
}

window.onload = function(event){
    if(window.screen.width <= 600 && active == false){
        active = true;
        automaticChange = setInterval(changeAutomaticallyMember, changeInterval)
    }else if (active == true){
        active = false;
        clearInterval(automaticChange);
    }
}
window.onresize = function(event){
    if(window.screen.width <= 600 && active == false){
        active = true;
        automaticChange =setInterval(changeAutomaticallyMember, changeInterval)
    }else if (active == true && window.screen.width > 600){
        active = false;
        clearInterval(automaticChange);
    }
}

let touchstartX = 0
let touchendX = 0

const memberCard = document.getElementById('member-container');

function handleGesture() {
  if (touchendX < touchstartX){
    loadLeftMember();
  } 
  if (touchendX > touchstartX) {
    loadRightMember();
  }
}

memberCard.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

memberCard.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  handleGesture()
})
