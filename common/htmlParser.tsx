import { useRef, useEffect } from 'react';

export default function HtmlParser(props: { html: string; id?:string }) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const { html, id } = props

    useEffect(() => {
        if (spanRef.current) {
            spanRef.current.innerHTML = html;
        }
    }, [spanRef,html]);
    
    return <span id={id} ref={spanRef} />
}