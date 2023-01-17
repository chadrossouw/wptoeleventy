import Swiper, { Navigation } from 'swiper';
const swiperInit = () =>{
    const swiperItem = document.querySelectorAll('.swiper');
    if(swiperItem){
        swiperItem.forEach(item=>{
            const slides = item.querySelectorAll('.swiper-slide');
            if(slides.length>1){
                const swiper = new Swiper(item,{
                    modules: [Navigation],
                    loop: true,
                    simulateTouch:true,
                    centeredSlides:true,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      },
                    }
                );
            }
        })
       
    }
    
}
export default swiperInit;