import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import './Editor.scss';
import RequestResponsePairListForm from '../form-simulation/RequestResponsePairListForm';
import { HoverflySimulation, RequestResponsePair } from '../../types/hoverfly';
import exampleEditorContent from '../../example-mock.json';
import { parse, stringify } from '../../services/json-service';
import { editor } from 'monaco-editor';
import useDrag from '../../hooks/use-drag';
import useStoreDebounce from '../../hooks/use-store-debounce';
import TooltipDecorator from '../utilities/TooltipDecorator';
import { Button } from 'react-bootstrap';
import { BoxArrowLeft, BoxArrowRight } from 'react-bootstrap-icons';
import { useToggle } from 'usehooks-ts';

const WIDTH_SEPARATOR_PX = 10;
const LOCAL_STORAGE_KEY = 'content';

export default function Editor() {
  window.setSimulations = setSimulations;

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [hoverflySimulation, setHoverflySimulation] = useState<HoverflySimulation | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth * 0.57);
  const [editorContent, setEditorContent] = useState('');
  //  const storedEditorContent = useStoreDebounce(LOCAL_STORAGE_KEY, editorContent);
  const dragHandle = useDrag((event: MouseEvent) => setLeftPanelWidth(event.clientX));
  const [isTextEditorVisible, toggleTextEditor] = useToggle(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    const contentToLoad = window.initialSimulations; //storedEditorContent || stringify(exampleEditorContent);
    setHoverflySimulation(parse(contentToLoad));

    editor.setValue(contentToLoad);
    editorRef.current = editor;
    editor.focus();
  };

  function setSimulations(json: string) {
    editorRef.current?.setValue(json);
    setEditorContent(json);
    setHoverflySimulation(parse(json));
  }

  function onChangeFromCodeEditor(json: string | undefined) {
    if (!json) {
      return;
    }
    setEditorContent(json);

    if (editorRef.current?.hasTextFocus()) {
      setHoverflySimulation(parse(json));
    }
  }

  function onChangeFromForms(updatedPairs: RequestResponsePair[]) {
    const updatedSimulation = {
      ...hoverflySimulation,
      data: {
        ...hoverflySimulation?.data,
        pairs: updatedPairs
      }
    };
    editorRef.current?.setValue(stringify(updatedSimulation));
    setHoverflySimulation(updatedSimulation);
    window.simulationsUpdated(stringify(updatedSimulation));
  }

  function scrollToPairIndex(index: number) {
    const model = editorRef.current?.getModel()!;
    const match = model.findMatches('"request"', true, false, true, null, true);

    if (index < match.length) {
      editorRef.current?.revealRangeAtTop(match[index].range);
    }
  }

  return (
    <div className="editor-layout">
      <div className="left-panel" style={isTextEditorVisible ? { width: leftPanelWidth } : {}}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="col-1"></span>
          <h3 className="text-center">Simulations</h3>
          <div className="col-1 d-flex justify-content-end">
            <TooltipDecorator tooltipText="Toggle JSON editor">
              <Button variant="outline-secondary" type="button" onClick={() => toggleTextEditor()}>
                {isTextEditorVisible ? <BoxArrowRight /> : <BoxArrowLeft />}
              </Button>
            </TooltipDecorator>
          </div>
        </div>

        {hoverflySimulation?.data?.pairs ? (
          <RequestResponsePairListForm
            requestResponsePairs={hoverflySimulation.data.pairs}
            onChange={onChangeFromForms}
            onOpenPair={scrollToPairIndex}
          />
        ) : (
          <span>No valid data pairs</span>
        )}
      </div>
      <div
        className="divider"
        onMouseUp={dragHandle.stop}
        onMouseDown={dragHandle.start}
        style={{
          width: WIDTH_SEPARATOR_PX,
          left: leftPanelWidth,
          display: isTextEditorVisible ? 'initial' : 'none'
        }}
      />
      <div
        className="right-panel"
        style={{
          width: `calc(100% - ${leftPanelWidth}px - ${WIDTH_SEPARATOR_PX}px)`,
          display: isTextEditorVisible ? 'initial' : 'none'
        }}>
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
