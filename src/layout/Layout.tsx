import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
  };

function Layout({ children } : LayoutProps) {
  return (
    <>
        <header className="bg-slate-700 h-16">
            <p className="text-white text-center text-4xl font-bold align-baseline leading-[64px]">Todo List</p>
        </header>
        {children}
    </>
  )
}

export default Layout