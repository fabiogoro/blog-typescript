import { createContext, useContext, ReactNode, useState } from 'react'
import Header from './Header'

const HeaderContext = createContext<string>('');

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};

export function HeaderProvider({children}:{children:ReactNode}){
  let [query, setQuery] = useState<string>('')
  return (
    <HeaderContext.Provider
      value={
        query
      }
    >
      <Header setQuery={setQuery}></Header>
      {children}
    </HeaderContext.Provider>

  )
}
