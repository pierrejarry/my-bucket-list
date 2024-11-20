import { useBucketList } from './context/bucketListContext'
import ChooseBucketListTitle from './layout/ChooseBucketListTitle';
import BucketList from './layout/BucketList';
import Toaster from './components/Toaster/Toaster';
import Modal from './components/Modal/Modal';
import './App.css'

function App() {
  const { showList, showToaster, modal } = useBucketList();

  return (
    <>
      {!showList ?
        <ChooseBucketListTitle /> :
        <BucketList />
      }
      <Toaster 
        text='Saved'
        show={showToaster}
      />
      <Modal 
        text={modal.text}
        show={modal.show}
        hasButtons={modal.hasButtons}
      />
    </>
  )
}

export default App