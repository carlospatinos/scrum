import { render, screen } from '@testing-library/react';
import App from './App';

test('renders menu', () => {
  render(<App />);
  const linkElement = screen.getByText(/Signup/i);
  expect(linkElement).toBeInTheDocument();
});
