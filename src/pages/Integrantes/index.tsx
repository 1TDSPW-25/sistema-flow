export default function Integrantes() {
  const membros: string[] = [
    "Integrante 1",
    "Integrante 2",
    "Integrante 3",
    "Integrante 4",
    "Integrante 5",
    "Integrante 6",
    "Integrante 7",
    "Integrante 8",
    "Integrante 9",
    "Integrante 10",
    "Integrante 11",
    "Integrante 12",
    "Integrante 13",
    "Integrante 14",
    "Integrante 15",
    "Integrante 16",
    "Integrante 17",
    "Integrante 18",
    "Integrante 19",
    "Integrante 20",
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Integrantes</h1>
        <p className="text-gray-700 mb-8">
          Conheça a equipe responsável por este projeto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {membros.map((nome, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-5 flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
              <h3 className="text-lg font-semibold">{nome}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
