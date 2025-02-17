import Board from "./components/Board";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">オセロゲーム</h1>
      <Board />
    </main>
  );
}
