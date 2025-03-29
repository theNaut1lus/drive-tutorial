export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      <main className="flex-1">{children}</main>
    </div>
  );
}
