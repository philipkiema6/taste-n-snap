# PayPal Integration Setup Guide

## Overview
Your restaurant ordering app now includes secure PayPal payment processing. All payments will be sent directly to the PayPal account associated with the Client ID you've configured.

## How Payments Work
- Payments are processed through PayPal's secure checkout
- Funds are automatically deposited to the PayPal business account (philipkiema6@gmail.com)
- The email address is never exposed in the code or to customers
- The PayPal Client ID you've provided is public and links payments to your account

## Getting Your PayPal Client ID

1. **Log in to PayPal Developer Dashboard**
   - Visit: https://developer.paypal.com/dashboard/
   - Sign in with your PayPal business account (philipkiema6@gmail.com)

2. **Create or Select an App**
   - Go to "My Apps & Credentials"
   - Create a new app or select an existing one
   - Switch to "Live" mode for production (currently using Sandbox for testing)

3. **Copy Your Client ID**
   - Copy the "Client ID" from your app
   - This is the value you've already configured in Lovable Cloud secrets

## Testing Payments

### In Sandbox Mode (Testing):
- Use PayPal sandbox test accounts
- No real money is transferred
- Perfect for testing the complete flow

### In Live Mode (Production):
- Real payments are processed
- Funds go directly to your business account
- Update the Client ID to your Live credentials

## What's Included

✅ **Frontend Features:**
- Secure PayPal checkout button
- Customer contact form (email, name, phone)
- Real-time payment processing
- Order confirmation page with transaction details

✅ **Backend Features:**
- Order storage in database
- Transaction ID tracking
- Customer information storage
- Order status management

✅ **Admin Dashboard:**
- View all orders
- See customer details
- Track PayPal transaction IDs
- Update order status (pending/fulfilled/cancelled)
- Real-time updates

✅ **Customer Features:**
- Authentication system (sign up/login)
- View order history
- Track order status
- Order details with transaction IDs

## Security

- PayPal Client ID is stored securely in Lovable Cloud
- Payment processing happens on PayPal's secure servers
- Customer data is protected with Row Level Security (RLS)
- Admin access requires special permissions
- Passwords are hashed and secure

## Admin Access

To grant admin access to a user:
1. Go to your Lovable Cloud backend
2. Navigate to the `user_roles` table
3. Add a new row with:
   - `user_id`: The user's ID from the `auth.users` table
   - `role`: Select "admin"

## Next Steps

1. **Test the Payment Flow:**
   - Add items to cart
   - Fill in contact information
   - Complete PayPal checkout
   - Verify order appears in admin dashboard

2. **Switch to Live Mode:**
   - Get your Live PayPal Client ID
   - Update the secret in Lovable Cloud
   - Update the PayPal SDK script URL if needed

3. **Customize:**
   - Adjust email notifications (optional)
   - Customize order statuses
   - Add delivery tracking

## Support

For PayPal-specific issues:
- PayPal Developer Documentation: https://developer.paypal.com/docs/
- PayPal Support: https://www.paypal.com/businesshelp/

For app-related issues:
- Check the browser console for errors
- Verify the PayPal Client ID is correctly set
- Ensure database tables are properly configured
