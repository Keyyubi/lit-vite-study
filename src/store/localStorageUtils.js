export const LOCAL_STORAGE_KEY = "lit-vite-study-app-state";

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);

    return undefined;
  }
};

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};
