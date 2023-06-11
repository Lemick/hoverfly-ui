import { useEffect } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';

// Store a value when it is stabilized for a certain delay
export default function useStoreDebounce(key: string, value: string, debounceDelay = 1000) {
  const [storedEditorContent, setStoredEditorContent] = useLocalStorage(key, '');
  const debouncedEditorContent = useDebounce(value, debounceDelay);

  useEffect(() => {
    setStoredEditorContent(debouncedEditorContent);
  }, [debouncedEditorContent]);

  return storedEditorContent;
}
