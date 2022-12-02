import profileReducer, { addPostActionCreator, deletePostActionCreator } from "./profile-reducer";

let state = {
    postData: [
        { id: 1, text: 'Hello', likes: '5' },
        { id: 2, text: 'Bye', likes: '15' },
        { id: 3, text: 'Hi', likes: '20' }
    ]
};

test('length of posts should be incremented', () => { 
    let action = addPostActionCreator("hello");
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(4);
});


test('message of new post should be hello', () => { 
    let action = addPostActionCreator("hello");
    let newState = profileReducer(state, action);
    expect(newState.postData[3].text).toBe("hello");
});

test('after deleting length should be decremented', () => { 
    let action = deletePostActionCreator(3);
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(2);
});

test('после удаления поста с некорректным id количество постов не должно уменьшиться', () => { 
    let action = deletePostActionCreator(300);
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(3);
});