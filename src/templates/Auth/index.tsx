import { ReactNode, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { ENV } from 'config/enviroments';
import { AUTH } from 'endpoints/auth';
import { getToken, isAuth, logOut } from 'helpers/auth';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUserData } from 'store/slices/userSlice';

const AuthTemplate = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean | null>(null);

  const fetchUserData = async () => {
    setLoading(true);

    try {
      const token = getToken();

      //I leave a domain name hardcoded here because we are using json-server and our separate backend as well
      //it causes that we have to different connection strings
      //in the future it must we change to env variable
      const { data } = await axios.get(`http://localhost:8080${AUTH.FETCH_USER_DATA}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setUserData(data.user));
    } catch (error) {
      console.error(error);
      logOut(history.push);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth()) {
      fetchUserData();
    }
  }, []);

  if (!isAuth() || (isAuth() && loading === false)) return <div>{children}</div>;

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default AuthTemplate;
