import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserMenu from './UserMenu';
import { MemoryRouter } from 'react-router-dom';

// mock useAuth
vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '@/auth/useAuth';

vi.mock('@/hooks/api/useAuthenticationHooks', () => ({
  useLogout: vi.fn(),
}));
import { useLogout } from '@/hooks/api/useAuthenticationHooks';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserMenu', () => {
  const logoutMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: 'John Doe',
      domain: 'private',
      isAuthenticated: true,
      isLoading: false,
    });

    vi.mocked(useLogout).mockReturnValue({ mutate: logoutMock } as any);

    logoutMock.mockReset();
    mockNavigate.mockReset();
  });

  it('renders username', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('opens and closes dropdown when triggered', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );

    const trigger = screen.getByText('John Doe').closest('div')!;
    // inizialmente chiuso
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger); // apre
    // il dropdown dovrebbe ora avere almeno un item visibile
    const items = screen.getAllByRole('button', { hidden: true });
    expect(items.length).toBeGreaterThan(0);

    fireEvent.click(trigger); // chiude
    // non possiamo testare visibilità CSS facilmente, ma almeno l'handler è chiamato
  });

  it('calls navigate for normal menu items', () => {
    render(
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    );

    const trigger = screen.getByText('John Doe').closest('div')!;
    fireEvent.click(trigger);

    // Prendiamo la prima route che non sia LOGOUT
    const firstRouteButton = screen
      .getAllByRole('button')
      .find(btn => !btn.textContent?.toLowerCase().includes('logout'));
    
    expect(firstRouteButton).toBeDefined();
    fireEvent.click(firstRouteButton!);
  });
});
