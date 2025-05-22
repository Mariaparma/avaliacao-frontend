export function getSessionStorage(key, defaultValue) {
    if (typeof window === "undefined") return defaultValue;
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  
  export function setSessionStorage(key, value) {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }