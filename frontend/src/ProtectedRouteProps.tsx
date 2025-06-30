export type UserRole = 'ADMIN' | 'VENDOR' | 'SUBADMIN';
export interface Zipcode {
    id: number;
    zipcode: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}

export interface Package {
    id: number;
    name: string;
    zipcodes: number;
    price: number;
    description: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  utype: UserRole;
  status: string;
  company?: string;
  businessName?: string;
  state?: string;
  city?: string;
  address?: string;
  country?: string;
  companyLogo?: string;
  fb?: string;
  ln?: string;
  in?: string;
  yt?: string;
  webUrl?: string;
  totalzipcodes?: number;
  addedzipcodes?: number;
  about?: string;
  createdAt: Date;
  packageActive: string;
  zipcodes?: Zipcode[];
  package?: Package;
  gallery?: Gallery[];
}

export interface Gallery {
  id: number;
  image: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
  }

  export interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
  }