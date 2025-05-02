

export type UserRole = 'ADMIN' | 'VENDOR';
export interface VendorProfile {
    id: number;
    company?: string;
    businessName?: string;
    state?: string;
    city?: string;
    zipcode?: string;
    address?: string;
    country?: string;
    companyLogo?: string;
    profileImg?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  utype: UserRole;
  status: string;
  createdAt: Date;
  packageActive: string;
  vendor?: VendorProfile | null;
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