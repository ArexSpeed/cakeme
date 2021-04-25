import { useRef, useState } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';

export default function UserNew() {
  const userForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(userForm.current);
    const payload = {
      email: form.get('email'),
      fullName: form.get('fullName'),
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
    <Layout>
      Register
      <p>Name: </p>
    </Layout>
  );
}
