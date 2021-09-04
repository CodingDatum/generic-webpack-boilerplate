import "../styles/styles.css";
import MobileMenu from './modules/MobileMenu.js';
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import Modal from './modules/Modal';

new Modal();
let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

if(module.hot){
    module.hot.accept(); //telling the browser to accept these hot updates
}