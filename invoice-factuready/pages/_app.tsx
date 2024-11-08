// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Definieer de handleNavigation functie om naar een bepaalde route te navigeren
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar met een vaste breedte voor consistentie */}
      <div className="w-64 flex-shrink-0">
        <Sidebar handleNavigation={handleNavigation} />
      </div>

      {/* Main Content inclusief Header */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Header bovenaan de main content */}
        <Header />
        {/* Pagina-inhoud zonder padding hier */}
        <div className="flex-grow bg-gray-50 p-8 overflow-y-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
