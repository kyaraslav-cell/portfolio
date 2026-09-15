import { Component } from "react";

// A 3D canvas that fails to load an asset throws, and with nothing to catch it
// React unmounts the whole app: the visitor is left looking at an empty
// background. This keeps the failure inside the canvas's own box.
class CanvasBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("3D canvas failed and was skipped:", error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default CanvasBoundary;
