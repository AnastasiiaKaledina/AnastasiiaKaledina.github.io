const ADD_MESSAGE = 'ADD-MESSAGE';

let initalState = {
    nameData: [
        { name: 'Nastya', id: 'nastya' },
        { name: 'Roma', id: 'roma' },
        { name: 'Vasya', id: 'vasya' },
        { name: 'Sergey', id: 'sergey' },
        { name: 'Dasha', id: 'dasha' }
    ],
    messageData: [
        { text: 'Yo', id: '1' },
        { text: 'How are you?', id: '2' },
        { text: 'How old are you?', id: '3' },
        { text: 'Where are you from?', id: '4' },
        { text: 'London is the capital of the Great Britan', id: '5' }
    ],
}

const dialogsReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 3,
                text: action.message
            }
            return {
                ...state,
                messageData: [...state.messageData, newMessage]
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = (message) => ({ type: ADD_MESSAGE, message });

export default dialogsReducer;