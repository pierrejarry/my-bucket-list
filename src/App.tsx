import { useBucketList } from './context/bucketListContext'
import './App.css'

function App() {
  return (
    <>
      <h1>Choose a name for you Bucket List</h1>
      <input type='text' className='input' placeholder='My Bucket List' />
      <div className='btn-container'>
        <button className='secondary' title='Empty textfield'>Reset</button>
        <button className='primary' title='Validate title'>Validate</button>
      </div>
    </>
  )
}

export default App