import { initFlowbite } from "flowbite";
import { useEffect} from "react";
import { AuthProvider } from "./contexts/AuthConext";
import GlobalRouter from "./routes/GlobalRouter";

function App() {
  useEffect(() => {
    initFlowbite();
  },[]);

  return (
    <main className="min-h-screen items-center justify-center gap-2 dark:bg-gray-700">
      <AuthProvider>
        <GlobalRouter />
      </AuthProvider>
    </main>
  );
}

export default App;
