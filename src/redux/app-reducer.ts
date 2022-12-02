import { getAuth } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitalStateType = {
    unitialized: boolean
}

let initalState: InitalStateType = {
    unitialized: false
}


const appReducer = (state: InitalStateType = initalState, action: initializedSuccessActionType): InitalStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
            return {
                ...state,
                unitialized: true,
            };
        default:
            return state;
    }
}

export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS 
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;