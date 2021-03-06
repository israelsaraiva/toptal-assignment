import { AxiosResponse } from 'axios';
import LoadingApp from 'common/LoadingApp';
import { User } from 'models/user.model';
import AccessPage from 'pages/access/AccessPage';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { configureAxiosInstance } from 'services/http.service';
import { LoginResponse } from 'services/models/login-response.model';

export enum Role {
  User = 'user',
  Admin = 'admin',
  RestaurantOwner = 'restaurantOwner'
}

type IAuthContext = {
  currentUser: User;
  signUp: (user: User) => Promise<AxiosResponse<any>>;
  signIn(email: string, password: string): Promise<LoginResponse | void>;
  signOut: () => void;
  userToken?: string;
};

const AuthContext = React.createContext<Partial<IAuthContext>>({});

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User>();

  const axiosInstance = configureAxiosInstance();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('userData');

    if (token) {
      setUserToken(token);
    }

    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  function signUp(user: User) {
    setLoading(true);

    return axiosInstance.post('auth/register', user).finally(() => setLoading(false));
  }

  async function signIn(email: string, password: string): Promise<LoginResponse | void> {
    setLoading(true);

    return axiosInstance
      .post<LoginResponse>('auth/login', { email, password })
      .then((res) => {
        setUserToken(res.data.accessToken);
        setCurrentUser(res.data.user);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
      })
      .finally(() => setLoading(false));
  }

  function signOut() {
    setUserToken(undefined);
    localStorage.setItem('accessToken', '');
  }

  const renderApp = useMemo(() => {
    return userToken ? children : <AccessPage />;
  }, [userToken]);

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    userToken
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingApp />}
      {!loading && renderApp}
    </AuthContext.Provider>
  );
}
