import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { isDark } from '../stores/themeStore';

export interface Props extends React.HTMLAttributes<HTMLIFrameElement> {
  src: string;
  srcDoc?: string;
  height?: number;
  showDarkMode?: boolean;
}

export default function Iframe({ src, srcDoc, height, showDarkMode }: Props) {
  const [iFrameHeight, setIFrameHeight] = useState(0);

  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const $isDark = showDarkMode ?? useStore(isDark);

  // if not exist style#dark-mode-style, insert it
  if (
    $isDark &&
    !iFrameRef?.current?.contentWindow?.document.head.querySelector(
      '#dark-mode-style'
    )
  ) {
    iFrameRef?.current?.contentWindow?.document.head.insertAdjacentHTML(
      'beforeend',
      `<style id="dark-mode-style">
        :root {
          --color-primary: #000;
        }

        :root.dark {
          --color-primary: #fff;
        }

        body {
          color: var(--color-primary);
        }

        a {
          color: var(--color-primary);
        }

        * {
          border-color: var(--color-primary);
        }

        /* * {
           border-color: var(--color-primary) !important;
         } */

         ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-button:start:decrement,
        ::-webkit-scrollbar-button:end:increment {
          display: none;
        }

        *::-webkit-scrollbar-track-piece {
          @apply bg-transparent;
          -webkit-border-radius: 6px;
        }

        *::-webkit-scrollbar-thumb:vertical {
          @apply bg-gray-400;
          -webkit-border-radius: 6px;
        }

        * {
          scrollbar-color: #9ca3af transparent;
        }
      </style>`
    );
  }

  if ($isDark) {
    iFrameRef?.current?.contentWindow?.document.documentElement.classList.add(
      'dark'
    );
  } else {
    iFrameRef?.current?.contentWindow?.document.documentElement.classList.remove(
      'dark'
    );
  }

  const handleResize = useCallback(
    (iframe: React.RefObject<HTMLIFrameElement>) => {
      const { body, documentElement } =
        iframe?.current?.contentWindow?.document || {};

      const contentHeight = Math.max(
        body?.clientHeight ?? 0,
        body?.offsetHeight ?? 0,
        body?.scrollHeight ?? 0,
        documentElement?.clientHeight ?? 0,
        documentElement?.offsetHeight ?? 0,
        documentElement?.scrollHeight ?? 0
      );

      setIFrameHeight(height || contentHeight);
    },
    []
  );

  const handleDarkMode = () => {
    if ($isDark) {
      iFrameRef?.current?.contentWindow?.document.documentElement.classList.add(
        'dark'
      );
    } else {
      iFrameRef?.current?.contentWindow?.document.documentElement.classList.remove(
        'dark'
      );
    }
  };

  useEffect(() => {
    handleResize(iFrameRef);
  }, [handleResize, iFrameRef]);

  useEffect(() => {
    handleDarkMode();
  }, [$isDark]);

  return (
    <iframe
      ref={iFrameRef}
      onLoad={() => handleResize(iFrameRef)}
      src={src}
      // srcDoc={srcDoc}
      style={{
        height: `${Number(iFrameHeight)}px`,
        width: '100%',
      }}
    />
  );
}
