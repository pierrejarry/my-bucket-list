import { useState } from "react";
import Button from "../components/Button"

function AddNewItem() {
    const [elementDescription, setElementDescription] = useState('');
    const [showNewItem, setShowNewItem] = useState(false);

    const addItemToBucketList = () => {
        console.log('add item');
    }

    return (
        <>
            <Button
                type='add'
                title='Add item'
                text='Add'
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
                        action={() => setShowNewItem(false)}
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