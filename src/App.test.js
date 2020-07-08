import React from 'react';
import { render } from '@testing-library/react';
import ProductApp from './ProductApp';

test('renders learn react link', () => {
  const { getByText } = render(<ProductApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
