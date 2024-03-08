declare module 'react-intersection-observer' {
    export interface IntersectionObserverProps {
      threshold?: number | number[];
      root?: Element | null;
      rootMargin?: string;
      triggerOnce?: boolean;
      initialInView?: boolean;
    }
  
    export interface IntersectionObserverEntry {
      boundingClientRect: DOMRectReadOnly;
      intersectionRatio: number;
      intersectionRect: DOMRectReadOnly;
      isIntersecting: boolean;
      rootBounds: DOMRectReadOnly | null;
      target: Element;
      time: number;
    }
  
    export interface IntersectionObserverHookResult {
      ref: React.RefObject<Element>;
      inView: boolean;
      entry?: IntersectionObserverEntry;
    }
  
    export function useInView(
      options?: IntersectionObserverProps
    ): IntersectionObserverHookResult;
  }
  