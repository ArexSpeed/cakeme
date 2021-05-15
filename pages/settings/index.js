import React from 'react';
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
  return (
    <Layout>
      <section className="section">
        <h2>Change your account data</h2>
      </section>
      <div className="settings">
        <div className="settings__row">
          Your name: {user.fullName} <button className="button">Change name</button>
        </div>
        <div className="settings__row">
          Your email: {user.email} <button className="button">Change email</button>
        </div>
        <div className="settings__row">
          Your bakery name: {user.fullName} <button className="button">Change bakery</button>
        </div>
        <div className="settings__row">
          Password: <button className="button">Change password</button>
        </div>
        <button className="button delete">Delete account</button>
      </div>
    </Layout>
  );
};

export default Settings;
