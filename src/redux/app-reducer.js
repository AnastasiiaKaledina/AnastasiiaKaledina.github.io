import { getAuth } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initalState = {
    unitialized: false
}

const appReducer = (state = initalState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
            return {
                ...state,
                unitialized: true
            };
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuth());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;