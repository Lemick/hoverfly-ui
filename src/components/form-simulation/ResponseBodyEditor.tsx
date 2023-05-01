import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react';
import { isJSON, prettify } from '../../services/json-service';
import { editor } from 'monaco-editor';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

const ResponseBodyEditor = ({ value = '', onChange }: Props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();
  const [isBodyJson] = useState(isJSON(value));
  const [editorHeightPx, setEditorHeightPx] = useState(100);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.hasTextFocus()) {
      loadValueIntoEditor();
    }
  }, [value]);

  const loadValueIntoEditor = () => {
    if (editorRef.current && !editorRef.current.hasTextFocus()) {
      const formattedValue = prettify(value);
      editorRef.current.setValue(formattedValue);
      updateEditorHeight();
    }
  };

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    loadValueIntoEditor();
    updateEditorHeight();
  };

  const updateEditorHeight = () => {
    if (monacoRef.current?.editor.EditorOption.lineHeight && editorRef.current?.getOptions()) {
      const options = editorRef.current?.getOptions();
      const editorLineHeight = options.get(monacoRef.current.editor.EditorOption.lineHeight) || 18;
      const lineCount = Math.max(editorRef.current?.getModel()?.getLineCount() || 0, 10);
      setEditorHeightPx(editorLineHeight * lineCount);
    }
  };

  const onEditorValueChange = (json: string | undefined) => {
    if (editorRef.current?.hasTextFocus()) {
      onChange(json ?? '');
    }
  };

  return (
    <MonacoEditor
      width="100%"
      height={`${editorHeightPx}px`}
      defaultLanguage={isBodyJson ? 'json' : ''}
      theme="vs-dark"
      onMount={onEditorMount}
      onChange={onEditorValueChange}
      options={{
        wordWrap: 'on',
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        formatOnType: true
      }}
    />
  );
};

export default ResponseBodyEditor;
