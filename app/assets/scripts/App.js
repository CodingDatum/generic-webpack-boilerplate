import "../styles/styles.css";
import MobileMenu from './modules/MobileMenu.js';

let mobileMenu = new MobileMenu();

if(module.hot){
    module.hot.accept(); //telling the browser to accept these hot updates
}