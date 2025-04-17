import { useCallback, useEffect, useState } from 'react';
import { useDB } from './useDB.js';

const useISA = ({ enabled, id }) => {

  const [isa, setIsa] = useState(null);
  const [error, setError] = useState(false);

  const {
    getData,
    loadingDB,
  } = useDB();

  useEffect(() => {
    if (!enabled || loadingDB) return;
    setError(false);
    setIsa(null);
    getData({ table: 'isa', ids: [id] })
      .then((value) => setIsa(value[0]), (e) => { setError(true); console.error(e); });
  }, [getData, id, enabled, loadingDB]);

  const isLoading = !error && !isa;

  return {
    isLoading,
    isa,
    error,
  };

};

const useISAsByOwner = ({ enabled, ownerID }) => {

  const [isaList, setIsaList] = useState(null);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const {
    getDataByIndex,
    loadingDB,
  } = useDB();

  useEffect(() => {
    if (!enabled || loadingDB) return;
    setError(false);
    setIsaList(null);
    getDataByIndex({ table: 'isa', search: ownerID, column: 'owner' })
      .then((value) => { setIsaList(value); if (value.length === 0)setNotFound(true); }, (e) => { setError(true); console.error(e); });
  }, [getDataByIndex, enabled, loadingDB, ownerID]);

  const isLoading = !error && !isaList;

  return {
    isLoading,
    isaList,
    error,
    notFound,
  };

};


const useAddIsa = () => {

  const {
    addData,
  } = useDB();

  const addIsa = useCallback((isa) => addData({ table: 'isa', dataToAdd: [isa] }), [addData]);

  return { addIsa };
};

const useDeleteIsa = () => {

  const {
    removeData,
  } = useDB();

  const removeIsa = useCallback((isaID) => removeData({ table: 'isa', dataToRemove: [isaID] }), [removeData]);

  return { removeIsa };
};

export {
  useISA,
  useAddIsa,
  useDeleteIsa,
  useISAsByOwner,
};
