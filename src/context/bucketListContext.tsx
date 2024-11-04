import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

// Define types
interface ListElement {
    checked: boolean;
    description: string;
}

interface BucketListContextType {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    list: ListElement[];
    setList: Dispatch<SetStateAction<ListElement[]>>;
}

// Create the context with a default value of undefined
const BucketListContext = createContext<BucketListContextType | undefined>(undefined);

export const BucketListProvider = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState('');
    const [list, setList] = useState<ListElement[]>([]);

    return (
        <BucketListContext.Provider value={{
            title,
            list,
            setTitle,
            setList
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
