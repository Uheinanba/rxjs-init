// 利用subject 实现状态管理

/**
    // html
    <h3 id="title"></h3>
    <button id="changename">My name is: </button>
    <input id="name" type="text" />
 */
import Rx from 'rxjs';

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Rx.Subject();

// Initial State
const initState = { name: '' };

// Redux reducer
const reducer = (state, action) => {   
  switch(action.type) {
    case 'NAME_CHANGED':
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}

// Reduxification
const store$ = action$  
    .startWith(initState)
    .scan(reducer)
    .distinctUntilChanged()

// Higher order function to send actions to the stream
const dispatch = (func) => (...args) => {
  action$.next(func(...args));  
}  

// Example action function
const changeName = dispatch((payload) => ({  
  type: 'NAME_CHANGED',
  payload
}));

const button = document.getElementById("changename");
const title = document.getElementById("title");

button.addEventListener('click', (evt) => {
  changeName(document.getElementById("name").value);
})

store$.subscribe(data => {
  console.log(data);
  if(data.name !== "") {
    title.innerHTML = "Hello " + data.name;
  } else {
    title.innerHTML = "What's your name?"
  }
})