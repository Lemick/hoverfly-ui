import React, { useMemo, useRef, useState } from 'react';
import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react';
import { isJSON } from '@/services/json-service';
import { editor } from 'monaco-editor';
import { useTheme } from '@/hooks/use-theme-provider';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

const MIN_EDITOR_LINE = 10;
const MAX_EDITOR_LINE = 50;

const ResponseBodyEditor = ({ value = '', onChange }: Props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();
  const isBodyJson = useMemo(() => isJSON(value), [value]);
  const [isFocused, setIsFocused] = useState(false);
  const [editorHeightPx, setEditorHeightPx] = useState(100);
  const { appliedTheme } = useTheme();

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    updateEditorHeight();
  };

  const updateEditorHeight = () => {
    if (!monacoRef.current?.editor.EditorOption.lineHeight || !editorRef.current?.getOptions()) {
      return;
    }

    const options = editorRef.current.getOptions();
    const editorLineHeight = options.get(monacoRef.current.editor.EditorOption.lineHeight) || 18;
    const lineCount = Math.min(
      Math.max(editorRef.current?.getModel()?.getLineCount() || 0, MIN_EDITOR_LINE),
      MAX_EDITOR_LINE
    );
    setEditorHeightPx(editorLineHeight * lineCount);
  };

  const onEditorValueChange = (json: string | undefined) => {
    if (editorRef.current?.hasTextFocus()) {
      onChange(json ?? '');
      updateEditorHeight();
    }
  };

  const updateFocus = () => setIsFocused(!!editorRef.current?.hasTextFocus());

  return (
    <div className="row gap-2">
      <div
        className="border-x border-y rounded overflow-hidden"
        data-testid="response-body-editor"
        onClick={updateFocus}
        onBlur={updateFocus}>
        <MonacoEditor
          width="100%"
          height={`${editorHeightPx}px`}
          language={isBodyJson ? 'json' : ''}
          theme={appliedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          value={value}
          onMount={onEditorMount}
          onChange={onEditorValueChange}
          options={{
            wordWrap: 'on',
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            formatOnType: true,
            scrollbar: {
              handleMouseWheel: isFocused
            }
          }}
        />
      </div>
    </div>
  );
};

export default ResponseBodyEditor;
