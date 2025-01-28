import { Button } from 'flowbite-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
            <Button href="/" color="primary">
                Ir a la página principal
            </Button>
        </div>
    );
};

export default NotFound;