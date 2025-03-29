import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="dark flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <SignInButton forceRedirectUrl={"/drive"} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
