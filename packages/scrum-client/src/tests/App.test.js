import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import App from '../App';

test('app starts', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  const appTitleElement = screen.getByText(/Scrum/i);
  expect(appTitleElement).toBeInTheDocument();
});

test('unauthorized user visible menu', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  const loginMenuElement = screen.getByText(/Sign In/i);
  expect(loginMenuElement).toBeInTheDocument();
});
