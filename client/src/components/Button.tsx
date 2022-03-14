interface TButton {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<TButton> = ({ children, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>
      {children}
    </button>
  )
}
