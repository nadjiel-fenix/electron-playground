export {};

declare global {
  interface Window {
    api: {
      saveGreeting: (greeting: string) => void;
    };
  }
}
