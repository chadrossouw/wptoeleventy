const fireworks = ()=>{
    window.addEventListener('DOMContentLoaded',()=>{
        const overlay = document.querySelector('#overlay');
        overlay.classList.add('hide');
        lazyLoadVideo("#hero-video");
        lazyLoadVideo("#hero-video-mobile");
    })
    const lazyLoadVideo = (elem) => {
        if(document.querySelector(elem)){
            let video = document.querySelector(elem);
            let sources = video.getElementsByTagName("source");
            for (let i = 0; i < sources.length; i++) {
                let data = sources[i].dataset.src;
                sources[i].src = data;
                video.load();
                video.oncanplay = () => {
                    video.play();
                    video.style.opacity = 1;
                };
            }
        }
    }
    
    //  sold out states
    
    if (document.getElementsByClassName('sold-out').length > 0) {
        let soldOut = document.getElementsByClassName('sold-out');
        for (let i = 0; i < soldOut.length; i++) {
            if(soldOut[i].tagName == 'A' || soldOut[i].tagName == 'BUTTON') {
                soldOut[i].innerHTML = 'SOLD OUT';
            }
        }
    }
}

export default fireworks;