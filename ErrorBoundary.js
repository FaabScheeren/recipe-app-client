import React from "react";
import FallbackComponent from "./src/screens/FallbackComponent";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <FallbackComponent /> : this.props.children;
  }
}
