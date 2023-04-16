import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import './Editor.scss';
import RequestResponsePairListForm from '../misc/RequestResponsePairListForm';
import { HoverflySimulation, RequestResponsePair } from '../../types/hoverfly';
import defaultEditorContent from '../../example-mock.json';

const WIDTH_SEPARATOR_PX = 10;

export default function Editor() {
  const editorRef = useRef<any>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [hoverflyMockData, setHoverflyMockData] = useState<HoverflySimulation | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth * 0.55);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.setValue(JSON.stringify(defaultEditorContent, null, 4));

    const defaultSimulation = defaultEditorContent as unknown as HoverflySimulation;
    setHoverflyMockData(defaultSimulation);
    editor.focus();
  };

  const onMouseMove = (event: MouseEvent) => {
    setLeftPanelWidth(event.clientX);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onDragStart = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  function handleCodeChange(value: string | undefined) {
    try {
      if (editorRef.current.hasTextFocus() && value) {
        setHoverflyMockData(JSON.parse(value));
      }
    } catch (_) {
      setHoverflyMockData(undefined);
    }
  }

  function onChangeFromMockForms(pairs: RequestResponsePair[]) {
    const json = JSON.stringify(hoverflyMockData, null, 4);
    editorRef.current.setValue(json);
    setHoverflyMockData({ ...hoverflyMockData, data: { pairs } });
  }

  return (
    <div className="editor-layout" ref={layoutRef}>
      <div className="left-panel" style={{ width: leftPanelWidth }}>
        {hoverflyMockData?.data?.pairs ? (
          <RequestResponsePairListForm
            requestResponsePairs={hoverflyMockData.data.pairs}
            onChange={onChangeFromMockForms}
          />
        ) : (
          <span>Invalid mock data :( </span>
        )}
      </div>
      <div
        className="divider"
        onMouseDown={onDragStart}
        style={{ width: WIDTH_SEPARATOR_PX, left: leftPanelWidth }}
      />
      <div
        className="right-panel"
        style={{ width: `calc(100% - ${leftPanelWidth}px - ${WIDTH_SEPARATOR_PX}px)` }}>
        <MonacoEditor
          width="100%"
          height="100%"
          defaultLanguage="json"
          defaultValue=""
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
          options={{
            wordWrap: 'on',
            smoothScrolling: true
          }}
        />
      </div>
    </div>
  );
}
