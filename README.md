# Vendor Backend Application

A comprehensive vendor management system with payment processing, support chat, and admin dashboard.

## Recent Fixes and Improvements

### 🔧 Transaction & Payment System Fixes

#### Payment Completion Logic
- **Fixed**: `handlePaymentCompleted` method now properly verifies payment status with PayPal API
- **Improved**: Added proper error handling and transaction rollback on failures
- **Enhanced**: Better logging for debugging payment issues
- **Fixed**: Proper parsing of `custom_id` from PayPal response

#### Payment Cancellation Logic
- **Fixed**: `handlePaymentCancel` method now properly cleans up database records
- **Improved**: Uses database transactions to ensure data consistency
- **Enhanced**: Properly recalculates user zipcode counts after cancellation
- **Fixed**: Deletes associated zipcodes when payment is cancelled

#### Database Schema Improvements
- **Added**: Performance indexes on User, Transaction, and SubscribePackage models
- **Enhanced**: Better query performance for payment status lookups
- **Improved**: Indexed fields: `utype`, `status`, `paymentStatus`, `transactionId`, `createdAt`

### 🎨 Badge System Improvements

#### Environment Configuration
- **Fixed**: Replaced localhost URLs with production URLs in badge generation
- **Updated**: Default URLs now point to `https://coreaeration.com` and `https://api.coreaeration.com`
- **Enhanced**: Proper environment variable fallbacks

#### Badge Customization
- **Added**: New `BOTTOM_CENTER` position option
- **Enhanced**: Smaller badge sizes (200px width for small)
- **Improved**: Better customization options with proper CSS positioning
- **Fixed**: Badge script generation with proper environment variables

### 🔐 Authentication & Routing Fixes

#### Login Redirect Logic
- **Fixed**: Proper user type detection and routing
- **Improved**: Eliminated screen flickering during login
- **Enhanced**: Better handling of SUPERADMIN, ADMIN, SUBADMIN, and VENDOR types
- **Fixed**: Correct dashboard routing for each user type

#### Auth State Management
- **Improved**: Better token storage and retrieval
- **Enhanced**: Proper initialization of auth state on app load
- **Fixed**: Loading states to prevent UI flickering
- **Added**: Error handling for invalid stored data

### 💬 Chat & Support System Fixes

#### Admin Access
- **Fixed**: Admin users can now see all tickets (not just assigned ones)
- **Improved**: Better permission handling for different admin types
- **Enhanced**: Proper message handling and file attachments

#### Frontend Chat Components
- **Fixed**: Proper error handling in chat components
- **Improved**: Better loading states and user feedback
- **Enhanced**: File upload functionality for attachments

### 🗄️ Database Optimizations

#### Performance Indexes
```sql
-- User table indexes
CREATE INDEX "User_utype_idx" ON "User"("utype");
CREATE INDEX "User_status_idx" ON "User"("status");
CREATE INDEX "User_packageActive_idx" ON "User"("packageActive");
CREATE INDEX "User_email_idx" ON "User"("email");

-- Transaction table indexes
CREATE INDEX "Transaction_paymentStatus_idx" ON "Transaction"("paymentStatus");
CREATE INDEX "Transaction_transactionId_idx" ON "Transaction"("transactionId");
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- SubscribePackage table indexes
CREATE INDEX "SubscribePackage_status_idx" ON "SubscribePackage"("status");
CREATE INDEX "SubscribePackage_endDate_idx" ON "SubscribePackage"("endDate");
```

### 🚀 Frontend Improvements

#### Loading States
- **Added**: Proper loading spinners during authentication checks
- **Improved**: Better user experience with loading indicators
- **Enhanced**: Smooth transitions between pages

#### Error Handling
- **Improved**: Better error messages and user feedback
- **Enhanced**: Proper error boundaries and fallbacks
- **Fixed**: Network error handling in API calls

## Environment Variables

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vendorapp"

# PayPal Configuration
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
PAYPAL_BASE_URL="https://api-m.sandbox.paypal.com" # or https://api-m.paypal.com for production
PAYPAL_WEBHOOK_ID="your_webhook_id" # optional

# Application URLs
FRONTEND_URL="https://coreaeration.com"
BACKEND_URL="https://api.coreaeration.com"
API_URL="https://api.coreaeration.com"

# Email Configuration
SUPPORT_EMAIL="meekoslink@gmail.com"

# JWT Secret
JWT_SECRET="your_jwt_secret"
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Transactions
- `POST /transactions/create-session/:packageId` - Create payment session
- `PATCH /transactions/admin/complete/:id` - Admin mark transaction complete
- `DELETE /transactions/:id` - Delete transaction
- `POST /transactions/paypal/webhook` - PayPal webhook handler

### Chat/Support
- `GET /chat` - Get all tickets (filtered by user type)
- `POST /chat` - Create new ticket
- `GET /chat/:id` - Get specific ticket with messages
- `POST /message` - Send message in ticket

### Vendor Badge
- `GET /vendor/badge/script` - Generate badge script
- `POST /vendor/badge/customize` - Customize badge settings

## Database Schema

### Key Models
- **User**: Vendor and admin user management
- **Transaction**: Payment processing and tracking
- **SubscribePackage**: Package subscriptions
- **ZipCode**: Geographic coverage areas
- **Chat**: Support ticket system
- **Message**: Chat messages
- **Package**: Available subscription packages

### Relationships
- User has many Transactions, SubscribePackages, ZipCodes, Chats
- Transaction belongs to SubscribePackage and User
- SubscribePackage has many ZipCodes
- Chat has many Messages
- Package has many SubscribePackages

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vendorbackend
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the application**
   ```bash
   # Backend
   cd backend
   npm run start:dev
   
   # Frontend
   cd frontend
   npm run dev
   ```

## Production Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your server
5. Set up reverse proxy (nginx)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure environment variables

## Security Considerations

- JWT tokens for authentication
- PayPal webhook signature verification
- Input validation and sanitization
- SQL injection prevention with Prisma ORM
- CORS configuration
- Rate limiting (recommended)

## Monitoring and Logging

- Console logging for debugging
- Error tracking (recommend Sentry)
- Payment transaction monitoring
- User activity tracking

## Support

For technical support or questions, please contact:
- Email: meekoslink@gmail.com
- Support tickets: Available in the application dashboard
