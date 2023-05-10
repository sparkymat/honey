import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { HashRouter } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { store } from './store';
import App from './components/App';

const element = document.getElementById('honey-app');

const ThemedApp = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme],
  );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: 'PT Sans, sans-serif',
          headings: { fontFamily: 'Montserrat, sans-serif' },
        }}
      >
        <HashRouter>
          <App />
        </HashRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

if (element) {
  ReactDOM.render(
    <Provider store={store}>
      <ThemedApp />
    </Provider>,
    element,
  );
}
