import { useCallback, useEffect, useState } from 'react';
import { useDB } from './useDB.js';

const useUser = ({ enabled, id }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const {
    getData,
  } = useDB();

  useEffect(() => {
    if (!enabled) return;
    setError(false);
    setUser(null);
    getData({ table: 'user', ids: [id] })
      .then((value) => setUser(value[0]), (e) => { setError(true); console.error(e); });
  }, [getData, id, enabled]);

  const isLoading = !error && !user;

  return {
    isLoading,
    user,
    error,
  };

};

const useUserByUsername = ({ enabled, username }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const {
    getDataByIndex,
  } = useDB();

  useEffect(() => {
    if (!enabled) return;
    setError(false);
    setUser(null);
    getDataByIndex({ table: 'user', search: 'username', column: username })
      .then((value) => setUser(value), (e) => { setError(true); console.error(e); });
  }, [getDataByIndex, username, enabled]);

  const isLoading = !error && !user;

  return {
    isLoading,
    user,
    error,
  };

};


const useAddUser = () => {

  const {
    addData,
  } = useDB();

  const addUser = useCallback((user) => addData({ table: 'user', dataToAdd: [user] }), [addData]);

  return { addUser };
};

const useDeleteUser = () => {

  const {
    removeData,
  } = useDB();

  const removeUser = useCallback((userID) => removeData({ table: 'user', dataToRemove: [userID] }), [removeData]);

  return { removeUser };
};

export {
  useUser,
  useAddUser,
  useDeleteUser,
  useUserByUsername,
};
