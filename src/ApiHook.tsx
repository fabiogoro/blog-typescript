import { useState, useEffect } from 'react';

function useApi<T>(url: string): T[] {
  const [state, setState] = useState([])

  useEffect(() => {
    async function doFetch() {
      const responseJson = await fetch(url)
      setState(await responseJson.json())
    }
    doFetch()
  }, [url])

  return state
}


export default useApi