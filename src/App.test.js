import { render, screen } from '@testing-library/react';
import React from 'react';
import AppWithProvider from './App';


test('renders learn react link', () => {  
  render(<AppWithProvider />);
  const linkElement = screen.getByRole(/main/i);
  expect(linkElement).toBeInTheDocument();
}); 
