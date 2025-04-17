import { useCallback, useEffect, useState } from 'react';
import { useDB } from './useDB.js';

const useUser = ({ enabled, id }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const {
    getData,
    loadingDB,
  } = useDB();

  useEffect(() => {
    if (!enabled || loadingDB) return;
    setError(false);
    setUser(null);
    getData({ table: 'user', ids: [id] })
      .then((value) => setUser(value[0]), (e) => { setError(true); console.error(e); });
  }, [getData, id, enabled, loadingDB]);

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
  const [notFound, setNotFound] = useState(false);

  const {
    getDataByIndex,
    loadingDB,
  } = useDB();

  useEffect(() => {
    if (!enabled || loadingDB) return;
    setError(false);
    setUser(null);
    getDataByIndex({ table: 'user', search: username, column: 'username' })
      .then((value) => { setUser(value[0]); if (value.length === 0)setNotFound(true); }, (e) => { setError(true); console.error(e); });
  }, [getDataByIndex, username, enabled, loadingDB]);

  const isLoading = !error && !user && enabled;

  return {
    isLoading,
    user,
    error,
    notFound,
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
