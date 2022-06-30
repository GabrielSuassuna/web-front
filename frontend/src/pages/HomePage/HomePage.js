import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex my-auto justify-center mx-8">
      <div className="flex flex-col flex-wrap mb-8 justify-between">
        <h1 className="text-4xl font-bold mb-12 mr-12 max-w-xl">
          Veja como serão seus professores nas suas próximas cadeiras
        </h1>
        <div className="flex flex-col">
          <Link
            to="/"
            className="min-w-md max-w-md whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 mb-4"
          >
            <button>Explorar</button>
          </Link>
          <Link
            to="/login"
            className="max-w-md whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <button>Entrar</button>
          </Link>
        </div>
      </div>

      <div>
        <img
          src={require("../../assets/img/undraw_information_tab_re_f0w3.png")}
          alt="undraw_information_tab_re_f0w3"
          className="max-w-sm"
        />
      </div>
    </div>
  );
}

export default HomePage;
