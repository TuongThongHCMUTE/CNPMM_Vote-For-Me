const appReducer = (state, action) => {
    switch (action.type) {
        case "CURRENT_USER":
            return {...state, user: action.payload};
        case "GET_ALL_COMMENTS":
            return {...state, comments: action.payload};
        case "CREATE_ONE_COMMENT":
            return {...state, comments: [...state.comments, action.payload]};
        case "UPDATE_ONE_COMMENT":
            return {
                ...state,
                comments: state.comments.map((comment) => 
                    comment._id === action.payload._id
                        ? {...comment, ...action.payload}
                        : comment
                )
            };
        case "DELETE_ONE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter((comment) =>
                    comment._id !== action.payload._id 
                )
            }
        default:
            return state;
    }
}

export default appReducer;