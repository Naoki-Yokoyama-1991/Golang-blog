import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Cookies from 'js-cookie'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = Cookies.get(key)
    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state), { expires: 1 })
  }, [key, state])

  return [state, setState]
}

export default usePersistedState
