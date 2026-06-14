import React from 'react';

interface P { children: React.ReactNode; fallback?: React.ReactNode; }
interface S { hasError: boolean; }

export default class ErrorBoundary extends React.Component<P, S> {
  state: S = { hasError: false };

  static getDerivedStateFromError(): S {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="py-16 px-6 text-center" style={{ background: '#F8F6F2' }}>
            <p className="heading text-2xl text-navy mb-2">Quelque chose s'est mal passé</p>
            <p className="text-sm text-muted mb-6">Cette section n'a pas pu être chargée. Veuillez rafraîchir la page.</p>
            <button onClick={this.handleRetry} className="btn-yellow text-sm py-3 px-6">
              Réessayer
            </button>
          </div>
        )
      );
    }
    return <>{this.props.children}</>;
  }
}
