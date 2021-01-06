const defaultHeaders = {
  headers: { 'Content-Type': 'application/json' },
};

const requestGetOptions = {
  method: 'GET',
  ...defaultHeaders,
  credentials: 'include',
};
const requestPostOptions = {
  method: 'POST',
  ...defaultHeaders,
  credentials: 'include',
};

const requestPutOptions = {
  method: 'PUT',
  ...defaultHeaders,
};

const requestDeleteOptions = {
  method: 'DELETE',
  ...defaultHeaders,
};

const getResponse = async response => {
  const contentType = await response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  const body = await response.text();
  if (response.status !== 200) throw Error(body);
  return body;
};

const get = (url, requestOptions = requestGetOptions) =>
  fetch(url, requestOptions).then(getResponse);

const post = (url, data, requestOptions = requestPostOptions) =>
  fetch(url, { ...requestOptions, body: JSON.stringify(data) }).then(getResponse);

const put = (url, data, requestOptions = requestPutOptions) =>
  fetch(url, { ...requestOptions, body: JSON.stringify(data) }).then(getResponse);

const del = (url, data, requestOptions = requestDeleteOptions) =>
  fetch(url, requestOptions).then(getResponse);

export default { get, post, put, del };
