declare global {
    interface Window {
      crossOriginIsolated: unknown;
    }
    interface HTMLElementEventMap extends HTMLElementEventMap {
        "STACK_VIEWPORT_SCROLL":CustomEvent;
    }
}
  
export default global;