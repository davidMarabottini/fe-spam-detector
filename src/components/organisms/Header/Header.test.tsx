import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  const mockUser = "John Doe";

  it('renders title and logo correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('does not render user section if userDetails is missing', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const userTrigger = screen.queryByRole('button', { name: mockUser });
    expect(userTrigger).not.toBeInTheDocument();
  });

  it('renders user details when provided', () => {
    render(<MemoryRouter><Header userDetails={mockUser} /></MemoryRouter>);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<MemoryRouter><Header userDetails={mockUser} /></MemoryRouter>);
    
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});