interface TodosState {
    todos: todo[]
}

const initialState = {
    todos: []
}

type Action = {type: "Delete_Todo", payload: string}

export const TodoReducer = (state:TodosState | undefined = initialState, action: Action)=>{
    switch(action.type){
        case "Delete_Todo": {

        }
        default: state
    }
}
