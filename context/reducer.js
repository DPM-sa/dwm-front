export const initialState = {
    groupName: '',
    categoryName: '',
    categoryParentName: '',
    subcategoryName: '',
    subcategoryParentName: '',
    subcategoryAncestorName: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SELECTED_GROUP': {
            return {
                ...state,
                categoryName: '',
                categoryParentName: '',
                subcategoryName: '',
                subcategoryParentName: '',
                subcategoryAncestorName: '',
                groupName: action.groupName
            }
        }
        case 'CATEGORY_SELECTED': {
            return {
                ...state,
                categoryName: action.categoryName,
                subcategoryName: '',
                subcategoryParentName: '',
                subcategoryAncestorName: '',
                groupName: ''
            }
        }
        case 'CATEGORY_PARENT_SELECTED': {
            return {
                ...state,
                categoryParentName: action.categoryParentName
            }
        }
        case 'SUBCATEGORY_SELECTED': {
            return {
                ...state,
                categoryName: '',
                categoryParentName: '',
                subcategoryName: action.subcategoryName,
                groupName: ''
            }
        }
        case 'SUBCATEGORY_PARENT_ANCESTOR_SELECTED': {
            return {
                ...state,
                subcategoryParentName: action.subcategoryParentName,
                subcategoryAncestorName: action.subcategoryAncestorName,
            }
        }
        default:
            return state
    }
}

export default reducer