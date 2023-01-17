import fireworks from "./fireworks";
import popup from "./popup";
import swiperInit from "./swiperInit";
import accordion from "./accordion";
import nav from "./navigation";
//Sets a vh custom property to account for the shifting vh in mobile
setDocHeight();
window.addEventListener('resize', setDocHeight);
window.addEventListener('orientationchange', setDocHeight);

function setDocHeight(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
}

const back = document.querySelector('#back');
if(back){
    back.addEventListener('click',goBack);
}
function goBack() {
    window.history.back();
}

fireworks();
nav();
popup();
swiperInit();
accordion();