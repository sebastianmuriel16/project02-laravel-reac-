const baseURL = `${import.meta.env.VITE_API_URL}/api`;

const fetchClient = async (url, options = {}) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const config = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    ...options,
  };

  try {
    const response = await fetch(baseURL + url, config);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.reload(); // Redirigir o tomar otras acciones
      } else if (response.status === 404) {
        // Manejar el error 404 (not found)
        console.log('Not Found');
      }
      
      const errorData = await response.json();

      return errorData;

    }

    return await response.json();

  } catch (error) {
    // Manejo de errores
    console.error('Error in request:', error);
    return { errors: { message: error.message } };
  }
};

export default fetchClient;
