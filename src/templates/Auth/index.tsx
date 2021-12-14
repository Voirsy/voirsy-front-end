import { ReactNode, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { AUTH } from 'endpoints/auth';
import { isAuth, logOut } from 'helpers/auth';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUserData } from 'store/slices/userSlice';
import { axiosAuth } from 'axios/axios';

const AuthTemplate = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean | null>(null);

  const fetchUserData = async () => {
    setLoading(true);

    try {
      const { data } = await axiosAuth.get(AUTH.FETCH_USER_DATA);

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
