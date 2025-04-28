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


---

### **Issue 2: Failed Registration (Failed to Fetch)**

**Description:**
The backend was not properly processing registration requests from the frontend, and users were unable to register. The error encountered was:
```
Registration failed: Failed to fetch
```

**Cause:**
This issue stemmed from a combination of CORS misconfiguration and potential incorrect API route handling for the registration endpoint (`/auth/register`).

---

### **Issue 3: Authentication and JWT Token Issue**

**Description:**
The backend failed to properly authenticate users, and the generated JWT token was either not stored correctly or not sent back to the frontend.

**Cause:**
This issue was related to incorrect handling of JWT tokens during the login process. The JWT was not being properly generated, or the response was incorrectly formatted.


### **Issue 4: Resource and Booking Handling**

**Description:**
The backend was not correctly handling resource bookings, preventing users from successfully booking slots.

**Cause:**
This was due to incomplete or incorrect handling of the booking logic in the backend routes. The API endpoints were not accepting data from the frontend correctly.

---

### Conclusion:
The main issues in the backend related to CORS configuration, authentication, and API endpoint handling. 
---



