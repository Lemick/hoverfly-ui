import { useTheme } from '@/hooks/use-theme-provider';
import { isJSON } from '@/services/json-service';
import MonacoEditor, { type Monaco, type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  value?: string;
  dataTestId?: string;
  onChange: (value: string) => void;
};

const MIN_EDITOR_LINE = 16;
const MAX_EDITOR_LINE = 50;

const InlineMonacoEditor = ({ value = '', onChange, dataTestId }: Props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const monacoRef = useRef<Monaco>(null);
  const isBodyJson = useMemo(() => isJSON(value), [value]);
  const [isFocused, setIsFocused] = useState(false);
  const [editorHeightPx, setEditorHeightPx] = useState(100);
  const { appliedTheme } = useTheme();

  useEffect(() => {
    if (
      !editorRef.current?.hasTextFocus() &&
      editorRef.current?.getValue() !== value
    ) {
      editorRef.current?.setValue(value);
    }
  }, [value]);

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    updateEditorHeight();
  };

  const updateEditorHeight = () => {
    if (
      !monacoRef.current?.editor.EditorOption.lineHeight ||
      !editorRef.current?.getOptions()
    ) {
      return;
    }

    const options = editorRef.current.getOptions();
    const editorLineHeight =
      options.get(monacoRef.current.editor.EditorOption.lineHeight) || 18;
    const lineCount = Math.min(
      Math.max(
        editorRef.current?.getModel()?.getLineCount() || 0,
        MIN_EDITOR_LINE,
      ),
      MAX_EDITOR_LINE,
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
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: No need here */}
      <div
        className="border-x border-y rounded overflow-hidden"
        data-testid={dataTestId}
        onClick={updateFocus}
        onBlur={updateFocus}
      >
        <MonacoEditor
          width="100%"
          height={`${editorHeightPx}px`}
          language={isBodyJson ? 'json' : ''}
          theme={appliedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
          defaultValue={value}
          onMount={onEditorMount}
          onChange={onEditorValueChange}
          options={{
            wordWrap: 'on',
            smoothScrolling: false,
            scrollBeyondLastLine: false,
            formatOnType: true,
            scrollbar: {
              handleMouseWheel: isFocused,
            },
          }}
        />
      </div>
    </div>
  );
};

export default InlineMonacoEditor;
