'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { login } from '../actions';

function LoginForm() {
  const params = useSearchParams();
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="admin-login">
      <h1>Claudius &amp; Co. Content</h1>
      <p className="sub">Sign in to manage the website.</p>

      {state?.error ? <p className="a-error">{state.error}</p> : null}

      <form action={action}>
        <input type="hidden" name="from" value={params.get('from') ?? '/admin'} />
        <div className="a-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="a-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button type="submit" className="a-btn" disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
