import { useEffect } from 'react';
import { useDebounceValue } from '@/hooks/use-debounce-value';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Store a value when it is stabilized for a certain delay
export default function useStoreDebounce(key: string, value: string, debounceDelay = 1000) {
  const [storedEditorContent, setStoredEditorContent] = useLocalStorage(key, '');
  const [debouncedEditorContent] = useDebounceValue(value, debounceDelay);

  useEffect(() => {
    if (!value) {
      return;
    }
    setStoredEditorContent(debouncedEditorContent);
  }, [debouncedEditorContent]);

  return storedEditorContent;
}
