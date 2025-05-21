import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('should render its children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });
});
