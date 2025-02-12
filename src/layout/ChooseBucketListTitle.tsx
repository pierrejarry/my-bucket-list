import { useBucketList } from "../context/bucketListContext"
import Button from "../components/Button/Button";

function ChooseBucketListTitle() {
    const { state, dispatch } = useBucketList();

    const resetFields = () => {
        dispatch({
            type: 'SET_TITLE',
            payload: ''
        });
        dispatch({
            type: 'SET_DESCRIPTION',
            payload: ''
        });
    }

    const showBucketList = () => {
        dispatch({
            type: 'SET_SHOW_LIST',
            payload: true
        });        
    }

    const showBucketListOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        showBucketList();
    }

    const setBucketListName = (name: string) => {
        dispatch({
            type: 'SET_TITLE',
            payload: name
        });
    }

    const setBucketListDescription = (description: string) => {
        dispatch({
            type: 'SET_DESCRIPTION',
            payload: description
        });
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
                        value={state.title}
                        onChange={e => setBucketListName(e.target.value)}
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
                        value={state.description}
                        onChange={e => setBucketListDescription(e.target.value)}
                    />
                </fieldset>
                <div className='btn-container'>
                    <Button
                        type='secondary'
                        title='Empty textfield'
                        text='Reset'
                        action={resetFields}
                        disabled={!state.title}
                    />
                    <Button
                        type='primary'
                        title='Validate title'
                        text='Validate'
                        action={showBucketList}
                        disabled={!state.title}
                    />
                </div>
            </form>
        </section>
    )
}

export default ChooseBucketListTitle