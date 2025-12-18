const TOKEN_KEY = 'authToken';

export const authTokenStore = {
  get: (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
  },
  set: (token: string | null) => {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }
};
