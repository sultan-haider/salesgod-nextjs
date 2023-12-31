import { useContext } from 'react';
// import { AuthContext } from '../contexts/jwt-context';
import { AuthContext } from '../contexts/auth0-context';

export const useAuth = () => useContext(AuthContext) as any;
