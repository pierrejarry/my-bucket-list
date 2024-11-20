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
    showList: boolean;
    showToaster: boolean;
    modal: ModalProps;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setList: Dispatch<SetStateAction<ListElement[]>>;
    setShowList: Dispatch<SetStateAction<boolean>>;
    setShowToaster: Dispatch<SetStateAction<boolean>>;
    setModal: Dispatch<SetStateAction<ModalProps>>;
}

// Create the context with a default value of undefined
const BucketListContext = createContext<BucketListContextType | undefined>(undefined);

export const BucketListProvider = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState<ListElement[]>([]);
    const [showList, setShowList] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [modal, setModal] = useState<ModalProps>({
        show: false, 
        text: '', 
        hasButtons: false,
        action: () => {}
    });

    useEffect(() => {
        const storedBucketList = sessionStorage.getItem('myBucketList');
        if (storedBucketList) {
            const bucketList = JSON.parse(storedBucketList);
            setList(bucketList.list);
            setTitle(bucketList.title);
            setDescription(bucketList.description);
            setShowList(true);
        }
      }, []);

    return (
        <BucketListContext.Provider value={{
            title,
            description,
            list,
            showList,
            showToaster,
            modal,
            setTitle,
            setDescription,
            setList,
            setShowList,
            setShowToaster,
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
