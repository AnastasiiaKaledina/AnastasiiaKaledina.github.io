import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'


let store = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, text: 'Hello', likes: '5'},
                {id: 2, text: 'Bye', likes: '15'},
                {id: 3, text: 'Hi', likes: '20'}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage : {
            nameData: [
                {name: 'Nastya', id: 'nastya'}, 
                {name: 'Roma', id: 'roma'}, 
                {name: 'Vasya', id: 'vasya'}, 
                {name:'Sergey', id: 'sergey'}, 
                {name: 'Dasha', id:'dasha'}
            ],
            messageData: [
                {text: 'Yo', id: '1'}, 
                {text: 'How are you?', id: '2'}, 
                {text: 'How old are you?', id: '3'}, 
                {text:'Where are you from?', id: '4'}, 
                {text: 'London is the capital of the Great Britan', id:'5'}
            ],
            newMessageText: ''
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscribe = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscribe(this._state);

    }
}

export default store;