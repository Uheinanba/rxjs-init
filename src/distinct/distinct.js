import Rx from 'rxjs';

const button = document.getElementById("changename");
/**
    // html
    <h3 id="title"></h3>
    <button id="changename">My name is: </button>
    <input id="name" type="text" />
 */

const action$ = new Rx.ReplaySubject(0);
button.addEventListener('click', (evt) => {
    action$.next({
        value: document.getElementById("name").value
    })
})
var example = action$.distinctUntilChanged((p, q) => {
    return p.value === q.value;
}).subscribe(x => console.log(x))
