import { render, screen } from '@testing-library/react';
import App from './App';

test('renders planning text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Planning/i);
  expect(linkElement).toBeInTheDocument();
});
