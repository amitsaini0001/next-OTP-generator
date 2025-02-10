'use client';

import { useState, useEffect, useCallback } from 'react';
import Countdown from 'react-countdown';
import { LogoutButton } from '../components/LogoutButton';
import { v4 as uuidv4 } from 'uuid';

function OTPDisplay() {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [expiresAt, setExpiresAt] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const fetchOTP = useCallback(async () => {
    if (isLoading && otp !== '') return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/instagram/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: uuidv4() }),
      });
      if (!response.ok) throw new Error('Failed to fetch OTP');
      
      const data = await response.json();
      setOtp(data.otp);
      setExpiresAt(data.expiresAt);
    } catch (err) {
      setError('Failed to generate code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [expiresAt, isLoading, otp]);

  useEffect(() => {
    fetchOTP();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Instagram Authenticator</h1>
        
        {error ? (
          <div className="mb-6">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={fetchOTP}
              className="bg-blue-600 w-full text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Reload OTP
            </button>
          </div>
        ) : isLoading ? (
          <div className="mb-6">
            <div className="text-2xl text-gray-600">Loading...</div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="text-4xl font-mono font-bold mb-2 text-black">
              {otp.match(/.{1,3}/g)?.join('')}
            </div>
            <div className="text-gray-500">
              Refreshes in: <Countdown 
                date={expiresAt*1000} 
                onComplete={() => {
                  setTimeout(fetchOTP, 1000);
                }} 
              />
            </div>
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <a
            href='/'
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
          <LogoutButton/>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return <OTPDisplay />;
}