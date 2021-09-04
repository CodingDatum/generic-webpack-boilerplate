import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {

    constructor(){
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events(){
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight
        }, 333))
    }

    runOnScroll(){

        if(window.scrollY > 200){
            this.siteHeader.classList.add("site-header--dark");
        }else{
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.determineScrollDirection();

        this.pageSections.forEach(element => this.calcSection(element))
    }

    determineScrollDirection(){

        if(window.scrollY > this.previousScrollY){
            this.scrollDirection = "down";
        }else{
            this.scrollDirection = 'up';
        }

        this.previousScrollY = window.scrollY

    }

    calcSection(el){
        if(window.scrollY+this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop+el.offsetHeight){
            let scrollPercent = (el.getBoundingClientRect().y/this.browserHeight) * 100;
            console.log("passed 1st if statement of calcSection method");
            if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection === 'down' || scrollPercent < 33 && this.scrollDirection === 'up'){
                console.log("passed 2nd if statement of calcSection method")
                let matchingLink = el.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(e => e.classList.remove("is-current-link"));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }
}

export default StickyHeader;