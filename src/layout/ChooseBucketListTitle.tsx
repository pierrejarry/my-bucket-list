import { useBucketList } from "../context/bucketListContext"
import Button from "../components/Button";

function ChooseBucketListTitle() {
    const {
        title,
        setTitle,
        setShowList
    } = useBucketList();

    const showBucketList = () => {
        setShowList(title === '' ? false : true);
    }

    const showBucketListOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 13) return;
        e.preventDefault();
        showBucketList();
    }

    return (
        <>
            <h1>Choose a name for you Bucket List</h1>
            <form>
                <input
                    type='text'
                    className='input'
                    placeholder='Example: My Bucket List'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={showBucketListOnEnter}
                />
                <div className='btn-container'>
                    <Button
                        type='secondary'
                        title='Empty textfield'
                        text='Reset'
                        action={() => setTitle('')}
                    />
                    <Button
                        type='primary'
                        title='Validate title'
                        text='Validate'
                        disabled={title === ''}
                        action={showBucketList}
                    />
                </div>
            </form>
        </>
    )
}

export default ChooseBucketListTitle