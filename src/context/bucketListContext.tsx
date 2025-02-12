import {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useReducer,
    Dispatch
} from "react";

// Define types
export interface ListElement {
    checked: boolean;
    description: string;
}
interface ModalProps {
    show: boolean,
    text: string,
    hasButtons: boolean,
    action: () => void
}

interface BucketListType {
    title: string,
    description: string,
    list: ListElement[],
    temporaryList: ListElement[],
    showList: boolean,
    showToaster: boolean,
    modal: ModalProps
}

type Action =
      { type: 'INITIALIZE_STATE'; payload: BucketListType }      
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_DESCRIPTION'; payload: string }
    | { type: 'SET_LIST'; payload: ListElement[] }
    | { type: 'SET_TEMPORARY_LIST'; payload: ListElement[] }
    | { type: 'SET_SHOW_LIST'; payload: boolean }
    | { type: 'SET_SHOW_TOASTER'; payload: boolean }
    | { type: 'SET_MODAL'; payload: { show: boolean; text: string; hasButtons: boolean; action: () => void } }
    | { type: 'RESET_STATE' }

interface BucketListContextType {
    state: BucketListType,
    dispatch: Dispatch<Action>,
    hideModal: () => void
}

const initialState: BucketListType = {
    title: '',
    description: '',
    list: [],
    temporaryList: [],
    showList: false,
    showToaster: false,
    modal: {
        show: false,
        text: '',
        hasButtons: false,
        action: () => { }
    }
};

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'INITIALIZE_STATE':
            return { ...state, ...action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_LIST':
            return { ...state, list: action.payload };
        case 'SET_TEMPORARY_LIST':
            return { ...state, temporaryList: action.payload };
        case 'SET_SHOW_LIST':
            return { ...state, showList: action.payload };
        case 'SET_SHOW_TOASTER':
            return { ...state, showToaster: action.payload };
        case 'SET_MODAL':
            return { ...state, modal: action.payload };
        case 'RESET_STATE':
            return { ...initialState };
        default:
            return state;
    }
};

// Create the context with a default value of undefined
export const BucketListContext = createContext<BucketListContextType | undefined>(undefined);

export const BucketListProvider = ({ children, value }: { children: ReactNode, value?: Partial<BucketListType> }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState, ...value });

    const hideModal = () => {
        dispatch({
            type: 'SET_MODAL',
            payload: { ...state.modal, show: false }
        })
    }

    useEffect(() => {
        if (value) {
            dispatch({ type: 'INITIALIZE_STATE', payload: {...initialState, ...value }});
        } else {
            const storedBucketList = localStorage.getItem('myBucketList');
            if (storedBucketList) {
                const bucketList = JSON.parse(storedBucketList);
                dispatch({ type: 'SET_LIST', payload: bucketList.list });
                dispatch({ type: 'SET_TEMPORARY_LIST', payload: bucketList.list });
                dispatch({ type: 'SET_TITLE', payload: bucketList.title });
                dispatch({ type: 'SET_DESCRIPTION', payload: bucketList.description });
                dispatch({ type: 'SET_SHOW_LIST', payload: true });
            }
        }
    }, [value]);

    return (
        <BucketListContext.Provider value={{ state, dispatch, hideModal }}>
            {children}
        </BucketListContext.Provider>
    )
}

// Custom hook to use the BucketList context
export const useBucketList = () => {
    const context = useContext(BucketListContext);
    if (!context) {
        throw new Error('useBucketList must be used within a BucketListProvider');
    }
    return context;
}
