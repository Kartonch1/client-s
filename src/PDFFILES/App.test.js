import { render, screen } from '@testing-library/react';
import PdfPage from './Pdf';

test('renders learn react link', () => {
  render(<PdfPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
