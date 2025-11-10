
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2" >
        <img src="/images/logo.png" alt="Rio Sur Adventure" className="h-14 w-14" />
        <span className="font-headline text-2xl font-bold text-foreground">Rio Sur Adventure</span>
    </div>
  );
}
