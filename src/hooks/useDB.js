import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';


const createDatabase = (event) => {
  const db = event.target.result;

  const userStore = db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
  userStore.createIndex('username', 'username', { unique: true });
  userStore.createIndex('password', 'password', { unique: false });

  const isaStore = db.createObjectStore('isa', { keyPath: 'id', autoIncrement: true });
  isaStore.createIndex('name', 'name', { unique: false });
  isaStore.createIndex('owner', 'owner', { unique: false });

  const investmentStore = db.createObjectStore('investment', { keyPath: 'id', autoIncrement: true });
  investmentStore.createIndex('date', 'date', { unique: false });
  investmentStore.createIndex('isa', 'isa', { unique: false });

  const fundStore = db.createObjectStore('fund', { keyPath: 'id', autoIncrement: true });
  fundStore.createIndex('name', 'name', { unique: false });

  const fundInvestmentStore = db.createObjectStore('fund_investment', { keyPath: 'id', autoIncrement: true });
  fundInvestmentStore.createIndex('amount', 'amount', { unique: false });
  fundInvestmentStore.createIndex('fund_id', 'fund_id', { unique: false });
  fundInvestmentStore.createIndex('investment_id', 'investment_id', { unique: false });
};

const DatabaseContext = createContext(null);

const DatabaseProvider = ({ children }) => {

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

  const value = useMemo(() => ({ db }), [db]);

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );

};

const useDB = () => {

  const { db } = useContext(DatabaseContext);

  const addData = useCallback(({ table, dataToAdd }) => new Promise((resolve, reject) => {
    if (!db) reject(new Error('DB is not open'));
    const transaction = db.transaction(table, 'readwrite');

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
    const transaction = db.transaction([table], 'readonly');
    const data = [];

    transaction.onerror = () => reject(new Error('Failed to get data'));

    const objectStore = transaction.objectStore(table);
    const index = objectStore.index(column);

    index.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.key === search) data.push(cursor.value);
        cursor.continue();
      }
      resolve(data);
    };
  }), [db]);

  if (!db) {
    return {
      loadingDB: true,
    };
  }


  return {
    addData,
    removeData,
    getData,
    getDataByIndex,
  };

};

export {
  useDB,
  DatabaseProvider,
  DatabaseContext,
};
