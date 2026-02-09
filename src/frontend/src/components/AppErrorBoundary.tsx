import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
    console.error('React Error Boundary caught an error:', error);
    if (errorInfo.componentStack) {
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-12 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="font-david text-4xl text-wine">Oops!</h1>
            <p className="font-emily text-lg text-unicorn-silver">
              Something went wrong. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-wine/80 px-8 py-3 font-emily text-lg text-white transition-all hover:scale-105 hover:bg-wine"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
