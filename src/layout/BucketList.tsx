import { useMemo } from "react";
import { ListElement, useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import CheckBox from "../components/CheckBox";
import NoTask from '../assets/no-task.png'
import './BucketList.css'
import Button from "../components/Button";

function BucketList() {
    const { 
        title, 
        description, 
        list,   
        setList, 
        setTitle, 
        setShowList, 
        setShowToaster 
    } = useBucketList();
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
        sessionStorage.removeItem(sessionStorageName);
        setList([]);
        setTitle('');
        setShowList(false);
    }

    return (
        <section className="bucket-list">
            <h1>{title}</h1>
            <p>{description}</p>
            {!list.length &&
                <div className="empty-list">
                    <img src={NoTask} className="empty-icon" alt="Empty list icon" />
                    <h2>Your Bucket List is empty!</h2> 
                    <p>Start your journey by adding your first dream or goal! Big or small, every item is a step towards making your bucket list truly yours. What’s the first adventure you’d love to check off?</p>
                </div>
            }
            <AddNewItem />
            {list.length > 0 &&
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