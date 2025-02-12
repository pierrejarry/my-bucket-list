import { ListElement } from "../../context/bucketListContext";
import { useBucketList } from "../../context/bucketListContext";
import './RemoveButton.css'

function RemoveButton({ item }: { item: ListElement }) {
    const { state, dispatch } = useBucketList();

    /* Remove element */
    const removeElementFromBucketList = (item: ListElement) => {
        const newBucketList = state.temporaryList.filter(elem => elem !== item);
        dispatch({
            type: 'SET_TEMPORARY_LIST',
            payload: newBucketList
        })
        dispatch({
            type: 'SET_MODAL',
            payload: {
                ...state.modal,
                show: false,
                hasButtons: false,
                action: () => { }
            }
        })
    }

    const removeElement = (item: ListElement) => {
        dispatch({
            type: 'SET_MODAL',
            payload: {
                ...state.modal,
                show: true,
                text: 'Are you sure you want to remove this element from your list?',
                hasButtons: true,
                action: () => removeElementFromBucketList(item)
            }
        })
    }

    return (
        <button
            onClick={() => removeElement(item)}
            title='Remove element'
            className="remove-button"
        >
            <span></span>
        </button>
    )
}

export default RemoveButton