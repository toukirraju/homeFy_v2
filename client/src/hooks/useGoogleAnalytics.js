import { useEffect } from "react";
import ReactGA from "react-ga4";

export function useGoogleAnalytics() {
  useEffect(() => {
    ReactGA.initialize("G-9ZCV1MYXZ6");
    ReactGA.send(window.location.pathname + window.location.search);
  }, []);

  function trackEvent(category, action, label) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }

  return { trackEvent };
}
