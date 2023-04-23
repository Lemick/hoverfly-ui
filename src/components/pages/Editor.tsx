import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import './Editor.scss';
import RequestResponsePairListForm from '../form-simulation/RequestResponsePairListForm';
import { HoverflySimulation, RequestResponsePair } from '../../types/hoverfly';
import defaultEditorContent from '../../example-mock.json';
import { stringify } from '../../services/json-service';
import { editor } from 'monaco-editor';

const WIDTH_SEPARATOR_PX = 10;

export default function Editor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [hoverflySimulation, setHoverflySimulation] = useState<HoverflySimulation | undefined>();
  const [indexActivePair, setIndexActivePair] = useState<number>(0);
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth * 0.57);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.setValue(stringify(defaultEditorContent));

    const defaultSimulation = defaultEditorContent as unknown as HoverflySimulation;
    setHoverflySimulation(defaultSimulation);
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

  function onChangeFromCodeEditor(json: string | undefined) {
    try {
      if (editorRef.current?.hasTextFocus() && json) {
        setHoverflySimulation(JSON.parse(json));
      }
    } catch (_) {
      // Silent catch
    }
  }

  function onChangeFromForms(updatedPairs: RequestResponsePair[]) {
    const updatedSimulation = { ...hoverflySimulation, data: { pairs: updatedPairs } };
    editorRef.current?.setValue(stringify(updatedSimulation));
    setHoverflySimulation(updatedSimulation);
    scrollToPairIndex(indexActivePair);
  }

  function scrollToPairIndex(index: number) {
    if (!hoverflySimulation) {
      return;
    }

    setIndexActivePair(index);
    const model = editorRef.current?.getModel()!;
    const match = model.findMatches('"request"', true, false, true, null, true);

    if (index < match.length) {
      editorRef.current?.revealRangeAtTop(match[index].range);
    }
  }

  return (
    <div className="editor-layout">
      <div className="left-panel" style={{ width: leftPanelWidth }}>
        {hoverflySimulation?.data?.pairs ? (
          <RequestResponsePairListForm
            requestResponsePairs={hoverflySimulation.data.pairs}
            onChange={onChangeFromForms}
            onOpenPair={scrollToPairIndex}
          />
        ) : (
          <span>No data pairs </span>
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
          onChange={onChangeFromCodeEditor}
          options={{
            wordWrap: 'on',
            smoothScrolling: true
          }}
        />
      </div>
    </div>
  );
}
