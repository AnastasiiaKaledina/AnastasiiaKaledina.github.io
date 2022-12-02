const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    name: string
    id: number
}

type MessageType = {
    text: string
    id: number
}

let initalState = { 
    nameData: [
        { name: 'Nastya', id: 1 },
        { name: 'Roma', id: 2 },
        { name: 'Vasya', id: 3 },
        { name: 'Sergey', id: 4 },
        { name: 'Dasha', id: 5 }
    ] as Array<DialogType>,
    messageData: [
        { text: 'Yo', id: 1 },
        { text: 'How are you?', id: 2 },
        { text: 'How old are you?', id: 3 },
        { text: 'Where are you from?', id: 4 },
        { text: 'London is the capital of the Great Britan', id: 5 }
    ] as Array<MessageType>,
}

export type InitalStateType = typeof initalState;

const dialogsReducer = (state = initalState, action: any): InitalStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 6,
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

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    message: string
}
export const addMessageActionCreator = (message: string): addMessageActionType => ({ type: ADD_MESSAGE, message });

export default dialogsReducer;