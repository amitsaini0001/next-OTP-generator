import { Suspense } from 'react';
import { LogoutButton } from './components/LogoutButton';

function HomeContent() {

  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Meta Authenticator</h1>
        
        <div className='flex flex-col gap-3'>
          <div className='flex gap-3'>
            <a
              href='/facebook'
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Facebook OTP
            </a>

            <a
              href='/instagram'
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Instagram OTP
            </a>
          </div>
          
          <LogoutButton/>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className='bg-white'>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}