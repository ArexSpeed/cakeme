import { useRef, useState } from 'react';
import Layout from 'components/Layout';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
//style Form

export default function UserNew() {
  const [session] = useSession();
  const registerForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(registerForm.current);
    const payload = {
      email: form.get('email'),
      fullName: form.get('name'),
      password: form.get('password')
    };

    if (payload.password !== form.get('passwordConfirm')) {
      setError('Given passwords not match');
      setFormProcessing(false);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      router.push('/');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };

  return (
    !session && (
      <Layout>
        <section className="section">
          <h2>Create a new account</h2>
          <form className="form" onSubmit={handleSubmit} ref={registerForm}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="name" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <label htmlFor="passwordConfirm">Password Confirm:</label>
              <input type="password" id="passwordConfirm" name="passwordConfirm" required />
            </div>
            <button type="submit" disabled={formProcessing}>
              {formProcessing ? 'Creating...' : 'Register'}
            </button>
            {error && <div className="form__error">Account not created {error}</div>}
            <p>
              Have already account? <Link href="/user/login">Login</Link>
            </p>
          </form>
        </section>
      </Layout>
    )
  );
}
