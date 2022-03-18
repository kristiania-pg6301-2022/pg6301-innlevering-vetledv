interface TButton {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<TButton> = ({ children, clickHandler }) => {
  return (
    <div className='py-2'>
      <button
        onClick={clickHandler}
        className='px-6 py-3 font-light tracking-wide text-primary text-2xl transition-colors transform bg-searchhover rounded-md hover:bg-secondary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 shadow-md'>
        {children}
      </button>
    </div>
  )
}
