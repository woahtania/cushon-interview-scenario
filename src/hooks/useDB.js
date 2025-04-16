import { useCallback, useEffect, useState } from 'react';


const createDatabase = (event) => {
  const db = event.target.result;

  const userStore = db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
  userStore.createIndex('username', 'username', { unique: true });
  userStore.createIndex('password', 'password', { unique: false });
};

const useDB = () => {

  const [db, setDb] = useState(null);

  // Set up the DB and dispose of it when done
  useEffect(() => {
    const request = window.indexedDB.open('cushon_test_db', 1);
    request.onerror = (event) => {
      console.error({ message: 'Could not open database', event });
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };

    request.onupgradeneeded = createDatabase;

    return () => {
      if (db) db.close();
    };
    // Only run on mount and unmount
    // eslint-disable-next-line
  }, []);

  const addData = useCallback(({ table, dataToAdd }) => new Promise((resolve, reject) => {
    if (!db) reject(new Error('DB is not open'));
    const transaction = db.transaction([table], 'readwrite');

    const idsAdded = [];

    transaction.oncomplete = () => resolve(idsAdded);
    transaction.onerror = () => reject(new Error('Failed to add data'));

    const objectStore = transaction.objectStore(table);
    dataToAdd.forEach((item) => {
      const request = objectStore.add(item);
      request.onsuccess = (event) => {
        idsAdded.push(event.target.result);
      };
    });
  }), [db]);

  const removeData = useCallback(({ table, dataToRemove }) => new Promise((resolve, reject) => {
    if (!db) reject(new Error('DB is not open'));
    const transaction = db.transaction([table], 'readwrite');

    const idsRemoved = [];

    transaction.oncomplete = () => resolve(idsRemoved);
    transaction.onerror = () => reject(new Error('Failed to remove data'));

    const objectStore = transaction.objectStore(table);
    dataToRemove.forEach((item) => {
      const request = objectStore.delete(item);
      request.onsuccess = (event) => {
        idsRemoved.push(event.target.result);
      };
    });
  }), [db]);

  const getData = useCallback(({ table, ids }) => new Promise((resolve, reject) => {
    if (!db) reject(new Error('DB is not open'));
    const transaction = db.transaction([table]);

    const data = [];

    transaction.oncomplete = () => resolve(data);
    transaction.onerror = () => reject(new Error('Failed to get data'));

    const objectStore = transaction.objectStore(table);
    ids.forEach((item) => {
      const request = objectStore.get(item);
      request.onsuccess = () => {
        data.push(request.result);
      };
    });
  }), [db]);

  const getDataByIndex = useCallback(({ table, search, column }) => new Promise((resolve, reject) => {
    if (!db) reject(new Error('DB is not open'));
    const transaction = db.transaction([table]);

    transaction.onerror = () => reject(new Error('Failed to get data'));

    const objectStore = transaction.objectStore(table);
    const index = objectStore.index(column);
    index.get(search).onsuccess = (event) => resolve(event.target.result);
  }), [db]);


  return {
    addData,
    removeData,
    getData,
    getDataByIndex,
  };

};

export {
  useDB,
};
