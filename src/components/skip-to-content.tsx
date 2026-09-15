export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-accent font-medium text-sm transition-all"
    >
      Skip to main content
    </a>
  );
}
