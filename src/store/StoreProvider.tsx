import React from 'react';
import { Provider } from 'react-redux';
import { hydrateStore, store } from './store';
import { loadPersistedState, savePersistedState } from './persistence';

const SAVE_DELAY_MS = 350;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    let mounted = true;

    loadPersistedState()
      .then((state) => {
        if (mounted) {
          hydrateStore(state);
        }
      })
      .catch((error) => {
        console.warn('Unable to load saved app state', error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    let saveTimer: ReturnType<typeof setTimeout> | undefined;

    const unsubscribe = store.subscribe(() => {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }

      saveTimer = setTimeout(() => {
        savePersistedState(store.getState()).catch((error) => {
          console.warn('Unable to save app state', error);
        });
      }, SAVE_DELAY_MS);
    });

    return () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
      }
      unsubscribe();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
