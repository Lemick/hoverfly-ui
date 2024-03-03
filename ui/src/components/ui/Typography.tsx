import { ReactNode } from 'react';

export function TypographyH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: { children: ReactNode }) {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
}

export function TypographyH4({ children }: { children: ReactNode }) {
  return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>;
}
