import Rx from 'rxjs';

const button = document.getElementById("changename");
/**
    // html
    <h3 id="title"></h3>
    <button id="changename">My name is: </button>
    <input id="name" type="text" />
 */

const action$ = new Rx.Subject();
button.addEventListener('click', (evt) => {
    action$.next({
        value: document.getElementById("name").value
    })
})
var example = action$.distinct((x) => {
    return x.value
}).subscribe(x => console.log(x))
