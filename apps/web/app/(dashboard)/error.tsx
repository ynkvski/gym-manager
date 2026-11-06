'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center gap-3 py-10'>
      <h2>Не удалось загрузить клиентов</h2>
      <p>Попробуйте повторить запрос.</p>

      <button onClick={() => reset()}>Повторить</button>
    </div>
  );
}
