import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent/80">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This route doesn&apos;t exist. Head back to the portfolio homepage.
      </p>
      <Button asChild className="mt-8 bg-accent text-accent-foreground">
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Back home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
