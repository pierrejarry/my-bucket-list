import { useMemo } from "react";
import { ListElement, useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import CheckBox from "../components/CheckBox/CheckBox";
import NoTask from '../assets/no-task.png'
import './BucketList.css'
import Button from "../components/Button/Button";

function BucketList() {
    const {
        title,
        description,
        list,
        setList,
        setTitle,
        setShowToaster,
        setShowList,
        setModal
    } = useBucketList();
    const previousList: ListElement[] = useMemo(() => list, []);
    const sessionStorageName = 'myBucketList';

    const removeBucketListFromSessionStorage = () => {
        sessionStorage.removeItem(sessionStorageName);
        setList([]);
        setTitle('');
        setShowList(false);
        setModal({
            show: false,
            text: '',
            hasButtons: false,
            action: () => {}
        })
    }

    const saveList = () => {
        const bucketListToSave = {
            title,
            description,
            list
        }
        sessionStorage.setItem(sessionStorageName, JSON.stringify(bucketListToSave));
        setShowToaster(true); // Show toaster
        setTimeout(() => { // Reinitialize toaster to false
            setShowToaster(false);
        }, 1500);
    }

    const cancelChanges = () => {
        setList(previousList);

        if (!previousList.length) {
            sessionStorage.removeItem(sessionStorageName);
        } else {
            sessionStorage.setItem(sessionStorageName, JSON.stringify(previousList));
        }
    }

    const deleteBucketList = () => {
        setModal({
            show: true,
            text: 'Are you sure you want to delete your Bucket List?',
            hasButtons: true,
            action: removeBucketListFromSessionStorage
        })
    }

    return (
        <section className="bucket-list">
            <header>
                <h1>{title}</h1>
                <p className="description">{description}</p>
            </header>
            <main>
                <AddNewItem />
                {!list.length &&
                    <div className="empty-list">
                        <img src={NoTask} className="empty-icon" alt="Empty list icon" />
                        <h2>Your Bucket List is empty!</h2>
                        <p className="description">Start your journey by adding your first dream or goal! Big or small, every item is a step towards making your bucket list truly yours. What’s the first adventure you’d love to check off?</p>
                    </div>
                }
                {list.length > 0 &&
                    <>
                        <ul>
                            {list.map((item, index) =>
                                <li key={index} className={item.checked ? 'completed' : ''}>
                                    <CheckBox
                                        item={item}
                                        index={index}
                                    />
                                </li>
                            )}
                        </ul>
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
                }
            </main>
        </section>
    )
}

export default BucketList