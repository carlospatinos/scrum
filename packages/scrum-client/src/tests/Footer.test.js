import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders menu', () => {
  render(<Footer />);
  const copyrightElement = screen.getByText(/Copyright/i);
  expect(copyrightElement).toBeInTheDocument();
});
