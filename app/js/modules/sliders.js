import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

const Sliders = () => {
    SwiperCore.use([Navigation, Pagination]);
    const swiper = new Swiper('.first-screen__container .swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
}

export default Sliders;