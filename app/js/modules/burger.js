const burger = (trigger, menu, activeClass) => {
    const burgerButton = document.querySelector(trigger),
          nav = document.querySelector(menu);

    if (!burgerButton) return;

    burgerButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        nav.classList.toggle(activeClass);
    })
};

export default burger;