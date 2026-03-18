import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useDebounce from './use-debounce';

// Store a value when it is stabilized for a certain delay
export default function useStoreDebounce(key: string, value: string, debounceDelay = 1000) {
  const [storedEditorContent, setStoredEditorContent] = useLocalStorage(key, '');
  const debouncedEditorContent = useDebounce(value, debounceDelay);

  useEffect(() => {
    if (!value) {
      return;
    }
    setStoredEditorContent(debouncedEditorContent);
  }, [debouncedEditorContent]);

  return storedEditorContent;
}
