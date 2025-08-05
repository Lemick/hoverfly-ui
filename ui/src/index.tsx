import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { ThemeProvider } from './hooks/use-theme-provider';
import Main from './main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  </StrictMode>,
);
