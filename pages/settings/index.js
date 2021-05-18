import { useState, useRef } from 'react';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
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
  const [deleteAccountBox, setDeleteAccountBox] = useState(false);
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [userName, setUserName] = useState(user.fullName);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userBakery, setUserBakery] = useState(user.bakeryName);
  const accountForm = useRef();
  const [actionBox, setActionBox] = useState({
    active: false,
    text: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(accountForm.current);
    const payload = {
      email: form.get('email'),
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
      setFormProcessing(false);
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };

  const deleteAccount = async () => {
    const form = new FormData(accountForm.current);
    const payload = {
      email: form.get('email')
    };

    const response = await fetch('/api/users', {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      router.push('/logout');
    } else {
      const payload = await response.json();
      setError(payload.error);
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
        <form className="form" ref={accountForm} onSubmit={handleSubmit}>
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
          <button type="submit" disabled={formProcessing}>
            {formProcessing ? 'Checking...' : 'Change'}
          </button>
          {error && <div className="form__error">Account not updated {error}</div>}
        </form>
        <div className="settings">
          <div className="settings__row">
            Password: <button className="button">Change password</button>
          </div>
          <button className="button delete" onClick={() => setDeleteAccountBox(true)}>
            Delete account
          </button>
        </div>
        {deleteAccountBox && (
          <div className="form__small">
            <div>Are you sure to delete your account?</div>
            <div className="settings__row">
              <button className="button" onClick={deleteAccount}>
                Yes
              </button>
              <button className="button" onClick={() => setDeleteAccountBox(false)}>
                No
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Settings;
