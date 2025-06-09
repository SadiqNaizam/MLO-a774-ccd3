import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // For potential toggle on mobile

interface SidebarProps {
  title?: string;
  children: React.ReactNode; // Content of the sidebar, e.g., filter components
  className?: string;
  // Props for mobile toggle if needed
  // isOpen?: boolean;
  // onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  title = "Filters",
  children,
  className = "",
  // isOpen,
  // onClose
}) => {
  console.log("Rendering Sidebar with title:", title);

  // Basic sidebar structure, often used for filtering on shop pages
  // This example is for a desktop sidebar. Mobile would require state and a toggle button elsewhere.
  return (
    <aside className={`w-full md:w-72 lg:w-80 space-y-6 p-4 border-r border-border bg-card text-card-foreground ${className} hidden md:block`}> {/* Hidden on small screens by default */}
       <div className="flex justify-between items-center">
         <h2 className="text-xl font-semibold">{title}</h2>
         {/* Optional: Clear all filters button */}
         {/* <Button variant="ghost" size="sm">Clear all</Button> */}
       </div>
       <Separator />
       <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height based on surrounding layout */}
            <div className="space-y-6">
                {children ? children : (
                    <>
                        {/* Placeholder Content - Replace with actual filter components */}
                        <div className="text-muted-foreground">Category Filter Placeholder</div>
                        <Separator />
                        <div className="text-muted-foreground">Price Range Placeholder</div>
                        <Separator />
                        <div className="text-muted-foreground">Brand Placeholder</div>
                    </>
                )}
            </div>
       </ScrollArea>
    </aside>
  );
};
export default Sidebar;