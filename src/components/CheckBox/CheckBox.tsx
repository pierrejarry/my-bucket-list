import { useBucketList } from '../../context/bucketListContext';
import { ListElement } from '../../context/bucketListContext'
import './Checkbox.css'
interface CheckBoxProps {
    item: ListElement,
    index: number
}

function CheckBox({ item, index }: CheckBoxProps) {
    const { temporaryList, setTemporaryList, setModal } = useBucketList();

    const toggleCheck = (indexToUpdate: number) => {
        setTemporaryList((prevList) =>
            prevList.map((item, index) =>
                index === indexToUpdate
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    }

    const removeElementFromBucketList = (item: ListElement) => {
        const newBucketList = temporaryList.filter(elem => elem !== item);
        setTemporaryList(newBucketList);
        setModal(prevModal => ({
            ...prevModal,
            show: false,
            hasButtons: false,
            action: () => { }
        }))
    }

    const removeElement = (item: ListElement) => {
        setModal({
            show: true,
            text: 'Are you sure you want to remove this element from your list?',
            hasButtons: true,
            action: () => removeElementFromBucketList(item)
        })
    }

    return (
        <>
            <label className={`container ${item.checked ? 'completed' : ''}`}>
                {item.description}
                <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleCheck(index)} 
                />
                <span className="checkmark"></span>
                {item.checked && <p className='completed'>Completed!</p>}
            </label>
            <button
                className='delete-btn'
                onClick={() => removeElement(item)}
            >
                Remove Element
            </button>
        </>
    )
}

export default CheckBox