import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import './Editor.scss';
import RequestResponsePairListForm from '../misc/RequestResponsePairListForm';
import { HoverflySimulation } from '../../types/hoverfly';

const WIDTH_SEPARATOR_PX = 10;

export default function Editor() {
  const editorRef = useRef<any>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [hoverflyMockData, setHoverflyMockData] = useState<HoverflySimulation | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth / 2);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onMouseMove = (event: MouseEvent) => {
    setLeftPanelWidth(event.clientX);
    console.log('left client ', event.clientX);
    editorRef.current?.layout();
  };

  const onMouseUp = () => {
    console.log('onMouseUp');
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onDragStart = () => {
    console.log('on drag start');
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  function handleCodeChange(value: string | undefined) {
    try {
      setHoverflyMockData(value ? JSON.parse(value) : undefined);
      console.log('code change');
    } catch (_) {
      setHoverflyMockData(undefined);
    }
  }

  return (
    <div className="editor-layout" ref={layoutRef}>
      <div className="left-panel" style={{ width: leftPanelWidth }}>
        <MonacoEditor
          width="100%"
          height="100%"
          defaultLanguage="json"
          defaultValue="{ }"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
          options={{
            wordWrap: 'on'
          }}
        />
      </div>
      <div
        className="divider"
        onMouseDown={onDragStart}
        style={{ width: WIDTH_SEPARATOR_PX, left: leftPanelWidth }}
      />
      <div
        className="right-panel"
        style={{ width: `calc(100% - ${leftPanelWidth}px - ${WIDTH_SEPARATOR_PX}px)` }}>
        {hoverflyMockData?.pairs ? (
          <RequestResponsePairListForm
            requestResponsePairs={hoverflyMockData.pairs}
            onSubmit={(pairs) => {
              console.log(JSON.stringify({ ...hoverflyMockData, pairs }));
              editorRef.current.setValue(JSON.stringify({ ...hoverflyMockData, pairs }));
              editorRef.current.getAction('editor.action.formatDocument').run();
            }}
          />
        ) : (
          <span>Invalid mock data :( </span>
        )}
      </div>
    </div>
  );
}
