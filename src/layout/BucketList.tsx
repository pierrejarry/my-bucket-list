import { useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import CheckBox from "../components/CheckBox/CheckBox";
import Button from "../components/Button/Button";
import RemoveButton from "../components/RemoveButton/RemoveButton";
import NoTask from '../assets/no-task.png'
import './BucketList.css'

function BucketList() {
    const { state, dispatch } = useBucketList();
    const { title,
        description,
        list,
        temporaryList
    } = state;
    const localStorageName = 'myBucketList';

    const removeBucketListFromLocalStorage = () => {
        localStorage.removeItem(localStorageName);
        dispatch({ type: 'RESET_STATE' });
    }

    const saveList = () => {
        const bucketListToSave = {
            title,
            description,
            list: temporaryList
        }
        localStorage.setItem(localStorageName, JSON.stringify(bucketListToSave));
        dispatch({
            type: 'SET_LIST',
            payload: temporaryList
        });
        dispatch({
            type: 'SET_SHOW_TOASTER',
            payload: true
        });
        
        setTimeout(() => { // Reinitialize toaster to false
            dispatch({
                type: 'SET_SHOW_TOASTER',
                payload: false
            });
        }, 1500);
    }

    const cancelChanges = () => {
        dispatch({
            type: 'SET_TEMPORARY_LIST',
            payload: list
        });

        if (!list.length) {
            localStorage.removeItem(localStorageName);
        } else {
            const bucketListToSave = {
                title,
                description,
                list
            }
            localStorage.setItem(localStorageName, JSON.stringify(bucketListToSave));
        }
    }

    const deleteBucketList = () => {
        dispatch({
            type: 'SET_MODAL',
            payload: {
                show: true,
                text: 'Are you sure you want to delete your Bucket List?',
                hasButtons: true,
                action: removeBucketListFromLocalStorage
            }
        });
    }

    return (
        <section className="bucket-list">
            <header>
                <h1>{title}</h1>
                <p className="description">{description}</p>
            </header>
            <main>
                <AddNewItem />

                {!temporaryList.length ? (
                    <div className="empty-list">
                        <img src={NoTask} className="empty-icon" alt="Empty list icon" />
                        <h2>Your Bucket List is empty!</h2>
                        <p className="description">Start your journey by adding your first dream or goal! Big or small, every item is a step towards making your bucket list truly yours. What’s the first adventure you’d love to check off?</p>
                    </div>
                ) : (
                    <ul>
                        {temporaryList.map((item, index) =>
                            <li key={index} className={item.checked ? 'completed' : ''}>
                                <CheckBox
                                    item={item}
                                    index={index}
                                />
                                <article className='remove-element'>
                                    <RemoveButton item={item} />
                                </article>
                            </li>
                        )}
                    </ul>
                )}
                {(list.length > 0 || (temporaryList.length > 0 && !list.length)) && (
                    <>
                        <div className='btn-container flex-end'>
                            {/* Remove Bucket List */}
                            <Button
                                type='delete'
                                text='Delete Bucket List'
                                title='Delete Bucket List'
                                action={deleteBucketList}
                                customClasses="margin-right-auto"
                            />
                            {/* Cancel changes */}
                            <Button
                                type='secondary'
                                text='Cancel changes'
                                title="Cancel changes button"
                                action={cancelChanges}
                                disabled={list === temporaryList}
                            />
                            {/* Save changes */}
                            <Button
                                type='primary'
                                text='Save'
                                title="Save Changes button"
                                action={saveList}
                            />
                        </div>
                    </>
                )}
            </main>
        </section>
    )
}

export default BucketList