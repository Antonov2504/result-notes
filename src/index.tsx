import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import './styles';
import { BrowserRouter } from 'react-router-dom';
import { NavApp } from '@src/components/NavApp';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from './styles/theme';
import { registerServiceWorker } from './registerServiceWorker';

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

registerServiceWorker();
