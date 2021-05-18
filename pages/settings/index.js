import { useState } from 'react';
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
  const [deleteAccountBox, setDeleteAccountBox] = useState(false);
  const [formProcessing, setFormProcessing] = useState(false);
  const [changingField, setChangingField] = useState('');
  const [userName, setUserName] = useState(user.fullName);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userBakery, setUserBakery] = useState(user.bakeryName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('change');
    // if (formProcessing) return;
    // setError(null);
    // setFormProcessing(true);
    // const form = new FormData(loginForm.current);
    // const { ok } = await signIn('credentials', {
    //   redirect: false,
    //   email: form.get('email'),
    //   password: form.get('password')
    // });

    // if (ok) {
    //   router.push('/');
    // } else {
    //   setError('Not authorized. Try again.');
    //   setFormProcessing(false);
    // }
  };

  return (
    <Layout>
      <section className="section">
        <h2>Change your account data</h2>
        <form className="form">
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
              <button className="button">Yes</button>
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
