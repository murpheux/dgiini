(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = 'https://localhost:8800/api';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) { return null }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }

    return item.value
}
