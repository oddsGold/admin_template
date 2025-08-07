import { QueryParams } from '../types/api.ts';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { fetchWithAuth } from './http-client.ts';
import { FileResponse, Files, Images, ImagesResponse } from '../types/download';
import { toast } from 'sonner';

export const useGetImages = (params: QueryParams = {}): UseQueryResult<ImagesResponse, Error> => {
  const { page = 1, limit = 30, sort = '-id', status = [] } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (status.length > 0) {
    queryParams.set('status', JSON.stringify(status));
  }

  return useQuery<ImagesResponse, Error>({
    queryKey: ['images', page, limit, sort, status],
    queryFn: async (): Promise<ImagesResponse> => {
      const response = await fetchWithAuth(`/images?${queryParams.toString()}`);
      const jsonData = await response.json();

      if (!jsonData.data) {
        throw new Error('Invalid response structure');
      }
      return jsonData;
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await fetchWithAuth(`/images/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });

      toast.success('Image deleted successfully', {
        description: 'The image has been removed',
      });
    },
    onError: () => {
      toast.error('Failed to delete image', {
        description: 'Could not delete image. Please try again.',
      });
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation<Images, Error, FormData>({
    mutationFn: async (FormData) => {
      const response = await fetchWithAuth('/images', {
        method: 'POST',
        body: FormData,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });

      toast.success('Image uploaded successfully', {
        description: 'New image has been added',
      });
    },
    onError: () => {
      toast.error('Failed to upload image', {
        description: 'Could not upload image. Please try again.',
      });
    },
  });
};

export const useGetFile = (params: QueryParams = {}): UseQueryResult<FileResponse, Error> => {
  const { page = 1, limit = 30, sort = '-id', status = [] } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (status.length > 0) {
    queryParams.set('status', JSON.stringify(status));
  }

  return useQuery<FileResponse, Error>({
    queryKey: ['files', page, limit, sort, status],
    queryFn: async (): Promise<FileResponse> => {
      const response = await fetchWithAuth(`/files?${queryParams.toString()}`);
      const jsonData = await response.json();

      if (!jsonData.data) {
        throw new Error('Invalid response structure');
      }
      return jsonData;
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await fetchWithAuth(`/files/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });

      toast.success('File deleted successfully', {
        description: 'The file has been removed',
      });
    },
    onError: () => {
      toast.error('Failed to delete file', {
        description: 'Could not delete file. Please try again.',
      });
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation<Files, Error, FormData>({
    mutationFn: async (FormData) => {
      const response = await fetchWithAuth('/files', {
        method: 'POST',
        body: FormData,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });

      toast.success('Image uploaded successfully', {
        description: 'New image has been added',
      });
    },
    onError: () => {
      toast.error('Failed to upload image', {
        description: 'Could not upload image. Please try again.',
      });
    },
  });
};
