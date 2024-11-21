import './Button.css'

interface ButtonProps {
  type: 'primary' | 'secondary' | 'add' | 'delete'
  title: string
  text: string
  fullWidth?: boolean
  disabled?: boolean
  customClasses?: string
  action: () => void
}

function Button({
  type,
  title,
  text,
  fullWidth = false,
  disabled = false,
  customClasses,
  action
}: ButtonProps) {

  const typeClassMap: { [key in ButtonProps['type']]: string } = {
    primary: 'primary-btn',
    secondary: 'secondary-btn',
    add: 'add-btn',
    delete: 'delete-btn'
  }

  // Generate the class name based on type and fullWidth
  const buttonClass = `${typeClassMap[type]} ${fullWidth ? 'full-width' : ''} ${customClasses ?? ''}`

  return (
    <button
      type='submit'
      className={buttonClass}
      title={title}
      onClick={action}
      disabled={disabled}
    >
      {text} 
    </button>
  )
}

export default Button