# SRBS-_Backend
I was able to set up the database and the backend and ran the server 
everything was working .
Unfortunatly I've got some issues.
---

## Report on Backend Issues Encountered

### **Issue 1: CORS Policy Error**

**Description:**
The backend API was initially not allowing requests from the frontend. This resulted in the following error:
```
Access to fetch at 'http://192.168.100.7:4000/api/auth/register' from origin 'http://192.168.100.7:5500' has been blocked by CORS policy.
```

**Cause:**
The backend CORS configuration was not correctly set to allow requests from the specific origins where the frontend was hosted (`http://localhost:5500` and `http://192.168.100.7:5500`).

**Solution:**
The CORS middleware in the backend was updated to explicitly allow both local and remote origins. The configuration was modified to check the incoming request's origin and grant permission only to allowed origins.

---

### **Issue 2: Failed Registration (Failed to Fetch)**

**Description:**
The backend was not properly processing registration requests from the frontend, and users were unable to register. The error encountered was:
```
Registration failed: Failed to fetch
```

**Cause:**
This issue stemmed from a combination of CORS misconfiguration and potential incorrect API route handling for the registration endpoint (`/auth/register`).

**Solution:**
- The backend's CORS policy was fixed (as mentioned above).
- Ensured the `/auth/register` endpoint was correctly set up to handle POST requests and send proper responses.

---

### **Issue 3: Authentication and JWT Token Issue**

**Description:**
The backend failed to properly authenticate users, and the generated JWT token was either not stored correctly or not sent back to the frontend.

**Cause:**
This issue was related to incorrect handling of JWT tokens during the login process. The JWT was not being properly generated, or the response was incorrectly formatted.

**Solution:**
- Updated the backend to ensure JWT tokens were correctly generated using the user's credentials.
- The login endpoint now returns a valid JWT token to the frontend, which is then used for future authenticated requests.

---

### **Issue 4: Resource and Booking Handling**

**Description:**
The backend was not correctly handling resource bookings, preventing users from successfully booking slots.

**Cause:**
This was due to incomplete or incorrect handling of the booking logic in the backend routes. The API endpoints were not accepting data from the frontend correctly.

**Solution:**
- The booking API endpoint was updated to accept the correct data (resource ID and time slot).
- The backend now processes booking requests correctly and responds with success or failure messages based on the outcome.

---

### Conclusion:
The main issues in the backend related to CORS configuration, authentication, and API endpoint handling. After addressing these issues, the backend now successfully supports user registration, login, JWT authentication, and resource booking. The system is now functioning as intended, with all endpoints properly integrated with the frontend.

---



