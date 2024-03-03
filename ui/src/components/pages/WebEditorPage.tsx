import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import RequestResponsePairListForm from '@/components/forms/RequestResponsePairListForm';
import { HoverflySimulation, RequestResponsePair } from '@/types/hoverfly';
import exampleEditorContent from '../../example-mock.json';
import { parse, stringify } from '@/services/json-service';
import { editor } from 'monaco-editor';
import useDrag from '@/hooks/use-drag';
import useStoreDebounce from '@/hooks/use-store-debounce';
import TooltipDecorator from '@/components/utilities/TooltipDecorator';
import { Button } from '@/components/ui/Button';
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import { useToggle } from 'usehooks-ts';
import InvalidSimulation from '@/components/utilities/InvalidSimulation';
import { initHoverflySimulation } from '@/services/request-matcher-service';
import { TypographyH2 } from '@/components/ui/Typography';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/use-theme-provider';

const WIDTH_SEPARATOR_PX = 8;
const LOCAL_STORAGE_KEY = 'content';

/**
 * A page fitted for the web that provides an in-built text-editor with the UI editor.
 * JSON is stored in the localstorage
 */
export default function WebEditorPage() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [hoverflySimulation, setHoverflySimulation] = useState<HoverflySimulation | undefined>();
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth * 0.57);
  const [editorContent, setEditorContent] = useState('');
  const storedEditorContent = useStoreDebounce(LOCAL_STORAGE_KEY, editorContent);
  const dragHandle = useDrag((event: MouseEvent) => setLeftPanelWidth(event.clientX));
  const [isTextEditorVisible, toggleTextEditor] = useToggle(true);
  const { appliedTheme } = useTheme();

  const handleEditorDidMount: OnMount = (editor) => {
    const contentToLoad = storedEditorContent || stringify(exampleEditorContent);
    setHoverflySimulation(parse(contentToLoad));

    editor.setValue(contentToLoad);
    editorRef.current = editor;
    editor.focus();
  };

  function updateFormAndEditor(newHoverflySimulation: HoverflySimulation) {
    editorRef.current?.setValue(stringify(newHoverflySimulation));
    setHoverflySimulation(newHoverflySimulation);
  }

  function onChangeFromCodeEditor(json: string | undefined) {
    if (json === undefined) {
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
    updateFormAndEditor(updatedSimulation);
  }

  function scrollToPairIndex(index: number) {
    const model = editorRef.current?.getModel()!;
    const match = model.findMatches('"request"', true, false, true, null, true);

    if (index < match.length) {
      editorRef.current?.revealRangeAtTop(match[index].range);
    }
  }

  return (
    <div className="flex absolute inset-0 overflow-hidden" style={cssVariables}>
      <div
        className="p-5 relative overflow-auto flex-grow min-w-[100px] flex flex-col gap-6"
        style={isTextEditorVisible ? { width: leftPanelWidth } : {}}>
        <div className="flex justify-between items-center mb-3">
          <ThemeToggle />
          <TypographyH2>Simulations</TypographyH2>
          <div className="flex justify-end">
            <TooltipDecorator tooltipText="Toggle JSON editor">
              <Button variant="secondary" type="button" onClick={toggleTextEditor}>
                {isTextEditorVisible ? <ThickArrowRightIcon /> : <ThickArrowLeftIcon />}
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
        ) : editorRef.current ? (
          <InvalidSimulation
            onClick={() => {
              updateFormAndEditor(initHoverflySimulation(false));
            }}
          />
        ) : null}
      </div>
      <div
        className="top-0 bottom-0 cursor-col-resize z-10 bg-foreground/5 hover:bg-foreground/10"
        onMouseUp={dragHandle.stop}
        onMouseDown={dragHandle.start}
        style={{
          width: WIDTH_SEPARATOR_PX,
          left: leftPanelWidth,
          display: isTextEditorVisible ? 'initial' : 'none'
        }}
      />
      <div
        data-testid="text-editor"
        className="relative overflow-auto flex-grow min-w-[100px]"
        style={{
          width: `calc(100% - ${leftPanelWidth}px - ${WIDTH_SEPARATOR_PX}px)`,
          display: isTextEditorVisible ? 'initial' : 'none'
        }}>
        <MonacoEditor
          width="100%"
          height="100%"
          defaultLanguage="json"
          defaultValue=""
          theme={appliedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
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

const cssVariables = { '--accordion-animation-duration': '0.2s' } as React.CSSProperties;
