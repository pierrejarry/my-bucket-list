import { useBucketList } from './context/bucketListContext'
import ChooseBucketListTitle from './context/components/ChooseBucketListTitle';
import './App.css'

function App() {
  const { title, showList } = useBucketList();

  return (
    <>
      {!showList ?
        <ChooseBucketListTitle /> :
        <>
          <h1>{title}</h1>
          <p>Bucket list here...</p>
        </>
      }
    </>
  )
}

export default App