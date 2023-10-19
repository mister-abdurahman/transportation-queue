import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
