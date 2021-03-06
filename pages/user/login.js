import { useRef, useState } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';

export default function Login() {
  const [session, loading] = useSession();
  const loginForm = useRef();
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
    const form = new FormData(loginForm.current);
    const { ok } = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (ok) {
      router.push('/');
    } else {
      setError('Not authorized. Try again.');
      setFormProcessing(false);
    }
  };

  return (
    !session &&
    !loading && (
      <Layout>
        <section className="section">
          <h2>Login</h2>
          <form className="form" onSubmit={handleSubmit} ref={loginForm}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button className="button" type="submit" disabled={formProcessing}>
              {formProcessing ? 'Checking...' : 'Login'}
            </button>
            {error && <div className="form__error">{error}</div>}
            <p>
              Forget password? <Link href="/user/forget">Click</Link>
            </p>
          </form>
        </section>
      </Layout>
    )
  );
}
