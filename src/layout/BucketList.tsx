import { useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import NoTask from '../assets/no-task.png'

function BucketList() {
    const { title, list } = useBucketList();

    return (
        <>
            <h1>{title}</h1>
            {!list.length ?
                <>
                    <img src={NoTask} alt="Empty list icon" />
                    <p>Your Bucket List is empty! Let's start by adding a new item below.</p>
                </> :
                <p>Bucket list here...</p>
            }
            <AddNewItem />
        </>
    )
}

export default BucketList