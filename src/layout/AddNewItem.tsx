import { useState } from "react";
import { useBucketList } from "../context/bucketListContext";
import Button from "../components/Button/Button"

function AddNewItem() {
    const { setList } = useBucketList();
    const [elementDescription, setElementDescription] = useState('');
    const [showNewItem, setShowNewItem] = useState(false);

    const addItemToBucketList = () => {
        const newItem = {
            checked: false,
            description: elementDescription
        }
        setList( prevList => [
            newItem,
            ...prevList
            
        ]);
        setShowNewItem(false);
        setElementDescription('');
    }

    const cancelBucketListElement = () => {
        setShowNewItem(false);
        setElementDescription('');
    }

    return (
        <>
            <Button
                type='add'
                title='Add new element'
                text='Add new element'
                fullWidth={true}
                action={() => setShowNewItem(true)}
                disabled={showNewItem}
            />

            {showNewItem &&
                <div className='new-item-container'>
                    <input
                        type='text'
                        className='input'
                        placeholder='Example: My First element'
                        value={elementDescription}
                        onChange={e => setElementDescription(e.target.value)}
                    />
                    <Button
                        type='secondary'
                        title='Cancel'
                        text='Cancel'
                        action={cancelBucketListElement}
                    />
                    <Button
                        type='primary'
                        title='OK'
                        text='OK'
                        disabled={elementDescription === ''}
                        action={addItemToBucketList}
                    />
                </div>
            }
        </>
    )
}

export default AddNewItem