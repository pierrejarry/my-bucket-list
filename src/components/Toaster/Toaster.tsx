import './Toaster.css'

interface ToasterProps {
  text: string
  show: boolean
}

function Toaster({text, show}: ToasterProps) {
  return (
    <div className={`toaster ${show ? 'show' : 'hidden'}`}>
        {text}
    </div>
  )
}

export default Toaster