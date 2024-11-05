import Add from '../assets/add.png'

interface ButtonProps {
  type: 'primary' | 'secondary' | 'add'
  title: string
  text: string
  fullWidth?: boolean
  disabled?: boolean
  action: () => void
}

function Button({
  type,
  title,
  text,
  fullWidth = false,
  disabled = false,
  action
}: ButtonProps) {

  const typeClassMap: { [key in ButtonProps['type']]: string } = {
    primary: 'primary-btn',
    secondary: 'secondary-btn',
    add: 'add-btn'
  }

  // Generate the class name based on type and fullWidth
  const buttonClass = `${typeClassMap[type]} ${fullWidth ? 'full-width' : ''}`

  return (
    <button
      type='submit'
      className={buttonClass}
      title={title}
      onClick={action}
      disabled={disabled}
    >
      {text} 
      {type === 'add' && <img src={Add} alt='Add icon' />}
    </button>
  )
}

export default Button