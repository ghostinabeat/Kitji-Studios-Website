import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Support both Node.js backend (original) and ASP.NET Core backend
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 
                  (url.startsWith('/api/') ? 'http://localhost:5001' : '');
  
  const fullUrl = baseUrl ? `${baseUrl}${url}` : url;
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * Enhanced API request specifically for ASP.NET Core backend
 * Provides better error handling and type safety for the new backend
 */
export async function aspNetApiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
  
  // Add authentication header if available (for future admin features)
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, config);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      // Try to extract ASP.NET Core error response
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.title || errorMessage;
        
        // Include FluentValidation errors if present
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage += ': ' + errorData.errors.join(', ');
        }
      } catch {
        // If JSON parsing fails, use the original error message
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your connection and try again.');
    }
    throw error;
  }
}

/**
 * Contact form submission for ASP.NET Core backend
 */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
  errors?: string[];
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  return aspNetApiRequest<ContactResponse>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
