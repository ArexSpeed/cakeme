import { useState, useRef } from 'react';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getUser } from 'services/users/getUser';

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false
      }
    };
  }

  const user = await getUser(session.user.email);

  return {
    props: {
      user
    }
  };
};

const Settings = ({ user }) => {
  const [passwordBox, setPasswordBox] = useState(false);
  const [errorAccount, setErrorAccount] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [formAccountProcessing, setFormAccountProcessing] = useState(false);
  const [formPasswordProcessing, setFormPasswordProcessing] = useState(false);
  const [userName, setUserName] = useState(user.fullName);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userBakery, setUserBakery] = useState(user.bakeryName);
  const accountForm = useRef();
  const passwordForm = useRef();
  const [actionBox, setActionBox] = useState({
    active: false,
    text: ''
  });

  const submitName = async (e) => {
    e.preventDefault();
    if (formAccountProcessing) return;
    setErrorAccount(null);
    setFormAccountProcessing(true);
    const form = new FormData(accountForm.current);
    const payload = {
      email: userEmail,
      emailNew: form.get('email'),
      fullName: form.get('name'),
      bakeryName: form.get('bakery'),
      updateForm: 'accountName'
    };

    const response = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setActionBox({
        active: true,
        text: 'Your account is updated. Please re-login!'
      });
      setFormAccountProcessing(false);
    } else {
      const payload = await response.json();
      setFormAccountProcessing(false);
      setErrorAccount(payload.error);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (formPasswordProcessing) return;
    setErrorPassword(null);
    setFormPasswordProcessing(true);
    const form = new FormData(passwordForm.current);
    const payload = {
      email: user.email,
      password: form.get('password'),
      updateForm: 'accountPassword'
    };

    if (payload.password !== form.get('passwordConfirm')) {
      setErrorPassword('Given passwords not match');
      setFormPasswordProcessing(false);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setActionBox({
        active: true,
        text: 'Your password is updated. Please re-login!'
      });
      setFormPasswordProcessing(false);
    } else {
      const payload = await response.json();
      setFormPasswordProcessing(false);
      setErrorPassword(payload.error);
    }
  };

  return (
    <Layout>
      <section className="section">
        <h2>Change your account data</h2>
        {actionBox.active && (
          <div className="actionInfo">
            <p>{actionBox.text}</p>
          </div>
        )}
        <form className="form" ref={accountForm} onSubmit={submitName}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="New name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="New email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="bakery">Bakery Name:</label>
            <input
              type="name"
              id="bakery"
              name="bakery"
              placeholder="New bakery name"
              value={userBakery}
              onChange={(e) => setUserBakery(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={formAccountProcessing}>
            {formAccountProcessing ? 'Checking...' : 'Change'}
          </button>
          {errorAccount && <div className="form__error">Account not updated {errorAccount}</div>}
        </form>
        <div className="settings">
          <div className="settings__row">
            Password:{' '}
            <button className="button" onClick={() => setPasswordBox(true)}>
              Change password
            </button>
          </div>
        </div>
        {passwordBox && (
          <form className="form" ref={passwordForm} onSubmit={submitPassword}>
            <div>
              <label htmlFor="password">New Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <label htmlFor="passwordConfirm">Password Confirm:</label>
              <input type="password" id="passwordConfirm" name="passwordConfirm" required />
            </div>
            <button type="submit" disabled={formPasswordProcessing}>
              {formPasswordProcessing ? 'Checking...' : 'Change'}
            </button>
            {errorPassword && (
              <div className="form__error">Password not updated {errorPassword}</div>
            )}
          </form>
        )}
      </section>
    </Layout>
  );
};

export default Settings;
