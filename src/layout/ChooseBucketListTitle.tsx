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
                        action={showBucketList}
                    />
                </div>
            </form>
        </>
    )
}

export default ChooseBucketListTitle