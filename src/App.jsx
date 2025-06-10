import Navbar from "./components/Navbar/Navbar";
import { containerStyle } from "./constants";
function App() {
  return (
    <div className="transition-colors duration-200">
      <Navbar />
      <div className={`${containerStyle} mt-28`}>
        <h1>Welcome to My App</h1>
      </div>
    </div>
  );
}

export default App;
