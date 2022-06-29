import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative bg-white">
      <div>
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={require("../../assets/img/logo.png")}
                alt=""
              />
            </Link>
            <h1 className="ml-4 text-lg">Sistema Feedback Universitário</h1>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link to="about">
              <button className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sobre
              </button>
            </Link>

            <Link to="faq">
              <button className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Faq
              </button>
            </Link>

            <Link to="login">
              <button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
