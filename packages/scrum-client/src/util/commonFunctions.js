const getValueFromLocalStorage = itemId => {
  if (localStorage && itemId) {
    return localStorage.getItem(itemId);
  }
  return '';
};

const getValueFromLocalStorageArray = (itemId, key) => {
  if (localStorage && itemId && key) {
    return localStorage.getItem(itemId) ? JSON.parse(localStorage.getItem(itemId))[key] : '';
  }
  return '';
};

const setValueToLocalStorage = (itemId, value) => {
  if (localStorage && itemId && value) {
    localStorage.setItem(itemId, value);
  }
};

export default { getValueFromLocalStorage, setValueToLocalStorage, getValueFromLocalStorageArray };
