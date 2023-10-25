import { useEffect, useCallback, useReducer } from 'react';

function reducer<T>(state:T, action:{newState:T}){
  return action.newState
}

function useApi<T>(url: string): T[] {
  const [state, dispatch] = useReducer(reducer<T[]>, [])

  const doFetch = useCallback(async ()=>{
    const responseJson = await fetch(url)
    dispatch({newState: await responseJson.json()})
  }, [url])

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return state
}


export default useApi
