import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/api/authService';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation("toastMessages")
  const {addToast} = useToast();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e: AxiosError) => {
      switch(e.status) {
        case 401:
          return addToast(t('Login.wrong_user_password'), 'failure')
        default:
          return addToast(e.message, 'failure')
      }
    }
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
  });
};

export const useMineDetails = () => {
  return useQuery({
    queryKey: ['mineDetails'],
    queryFn: () => authService.getMineDetails(),

  });
};

export const useUpdateMineDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateMineDetails,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['mineDetails'], updatedData.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear(); 
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};