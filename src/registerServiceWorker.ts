/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { Workbox } from 'workbox-window';

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        const needRefresh = confirm('New app update is available. Click OK to refresh');

        if (needRefresh) {
          window.location.reload();
        }
      }
    });

    return wb.register();
  }

  return Promise.reject('Service Workers are not available in your browser');
};
