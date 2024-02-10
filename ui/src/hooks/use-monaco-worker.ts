import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { loader } from '@monaco-editor/react';

// Init monaco workers
self.MonacoEnvironment = {
  getWorker(_: never, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }
    return new editorWorker();
  }
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

// Makes editor available to React monaco editor
loader.config({ monaco });
