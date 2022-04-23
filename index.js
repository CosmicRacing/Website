let currentMember = 0;
let currentPackage = 0;
let members = ["member-0","member-1","member-2","member-3","member-4","member-5","member-6"];
let packages = ["package-0","package-1","package-2","package-3"];
timeOfLastMemberUpdate = getCurrentTime();
timeOfLastPackageUpdate = getCurrentTime();
let active = false;
let automaticChange;
let changeInterval = 3000;
let checkInterval = 200;


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
    if ( timeSinceLastUpdate >= changeInterval){
        loadRightMember();
    }
}

window.onload = function(event){
    if(window.screen.width <= 600 && active == false){
        active = true;
        automaticChangeMember = setInterval(changeAutomaticallyMember, checkInterval)
        automaticChangePackage = setInterval(changeAutomaticallyPackage, checkInterval)
    }else if (active == true){
        active = false;
        clearInterval(automaticChangeMember);
        clearInterval(automaticChangePackage);
    }
    tidyPackages();

}
window.onresize = function(event){
    if(window.screen.width <= 600 && active == false){
        active = true;
        automaticChangeMember = setInterval(changeAutomaticallyMember, checkInterval)
        automaticChangePackage = setInterval(changeAutomaticallyPackage, checkInterval)
    }else if (active == true){
        active = false;
        clearInterval(automaticChangeMember);
        clearInterval(automaticChangePackage);
    }
    tidyPackages();
}

let tidy = false;
function tidyPackages(){
    if (document.getElementById("package-2").offsetTop != document.getElementById("package-0").offsetTop){
        document.getElementById("package-3").style.width = "350px";
        tidy = true;
    }else if (tidy == true){
        document.getElementById("package-3").style.width = "100%";
        tidy = false
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


function unloadCurrentPackage(){
    timeOfLastPackageUpdate = getCurrentTime();
    document.getElementById(packages[currentPackage]).classList.add("hidden-small");
}
function loadCurrentPackage(){
    if(window.screen.width <= 600){
        document.getElementById(packages[currentPackage]).classList.remove("hidden-small");
    }
}

function loadLeftPackage(){
    unloadCurrentPackage();
    currentPackage -=1;
    if (currentPackage < 0){
        currentPackage = 3;
    }
    loadCurrentPackage();

}

function loadRightPackage(){
    unloadCurrentPackage();
    currentPackage +=1;
    if (currentPackage > 3){
        currentPackage = 0;
    }
    loadCurrentPackage();
}

function changeAutomaticallyPackage(){
    let timeSinceLastUpdate = getCurrentTime() - timeOfLastPackageUpdate;
    if ( timeSinceLastUpdate >= changeInterval){
        loadRightPackage();
    }
}

