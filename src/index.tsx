import ReactDOM from 'react-dom/client';
import './styles';
import { BrowserRouter } from 'react-router-dom';
import { NavApp } from '@src/components/NavApp';
import { StrictMode } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './styles/theme';

const App = () => {
  return <NavApp />;
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);

// TODO: register service worker for PWA
// registerServiceWorker();
