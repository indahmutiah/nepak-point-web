export function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full h-16 bg-card">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/images/nepak-icon.png"
          alt="logo"
          className="w-24 h-13 rounded-md ml-4"
        />
      </a>
      <div className="flex flex-row items-center">
        <button className="bg-primary text-white rounded-md px-4 py-2 mr-4">
          Sign In
        </button>
        <button className="bg-primary text-white rounded-md px-4 py-2">
          Sign Up
        </button>
      </div>
    </header>
  );
}
