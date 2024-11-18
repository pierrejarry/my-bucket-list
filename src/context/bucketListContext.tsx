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

interface BucketListContextType {
    title: string;
    list: ListElement[];
    showList: boolean;
    showToaster: boolean;
    setTitle: Dispatch<SetStateAction<string>>;
    setList: Dispatch<SetStateAction<ListElement[]>>;
    setShowList: Dispatch<SetStateAction<boolean>>;
    setShowToaster: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value of undefined
const BucketListContext = createContext<BucketListContextType | undefined>(undefined);

export const BucketListProvider = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState('');
    const [list, setList] = useState<ListElement[]>([]);
    const [showList, setShowList] = useState(false);
    const [showToaster, setShowToaster] = useState(false);

    useEffect(() => {
        const storedBucketList = sessionStorage.getItem('myBucketList');
        if (storedBucketList) {
            const bucketList = JSON.parse(storedBucketList);
            setList(bucketList.list);
            setTitle(bucketList.title);
            setShowList(true);
        }
      }, []);

    return (
        <BucketListContext.Provider value={{
            title,
            list,
            showList,
            showToaster,
            setTitle,
            setList,
            setShowList,
            setShowToaster
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
