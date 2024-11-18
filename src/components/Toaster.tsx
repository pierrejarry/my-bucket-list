import './Toaster.css'

function Toaster({text}: {text: string}) {
  return (
    <div className='toaster'>
        {text}
    </div>
  )
}

export default Toaster