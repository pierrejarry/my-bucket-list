import { useBucketList } from '../../context/bucketListContext';
import { ListElement } from '../../context/bucketListContext'
import './Checkbox.css'
interface CheckBoxProps {
    item: ListElement,
    index: number
}

function CheckBox({ item, index }: CheckBoxProps) {
    const { state, dispatch } = useBucketList();

    const toggleCheck = (indexToUpdate: number) => {
        dispatch({
            type: "SET_TEMPORARY_LIST",
            payload: state.temporaryList.map((item, index) =>
              index === indexToUpdate ? { ...item, checked: !item.checked } : item
            ),
          });
    }

    return (
            <label className={`container ${item.checked ? 'completed' : ''}`}>
                {item.description}
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(index)}
                />
                <span className="checkmark"></span>
            </label>
    )
}

export default CheckBox