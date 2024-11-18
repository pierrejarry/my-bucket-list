import { useBucketList } from './context/bucketListContext'
import ChooseBucketListTitle from './layout/ChooseBucketListTitle';
import BucketList from './layout/BucketList';
import Toaster from './components/Toaster';
import './App.css'

function App() {
  const { showList, showToaster } = useBucketList();

  return (
    <>
      {!showList ?
        <ChooseBucketListTitle /> :
        <BucketList />
      }
      {showToaster && <Toaster text='Saved'/>}
    </>
  )
}

export default App