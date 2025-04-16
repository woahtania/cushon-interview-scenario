import { useCallback, useEffect, useState } from 'react';


const createDatabase = (event) => {
  const db = event.target.result;

  const userStore = db.createObjectStore('user', { keyPath: 'id' });
  userStore.createIndex('username', 'username', { unique: true });
  userStore.createIndex('password', 'passwrd', { unique: false });
};

const useDB = () => {

  const [db, setDb] = useState(null);

  // Set up the DB and dispose of it when done
  useEffect(() => {
    const request = window.indexedDB.open('cushon_test_db', 0);
    request.onerror = (event) => {
      console.error({ message: 'Could not open database', event });
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };

    request.onupgradeneeded = createDatabase;

    return () => {
      db.close();
    };
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
  }), []);

  return {
    addData,
  };

};

export {
  useDB,
};
