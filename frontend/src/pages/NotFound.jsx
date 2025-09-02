
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <h1 className="text-7xl font-extrabold mb-4 drop-shadow-lg">404</h1>
            <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
            <p className="mb-6 text-lg text-gray-300">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">Go Home</a>
        </div>
    );
}

export default NotFound;