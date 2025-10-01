import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-12 border rounded-md bg-card">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="underline underline-offset-4">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
