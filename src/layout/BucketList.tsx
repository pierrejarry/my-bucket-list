import { useMemo } from "react";
import { ListElement, useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import CheckBox from "../components/CheckBox";
import NoTask from '../assets/no-task.png'
import './BucketList.css'
import Button from "../components/Button";

function BucketList() {
    const { title, list, setList, setTitle, setShowList, setShowToaster } = useBucketList();
    const previousList: ListElement[] = useMemo(() => list, []);
    const sessionStorageName = 'myBucketList';

    const saveList = () => {
        const bucketListToSave = {
            title,
            list
        }
        sessionStorage.setItem(sessionStorageName, JSON.stringify(bucketListToSave));
        setShowToaster(true); // Show toaster
        setTimeout(() => { // Reinitialize toaster to false
            setShowToaster(false);
          }, 1000);
    }

    const cancelChanges = () => {
        setList(previousList);
    }

    const deleteBucketList = () => {
        sessionStorage.removeItem(sessionStorageName);
        setList([]);
        setTitle('');
        setShowList(false);
    }

    return (
        <section className="bucket-list">
            <h1>{title}</h1>
            <AddNewItem />
            {!list.length ?
                <div className="empty-list">
                    <p>Your Bucket List is empty! Let's start by adding a new item below.</p>
                    <img src={NoTask} className="empty-icon" alt="Empty list icon" />
                </div> :
                <>
                    <ul>
                        {list.map((item, index) =>
                            <li key={index}>
                                <CheckBox
                                    item={item}
                                    index={index}
                                />
                            </li>
                        )}
                    </ul>
                    <div className='btn-container flex-start'>
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
                        {/* Remove Bucket List */}
                        <Button 
                            type='delete'
                            text='Delete Bucket List'
                            title='Delete Bucket List'
                            action={deleteBucketList}
                            customClasses="margin-left-auto"
                        />
                    </div>
                </>
            }
        </section>
    )
}

export default BucketList