import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../i18n';

// Renders a component with localization and withing a router.
function render(ui, { ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/`]} keyLength={0}>
          {children}
        </MemoryRouter>
      </I18nextProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
