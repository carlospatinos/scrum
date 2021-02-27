export function handleResponse(response) {
  if (response.success) {
    return response.data;
  }
  return response;
}

export function handleError(error) {
  if (error.data) {
    return error.data;
  }
  return error;
}
