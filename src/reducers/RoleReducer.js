export const RoleReducer = (state, action) => {
    switch(action.type) {
        case 'GET_ROLES':
            return [...state, action.newRole];
        default:
            return state;
    }
} 