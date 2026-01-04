import { render, screen, fireEvent } from '@testing-library/react';
import { SideMenu } from './SideMenu';
import { privateRoutes } from '@constants/routes';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SideMenu', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders private routes when menuType is privateRoutes', () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen onClose={vi.fn()} menuType="privateRoutes" />
      </MemoryRouter>
    );

    privateRoutes.forEach(route => {
      expect(screen.getByText(route.handle.label)).toBeInTheDocument();
    });
  });

  it('navigates and closes menu on item click', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <SideMenu isOpen onClose={onClose} menuType="privateRoutes" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(privateRoutes[0].handle.label));

    expect(mockNavigate).toHaveBeenCalledWith(privateRoutes[0].path, { replace: true });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <SideMenu isOpen onClose={onClose} menuType="privateRoutes" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('presentation', { hidden: true }));

    expect(onClose).toHaveBeenCalled();
  });

  it('does not render backdrop when closed', () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={false} onClose={vi.fn()} menuType="privateRoutes" />
      </MemoryRouter>
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
