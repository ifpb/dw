import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function HyperText({ src, children }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadContent() {
      const res = await fetch(src);

      const content = await res.text();

      setContent(ReactHtmlParser(content));
    }

    if (src) {
      loadContent();
    } else {
      setContent(children);
    }
  }, []);

  return (
    <div
      style={{
        borderRadius: '0.3rem',
        backgroundColor: '#f3f6fa',
        border: 'solid 1px #dce6f0',
        padding: '0.8rem',
        marginTop: '0.8rem',
      }}
    >
      {content}
    </div>
  );
}
