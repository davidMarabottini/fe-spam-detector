import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
// import style from "./Header.module.scss";

describe('Header Component', () => {
  const mockUser = { user: 'John Doe', role: 'admin' };

  it('renders title and logo correctly', () => {
    render(<Header />);
    expect(screen.getByText('Spam Detector AI')).toBeInTheDocument();
  });

  it('does not render user section if userDetails is missing', () => {
    render(<Header />);
    // Cerchiamo la classe o il ruolo del trigger utente
    const userTrigger = screen.queryByRole('button', { name: /John Doe/i });
    expect(userTrigger).not.toBeInTheDocument();
  });

  it('renders user details when provided', () => {
    render(<Header userDetails={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<Header userDetails={mockUser} />);
    
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});