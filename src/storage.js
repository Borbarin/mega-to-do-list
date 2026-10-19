function setItem(key, value) {
  localStorage.setItem(String(key), JSON.stringify(value))
}

function getItem(key) {
  const raw = localStorage.getItem(String(key))
  if (raw === null) return null

  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

function removeItem(key) {
  localStorage.removeItem(String(key))
}

function clear() {
  localStorage.clear()
}

function key(index) {
  return localStorage.key(index)
}

const storage = {
  setItem,
  getItem,
  removeItem,
  clear,
  key,
  get length() {
    return localStorage.length
  },
}

export { setItem, getItem, removeItem, clear, key }
export default storage
