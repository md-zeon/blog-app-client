import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-4">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <Button variant="outline" size="sm">
          Go back to home
        </Button>
      </Link>
    </div>
  );
}
