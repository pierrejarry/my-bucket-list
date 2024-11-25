import { 
    createContext, 
    useContext, 
    ReactNode, 
    useEffect,
    useState, 
    Dispatch, 
    SetStateAction } from "react";

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
interface BucketListContextType {
    title: string;
    description: string;
    list: ListElement[];
    temporaryList: ListElement[];
    showList: boolean;
    showToaster: boolean;
    loading: boolean;
    modal: ModalProps;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setList: Dispatch<SetStateAction<ListElement[]>>;
    setTemporaryList: Dispatch<SetStateAction<ListElement[]>>;
    setShowList: Dispatch<SetStateAction<boolean>>;
    setShowToaster: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setModal: Dispatch<SetStateAction<ModalProps>>;
}

// Create the context with a default value of undefined
export const BucketListContext = createContext<BucketListContextType | undefined>(undefined);

export const BucketListProvider = ({ children, value }: { children: ReactNode, value?: Partial<BucketListContextType> }) => {
    const [title, setTitle] = useState(value?.title || '');
    const [description, setDescription] = useState(value?.description || '');
    const [list, setList] = useState(value?.list || []);
    const [temporaryList, setTemporaryList] = useState(value?.list || []);
    const [showList, setShowList] = useState(value?.showList || false);
    const [showToaster, setShowToaster] = useState(value?.showToaster || false);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(value?.modal || {
        show: false, 
        text: '', 
        hasButtons: false,
        action: () => {}
    });

      useEffect(() => {
        if (!value) {
            const storedBucketList = localStorage.getItem('myBucketList');

            if (storedBucketList) {
                const bucketList = JSON.parse(storedBucketList);
                setList(bucketList.list);
                setTemporaryList(bucketList.list);
                setTitle(bucketList.title);
                setDescription(bucketList.description);
                setShowList(true);
            }

            setLoading(false);
        }
    }, [value]);

    return (
        <BucketListContext.Provider value={{
            title,
            description,
            list,
            temporaryList,
            showList,
            showToaster,
            loading,
            modal,
            setTitle,
            setDescription,
            setList,
            setTemporaryList,
            setShowList,
            setShowToaster,
            setLoading,
            setModal
        }}>
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
