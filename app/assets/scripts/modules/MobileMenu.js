class MobileMenu {
    constructor(){
        // first lets store the DOM selection of what we would like to click, and manipulate
        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.siteHeader = document.querySelector(".site-header")
        // And make sure we actually call the method events, because the constructor method is called immediately when APP.js makes a new MobileMenu
        this.events();
    }

    // Lets create a new method with the name events, here we will list all of the events we want to look out for
    events() {
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu())
    }

    // Lets create a new method for toggling the menu
    toggleTheMenu(){
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.siteHeader.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
    }

}

export default MobileMenu;