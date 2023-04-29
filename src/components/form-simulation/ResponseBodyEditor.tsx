import React, { useEffect, useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { prettify } from '../../services/json-service';
import { editor } from 'monaco-editor';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

const ResponseBodyEditor = ({ value = '', onChange }: Props) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (editorRef.current && !editorRef.current.hasTextFocus()) {
      loadValueIntoEditor();
    }
  }, [value]);

  const loadValueIntoEditor = () => {
    if (editorRef.current && !editorRef.current.hasTextFocus()) {
      const formattedValue = prettify(value);
      editorRef.current.setValue(formattedValue);
    }
  };

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    loadValueIntoEditor();
  };

  const onEditorValueChange = (json: string | undefined) => {
    if (editorRef.current?.hasTextFocus()) {
      onChange(json ?? '');
    }
  };

  return (
    <MonacoEditor
      width="100%"
      height="500px"
      defaultLanguage=""
      defaultValue=""
      theme="vs-dark"
      onMount={onEditorMount}
      onChange={onEditorValueChange}
      options={{
        wordWrap: 'on',
        smoothScrolling: true,
        formatOnType: true
      }}
    />
  );
};

export default ResponseBodyEditor;
