const isAuthorized = (product, session) => {
  if (!session) return false;
  if (session.user.role === 'admin') return true;
  if (product.users[0] === session.user.id) return true;

  return false;
};

export default isAuthorized;
