'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-blue-600 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Pagina niet gevonden
        </h3>
        <p className="text-gray-600 mb-6">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link href="/">
          <Button>
            Terug naar home
          </Button>
        </Link>
      </div>
    </div>
  );
}