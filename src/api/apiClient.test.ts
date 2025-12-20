import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from './apiClient';
import { authTokenStore } from '../auth/tokenStore';

describe('apiClient Interceptors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    vi.stubGlobal('location', { href: '' });
  });

  it('should logout and redirect on 401 error', async () => {
  authTokenStore.set('token-esistente');
  
  const mockError401 = {
    response: { status: 401, data: { message: 'Unauthorized' } }
  };

  //TODO: capire come rimuovere il ts ignore e se il test va migliorato
  // @ts-ignore
  const onRejected = apiClient.interceptors.response.handlers[0].rejected;

  await expect(onRejected(mockError401)).rejects.toThrow('Errore 401: Unauthorized');

  expect(authTokenStore.get()).toBeNull();
  expect(window.location.href).toBe('/login');
});
});