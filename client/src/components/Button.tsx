interface TButton {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<TButton> = ({ children, clickHandler }) => {
  return (
    <div className="py-2">
      <button
      onClick={clickHandler}
      className='px-2 py-1 font-light tracking-wide text-primary capitalize transition-colors duration-200 transform bg-secondary rounded-md hover:bg-search-hover focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
      {children}
    </button>
    </div>
    
  )
}
