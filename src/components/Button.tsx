
interface Button {
  type: 'primary' | 'secondary'
  title: string
  text: string
  action: () => void
}

function Button({ type, title, text, action }: Button) {
  return (
    <button
      type='submit'
      className={type === 'primary' ? 'primary-btn' : 'secondary-btn'}
      title={title}
      onClick={action}
    >{text}
    </button>
  )
}

export default Button