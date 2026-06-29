# ServeNear MVP

ServeNear is a mobile-first local services marketplace designed to help township users find trusted local service providers such as plumbers, electricians, builders, cleaners and roofers.

This MVP was created as part of the Sand Dollar Design UX/AI Internship programme and demonstrates the transition from UX prototype to a working MVP demo.

---

## Project Overview

Township communities often rely on word-of-mouth, WhatsApp groups and Facebook posts to find service providers. This can make the process slow, unreliable and difficult to verify.

ServeNear solves this by providing a central platform where customers can search for local providers, view profiles, request bookings, send messages and leave reviews.

Service providers can manage bookings, update their profiles, respond to job requests and build credibility through reviews and verification.

---

## MVP Goals

The goal of this MVP is to prove that:

* Customers can find and book trusted local service providers.
* Providers can manage service requests and customer communication.
* Admin users can manage basic provider verification.
* The core ServeNear journey can work end-to-end before backend integration.

---

## Built With

* React
* Vite
* React Router
* JavaScript
* CSS
* localStorage for MVP demo data

---

## Current MVP Features

### Customer Features

* Register and log in as a customer
* Search service providers
* Filter providers by category and area
* View provider profiles
* Create booking requests
* View booking status
* Send booking-linked messages
* Leave reviews after completed bookings

### Provider Features

* Register and log in as a provider
* View incoming job requests
* Accept or decline bookings
* Mark jobs as completed
* Send messages to customers
* Manage service details
* Manage provider profile information
* View customer reviews

### Admin Features

* Register and log in as an admin demo user
* View registered users
* View all bookings
* Update provider verification status
* Access QA checklist
* Reset demo data

---

## Demo Data Notice

This version uses browser localStorage instead of a live backend database.

This means data is saved only in the browser being used for the demo. If the browser storage is cleared, the demo data will reset.

Supabase integration is planned as a future production step.

---

## How to Run the Project

### 1. Install dependencies

```bash
cd servenear-mvp
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the local URL

Vite will provide a local development link, usually:

```text
http://localhost:5173
```

---

## Demo Login Flow

Because this is a mock MVP, users can create demo accounts directly from the registration page.

Recommended demo accounts:

```text
Role: Customer
Role: Service Provider
Role: Admin Demo User
```

---

## Main Demo Routes

### Public

```text
/
 /login
 /register
```

### Customer

```text
/customer/home
/customer/search
/customer/bookings
/customer/messages
```

### Provider

```text
/provider/dashboard
/provider/jobs
/provider/services
/provider/messages
/provider/reviews
/provider/profile
```

### Admin

```text
/admin/dashboard
/admin/users
/admin/bookings
/admin/verification
/admin/qa
```

---

## MVP Status

This MVP is ready for demo because the core customer, provider and admin journeys are functional using mock browser-based storage.

It is not yet production-ready for real users because authentication, database storage, file uploads, payments and security controls still need backend implementation.

---

## Future Improvements

* Supabase authentication
* Supabase database integration
* Real provider profiles
* Real booking persistence
* Real-time messaging
* Provider document uploads
* Payment integration
* Push/email notifications
* Advanced search and filters
