import { ADD_TO_MYBOOK_ACTION, REMOVE_FROM_MYBOOK_ACTION } from "../action/types";


const INITIAL_STATE = {
    myBook: []
}

const myBookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_MYBOOK_ACTION:
            console.log('action ', action);
            console.log('state ', state);
            console.log(INITIAL_STATE);
            const productInMBList = state.myBook.find(
                (p) => p.id === action.payload.id
            )
            console.log(action.payload);
            // neu chua co san pham
            if (!productInMBList) {
                return {
                    myBook: [...state.myBook,
                    action.payload]
                }
            } else {
                let newMyBook = state.myBook;
                const objIndex = newMyBook.findIndex(
                    (obj) => obj.id === action.payload.id
                );
                newMyBook.splice(objIndex, 1)
                return {
                    myBook: [...newMyBook]
                }
            }

        case REMOVE_FROM_MYBOOK_ACTION:
            console.log(action);
            let newMyBook = state.myBook;
            const objIndex = newMyBook.findIndex(
                (obj) => obj.id === action.payload.id
            );
            newMyBook.splice(objIndex, 1)
            return {
                myBook: [...newMyBook]
            }
        default:
            return state
    }
}


export default myBookReducer