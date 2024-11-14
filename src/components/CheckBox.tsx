import { useBucketList } from '../context/bucketListContext';
import { ListElement } from '../context/bucketListContext'

interface CheckBoxProps {
    item: ListElement, 
    index: number
}

function CheckBox({item, index}: CheckBoxProps) {
    const { setList } = useBucketList();

    const toggleCheck = (indexToUpdate: number) => {
        setList((prevList) =>
            prevList.map((item, index) =>
              index === indexToUpdate
                ? { ...item, checked: !item.checked }
                : item
            )
          );
    }

    return (
        <label className="container">
            {item.description}
            <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(index)} />
            <span className="checkmark"></span>
        </label>
    )
}

export default CheckBox