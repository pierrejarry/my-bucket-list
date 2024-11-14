import { useBucketList } from "../context/bucketListContext"
import AddNewItem from "./AddNewItem";
import CheckBox from "../components/CheckBox";
import NoTask from '../assets/no-task.png'
import './BucketList.css'

function BucketList() {
    const { title, list } = useBucketList();



    return (
        <div className="bucket-list">
            <h1>{title}</h1>
            <AddNewItem />
            {!list.length ?
                <div className="empty-list">
                    <p>Your Bucket List is empty! Let's start by adding a new item below.</p>
                    <img src={NoTask} className="empty-icon" alt="Empty list icon" />
                </div> :
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
            }
        </div>
    )
}

export default BucketList