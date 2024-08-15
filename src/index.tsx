import ReactDOM from 'react-dom/client';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import './styles';
import { BrowserRouter } from 'react-router-dom';
import { NavApp } from '@src/components/NavApp';
import { StrictMode } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { Notifications } from '@mantine/notifications';
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
        <ModalsProvider>
          <App />
          <Notifications />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);

// TODO: register service worker for PWA
// registerServiceWorker();
