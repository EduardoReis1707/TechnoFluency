import { BottomNav, SideNav } from "@/components/app-nav";
import { OnboardGuard } from "@/components/onboard-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1">
      <SideNav />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-4 pb-24 pt-6 md:px-10 md:pb-10">
          <div className="mx-auto w-full max-w-2xl">
            <OnboardGuard>{children}</OnboardGuard>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
