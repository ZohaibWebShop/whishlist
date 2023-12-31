import { createApp } from '~/@shopify/app-bridge';
import { getSessionToken } from '~/@shopify/app-bridge-utils';
import axios from '~/axios';
window.axios = axios;


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';



let apiKey = document.querySelector("#api_key");
let host = document.querySelector("#host");

const app = createApp({
   apiKey: apiKey.value,
   host: host.value,
   forceRedirect:true
});


async function retrieveToken(app) {
     const sessionToken = await getSessionToken(app);
     window.sessionToken = sessionToken;


    // Update everything with the session-token class
    Array.from(document.getElementsByClassName('session-token')).forEach((el) => {
        if (el.hasAttribute('value')) {
            el.value = window.sessionToken;
            el.setAttribute('value', el.value);
        } else {
            el.dataset.value = window.sessionToken;
        }
    });

    const bearer = `Bearer ${window.sessionToken}`;

    if (window.axios) {
        // Axios
        window.axios.defaults.headers.common['Authorization'] = bearer;
    }
}

function keepRetrievingToken(app) {
    setInterval(() => {
        retrieveToken(app);
    }, 2000);
}

retrieveToken(app);
keepRetrievingToken(app);


Array.prototype.first = function(){
    return this[0];
};

Array.prototype.first = function(){
    return this[0];
};

Array.prototype.get = function(index){
    return this[index] || false;
};

Array.prototype.last = function(){
    return this[this.length-1];
};

Array.prototype.next = function(currentIndex){
    return this[currentIndex+1]?currentIndex+1:false;
};

Array.prototype.prev = function(currentIndex){
    return this[currentIndex-1]?currentIndex-1:false;
};

Array.prototype.last_index = function(){
    return this.length-1;
};

