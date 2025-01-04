import React, { Children } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main>
                {children}
            </main>

        </div>
    );
};

export default MainLayout;