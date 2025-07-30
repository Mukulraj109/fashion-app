import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

interface UseAPIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAPI = <T>(
  apiCall: () => Promise<AxiosResponse<any>>,
  dependencies: any[] = []
): UseAPIState<T> => {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiCall();
        
        if (isMounted) {
          setState({
            data: response.data.data,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error.response?.data?.message || error.message || 'An error occurred',
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
};

export const useAsyncAPI = <T>() => {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (apiCall: () => Promise<AxiosResponse<any>>) => {
    try {
      setState({ data: null, loading: true, error: null });
      const response = await apiCall();
      setState({
        data: response.data.data,
        loading: false,
        error: null,
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  return { ...state, execute };
};