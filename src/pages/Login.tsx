import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthConext";
import { login as loginService } from "../services/authService";

const Login = () => {

  const [indentifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const {jwt} = await loginService(indentifier, password);
      login(jwt);
      
    } catch (error: any) {
      console.error('Error:', error);
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white sm:bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-none sm:shadow-md">
        <h2 className="text-center text-2xl font-bold">EduDrive</h2>
        {error && <div className="text-center text-red-500">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="identifier" value="Usuario" />
            <TextInput
              id="identifier"
              type="text"
              // placeholder="name@miempresa.com"
              required
              autoComplete="username"
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" value="Contraseña" />
            <TextInput
              id="password"
              type="password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="ml-2">
                Recuerdame
              </Label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Olvido su contraseña?
            </a>
          </div>
          <Button type="submit" className="w-full" color="blue" disabled={loading}>
            {loading ? "Cargando ...": "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
