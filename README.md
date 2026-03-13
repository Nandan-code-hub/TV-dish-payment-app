# TV Dish Payment System (MVP Scaffold)

This repository contains a production-oriented scaffold for the **DishPay** idea in SPEC-1.

## Folders

- `backend/` - Node.js + Express backend with PostgreSQL support
- `mobile/` - Flutter mobile app skeleton for household and owner workflows
- `docs/` - Additional implementation notes

## Backend quick start

```bash
cd backend
npm install
cp .env.example .env
# create tables using src/db/schema.sql
npm run dev
```

## Implemented API surfaces

- `POST /auth/send-otp`
- `POST /auth/verify-otp`
- `POST /households`
- `GET /households`
- `GET /households/:dishId`
- `POST /payments/create-order`
- `POST /payments/verify`
- `POST /payments/cash`
- `GET /payments/history/:dishId`
- `GET /owner/dashboard`

## Notes

- OTP service currently uses an in-memory stub (`123456`) and should be replaced with Firebase/Auth provider.
- Razorpay integration points are coded and ready for real credentials.
- Monthly billing is dynamic: if payment exists for the current month/year, household is marked paid.
