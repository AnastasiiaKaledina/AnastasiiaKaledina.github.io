import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer, 
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type ReducerType = typeof reducers; 
export type AppStateType = ReturnType<ReducerType> 

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
const onStateChange = (function (global) {
    // @ts-ignore
    global._state = this.getState()
}.bind(store, global))
store.subscribe(onStateChange)
onStateChange()
// @ts-ignore
console.info('Application state is available via global _state object.', '_state=', global._state)

export default store;