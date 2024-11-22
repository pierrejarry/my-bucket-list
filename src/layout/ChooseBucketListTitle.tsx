import { useBucketList } from "../context/bucketListContext"
import Button from "../components/Button/Button";

function ChooseBucketListTitle() {
    const {
        title,
        description,
        setTitle,
        setDescription,
        setShowList
    } = useBucketList();

    const resetFields = () => {
        setTitle('');
        setDescription('');
    }

    const showBucketList = () => {
        setShowList(title === '' ? false : true);
    }

    const showBucketListOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode !== 13) return;
        e.preventDefault();
        showBucketList();
    }

    return (
        <section>
            <h1>My Bucket List</h1>
            <p className="description">Create and track your life goals and adventures with our Bucket List app. Whether it's traveling the world, learning new skills, or achieving personal milestones, our app helps you organize, prioritize, and celebrate your dreams—all in one place!</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <label htmlFor='bucket-list-title'>Choose a name for your Bucket List</label>
                    <input
                        type='text'
                        id='bucket-list-title'
                        className='input'
                        placeholder='Example: My Bucket List'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={showBucketListOnEnter}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor='bucket-list-description'>Add a description (optional)</label>
                    <input
                        type='text'
                        id='bucket-list-description'
                        className='input'
                        placeholder='Example: The things I want to do for this new year'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </fieldset>
                <div className='btn-container'>
                    <Button
                        type='secondary'
                        title='Empty textfield'
                        text='Reset'
                        action={resetFields}
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
        </section>
    )
}

export default ChooseBucketListTitle