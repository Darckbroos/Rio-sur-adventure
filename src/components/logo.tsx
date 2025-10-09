
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2" >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
            {...props}
        >
            <path d="M12 3L2 21h20L12 3z" />
            <path d="M6 15c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0" />
        </svg>
        <span className="font-headline text-2xl font-bold text-foreground">Rio Sur</span>
    </div>
  );
}
