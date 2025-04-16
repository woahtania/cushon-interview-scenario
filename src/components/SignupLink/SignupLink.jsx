import { useCallback, useState } from 'react';
import { useAddUser, useUserByUsername } from '../../hooks/userHooks';

const SignupLink = () => {

  const {
    addUser,
  } = useAddUser();

  const [added, setAdded] = useState(false);

  const {
    isLoading,
    error,
    user,
    notFound,
  } = useUserByUsername({ enabled: true, username: 'testuser1' });

  const disabled = (isLoading || !error) && !notFound;
  const alreadyAdded = !!user || added;

  const onSignup = useCallback(() => {
    addUser({ username: 'testuser1', password: 'password' });
    addUser({ username: 'testuser2', password: 'password' });
    addUser({ username: 'testuser3', password: 'password' });
    addUser({ username: 'testuser4', password: 'password' });
    addUser({ username: 'testuser5', password: 'password' });
    addUser({ username: 'testuser6', password: 'password' });
    addUser({ username: 'testuser7', password: 'password' });
    setAdded(true);
  }, [addUser]);

  if (alreadyAdded) {
    return (<p className="disabled">Test users already added</p>);
  }

  return (
    <button type="button" disabled={disabled} onClick={onSignup}>Sign Up</button>
  );


};

export {
  SignupLink,
};
