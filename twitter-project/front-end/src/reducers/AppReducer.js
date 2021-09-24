export default function reducer(state, action){
    // action phan hoi state moi
    switch (action.type) {
        // Kiem tra trang thai nguoi dung hien tai
        case "CURRENT_USER":
            // Lay toan bo trong state, lay user thay bang action.payload
            return {...state, user: action.payload};
        case "GET_ALL_POSTS":
            return {...state, posts: action.payload};
        case "CREATE_ONE_POST":
            return {...state, posts: [...state.posts, action.payload]};
        case "UPDATE_ONE_POST":
            return {
                ...state,
                // 
                posts: state.posts.map((post) => // Duyet qua cac bai post
                post._id === action.payload._id
                    ? {...post, ...action.payload} // Trung update bai post
                    : post // Khong trung phan hoi bai post
                ),
            };
        case "DELETE_ONE_POST":
            return {
                ...state,
                // filter loc bai post co cai khac id muon xoa
                posts: state.posts.filter((post) => post._id !== action.payload._id),
            };      
    
        default:
            return state;
    }
}