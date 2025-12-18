import {render, screen} from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('rendered with only label', () => {
    render(<Button label="Test Button"  />);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });
});