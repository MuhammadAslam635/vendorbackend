

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
    fb?: string;
    ln?: string;
    in?: string;
    yt?: string;
    webUrl?: string;
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
  profiles?: VendorProfile[];
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