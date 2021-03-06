export const initialState = {
    groupName: '',
    categoryName: '',
    categoryParentName: '',
    subcategoryName: '',
    subcategoryParentName: '',
    subcategoryAncestorName: '',
    isOpenSidebar: false,
    isOpenLanguageToolbar: false,
    isOpenSearchToolbar: false,
    products: [],
    posts: []
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
        case 'TRIGGER_SIDEBAR': {
            return {
                ...state,
                isOpenSidebar: action.isOpenSidebar,
                isOpenLanguageToolbar: false,
                isOpenSearchToolbar: false
            }
        }
        case 'TRIGGER_SEARCHBAR': {
            return {
                ...state,
                isOpenSidebar: false,
                isOpenLanguageToolbar: false,
                isOpenSearchToolbar: action.isOpenSearchToolbar
            }
        }
        case 'TRIGGER_LANGUAGEBAR': {
            return {
                ...state,
                isOpenSidebar: false,
                isOpenLanguageToolbar: action.isOpenLanguageToolbar,
                isOpenSearchToolbar: false
            }
        }
        case 'SET_PRODUCTS': {
            return {
                ...state,
                products: action.products
            }
        }
        case 'SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        default:
            return state
    }
}

export default reducer