function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">College Booking</h1>
            <div className="flex space-x-6">
              <button className="hover:text-blue-200 transition-colors">
                Home
              </button>
              <button className="hover:text-blue-200 transition-colors">
                Colleges
              </button>
              <button className="hover:text-blue-200 transition-colors">
                Admission
              </button>
              <button className="hover:text-blue-200 transition-colors">
                My College
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center">Hello</h1>
      </main>
    </div>
  );
}

export default App;
