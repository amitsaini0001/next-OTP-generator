'use client';

import LoginForm from '../components/LoginForm';
import { Suspense } from 'react';

function AuthContent() {


  return <LoginForm />;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
} 