

export default function Page({ params }: { params: { id: string } }) {
    return (
    <main className="flex min-h-screen w-full justify-center items-center p-24">
        My Post: {params.id}
    </main>
    );
  }