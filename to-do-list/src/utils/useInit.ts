import { useEffect } from "react"

export const UseInit = (callback: React.EffectCallback) => {
    return useEffect(callback, []);
}