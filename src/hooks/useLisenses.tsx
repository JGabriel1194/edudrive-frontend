import { useState, useEffect, useCallback } from 'react';
import { getLiceses, postLicense } from '../services/licenseServices';
import { LicenseInterface, newLicenseInterface } from '../interfaces/LicenseInterface';

const useLicenses = (page: number, pageSize: number, params: string) => {
  const [licenses, setLicenses] = useState<LicenseInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any | null>(null);

  const pages = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const image = "&populate[image][fields]=url";

  const fetchLicenses = useCallback(async () => {
    try {
      const queryParams = pages + (params ? `&${params}` : '') + image;
      const response = await getLiceses(queryParams);
      setLicenses(response.data);
      setPagination(response.meta.pagination);
    } catch (error) {
        setError('Error fetching licenses');
    } finally {
      setLoading(false);
    }   
  }, [page, pageSize, params]);
  useEffect(() => {}, []);

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  const saveLicense = useCallback(async (license: newLicenseInterface) => {
    setLoading(true)
    setError(null)
    try {
      const response = await postLicense(license)
      fetchLicenses();
      return response
    } catch (error) {
      setError('Error al guardar la licencia')
    }finally{
      setLoading(false)
    }
  },[])

  return { licenses, loading, error, pagination, saveLicense };
};

export default useLicenses;