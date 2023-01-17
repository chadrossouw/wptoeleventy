const nav = () =>{
    const navToggle = document.querySelector('.toggle_nav');
    const nav = document.querySelector('#menu_nav');
    navToggle.addEventListener('click',(e)=>{
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        if ( navToggle.getAttribute( 'aria-expanded' ) === 'true' ) {
            navToggle.setAttribute( 'aria-expanded', 'false' );
        } else {
            navToggle.setAttribute( 'aria-expanded', 'true' );
        }
    })
}

export default nav;