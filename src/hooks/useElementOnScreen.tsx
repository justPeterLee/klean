"use client"

import { useEffect, useRef, useState } from "react";

interface OptionParam {
  root?: any;
  rootMargin?: any;
  threshold?: any;
}

export default function useElementOnScreen(
  options: OptionParam
): [React.RefObject<HTMLDivElement>, boolean] {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    if (entry.isIntersecting && observer.current) {
      observer.current.unobserve(entry.target); // Unobserve the target element
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(callbackFunction, options);

    if (containerRef.current) {
      observer.current.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current && observer.current) {
        observer.current.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
}
