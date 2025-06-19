import { Link } from "react-router";

function Logo() {
  return (
    <>
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="relative">
          <div
            className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400
 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div>
          <p
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400

 bg-clip-text text-transparent"
          >
            ByteWave
          </p>
          <div className="text-xs slogan text-gray-500">
            Riding the Wave of Technology
          </div>
        </div>
      </Link>
    </>
  );
}

export default Logo;
