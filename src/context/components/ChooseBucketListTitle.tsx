import { useBucketList } from "../bucketListContext"

function ChooseBucketListTitle() {
    const { 
        title,
        list,
        showList,
        setTitle, 
        setList,
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
                    placeholder='My Bucket List'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div className='btn-container'>
                    <button
                        type='reset'
                        className='secondary-btn'
                        title='Empty textfield'
                        onClick={() => setTitle('')}
                    >Reset</button>
                    <button
                        type='submit'
                        className='primary-btn'
                        title='Validate title'
                        onClick={showBucketList}
                    >Validate</button>
                </div>
            </form>
        </>
    )
}

export default ChooseBucketListTitle