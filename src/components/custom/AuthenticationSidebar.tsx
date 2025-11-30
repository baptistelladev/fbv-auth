import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export default function AuthenticationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent />
    </Sidebar>
  );
}
