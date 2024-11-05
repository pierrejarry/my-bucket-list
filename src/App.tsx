import { useBucketList } from './context/bucketListContext'
import ChooseBucketListTitle from './layout/ChooseBucketListTitle';
import BucketList from './layout/BucketList';
import './App.css'

function App() {
  const { title, showList } = useBucketList();

  return (
    <>
      {!showList ?
        <ChooseBucketListTitle /> :
        <BucketList />
      }
    </>
  )
}

export default App