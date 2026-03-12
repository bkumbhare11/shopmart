import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function Error({ msg }) {
  const navigate = useNavigate();

  return (
    <section className="h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-red-500 p-3 bg-red-50 rounded-full mb-6">
        <CloseIcon sx={{ fontSize: "5rem" }} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 flex flex-col gap-2">
        <span className="text-5xl">404</span>
        Page Not Found
      </h1>
      <p className="text-slate-500 max-w-md mb-8 sm:text-lg">
        The page you are looking for might have been removed or the URL is
        incorrect.
      </p>

      <button
        onClick={() => navigate("/")}
        className="w-full max-w-xs uppercase bg-slate-900 text-white py-3 sm:py-3.5 sm:text-lg rounded-xl cursor-pointer font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
      >
        Back to Home
      </button>
    </section>
  );
}

export default Error;
