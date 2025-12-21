import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

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
              {user ? (
                <>
                  <button className="hover:text-blue-200 transition-colors">
                    Admission
                  </button>
                  <button className="hover:text-blue-200 transition-colors">
                    My College
                  </button>
                  <span className="text-sm">
                    {user.email}
                  </span>
                </>
              ) : (
                <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          {user ? `Welcome, ${user.email}!` : 'Welcome to College Booking'}
        </h1>
        <p className="text-center mt-4 text-gray-600">
          Authentication Status: {user ? 'Logged In' : 'Logged Out'}
        </p>
      </main>
    </div>
  );
}

export default App;
