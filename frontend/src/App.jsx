// app.jsx
import "./App.css";
import Layout from "./layout/Layout";
import { ThemeProvider } from "./context/ThemeContext"; // Make sure this import exists

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
