import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl font-extrabold leading-tight text-[#2f241c] sm:text-4xl md:text-5xl">
      {children}
    </h1>
  );
}
