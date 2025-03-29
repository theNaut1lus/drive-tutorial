import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Sidney Drive
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Securely store your files in the cloud, access them from
                anywhere, and collaborate with your team in real-time.
              </p>
            </div>
            <div className="space-y-4">
              <form
                action={async () => {
                  "use server";

                  const session = await auth();

                  if (!session.userId) {
                    return redirect("/sign-in");
                  }

                  return redirect("/drive");
                }}
              >
                <Button size="lg" className="h-12 px-8" type="submit">
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
