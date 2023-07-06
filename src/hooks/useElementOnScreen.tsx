"use client"

import { useEffect, useRef, useState } from "react";


interface OptionParam{
    root?: any,
    rootMargin?: any,
    threshold?: any

}
export default function useElementOnScreen(options:OptionParam){
    const containerRef = useRef(null);
    const [isVisible, setIsVisiable] = useState(false);

    const callbackFunction = (entries: any[]) => {
        const [entry] = entries;
        setIsVisiable(entry.isIntersecting)
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(callbackFunction, options)
        if(containerRef.current){
            observer.observe(containerRef.current);
        }

        return ()=>{
            if(containerRef.current){
                observer.unobserve(containerRef.current);
            }
        }
    },[containerRef, options])

    return [containerRef, isVisible]
}