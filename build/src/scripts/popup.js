let popup = ()=>{
    const toggles = document.querySelectorAll('.toggle_modal');
    if(toggles.length>0){
        toggles.forEach((toggle)=>{
            toggle.addEventListener('click',(e)=>{
                let modal = document.querySelector(`#${e.currentTarget.dataset.modalTarget}`);
                console.log(modal);
                modal.classList.toggle('show');
                toggles.forEach(toggle=>{
                    if ( toggle.getAttribute( 'aria-expanded' ) === 'true' ) {
                        toggle.setAttribute( 'aria-expanded', 'false' );
                    } else {
                        toggle.setAttribute( 'aria-expanded', 'true' );
                    }
                })
            })
        })
    }
    
}

export default popup;