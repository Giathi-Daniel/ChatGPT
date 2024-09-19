import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>ChatGPT Clone</div>
        <div>
          {currentUser ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-lg">
              Logout
            </button>
          ) : (
            <p>Please login to continue</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
