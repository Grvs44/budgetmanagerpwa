// From https://stackoverflow.com/a/65705439/18309216
import React from 'react'

const TitleContext = React.createContext()
export const useTitle = () => React.useContext(TitleContext)

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = React.useState('Budget Manager')
  document.title = title

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  )
}
