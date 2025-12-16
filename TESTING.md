# 🧪 Testing Guide

This document provides a comprehensive testing checklist for the Lunch Money application.

## Prerequisites

Before testing, ensure:
- ✅ MongoDB is running (local or Atlas)
- ✅ `.env` file is configured with all required variables
- ✅ Dependencies are installed (`npm install`)
- ✅ Development server can start (`npm run dev`)

---

## Test Checklist

### 1. Environment Setup

- [ ] `.env` file exists in root directory
- [ ] `MONGODB_URI` is set correctly
- [ ] `ADMIN_USERNAME` is set
- [ ] `ADMIN_PASSWORD` is set
- [ ] `ADMIN_SESSION_SECRET` is set
- [ ] MongoDB connection is working

**Test Command:**
```bash
# Check if MongoDB is accessible
mongosh "your_connection_string" --eval "db.adminCommand('ping')"
```

---

### 2. Enrollment Form Testing

#### 2.1 Form Display
- [ ] Form loads correctly on homepage
- [ ] All input fields are visible
- [ ] Form styling matches design
- [ ] Form is responsive on mobile devices

#### 2.2 Form Validation
- [ ] Submit button is disabled when form is empty
- [ ] Required field validation works
- [ ] Email format validation works (invalid emails rejected)
- [ ] Number field accepts only numbers
- [ ] Error messages display correctly

#### 2.3 Form Submission
- [ ] Form submits successfully with valid data
- [ ] Success message displays after submission
- [ ] Form resets after successful submission
- [ ] Loading state shows during submission
- [ ] Error message shows if submission fails
- [ ] Data is saved to MongoDB

**Test Data:**
```json
{
  "schoolName": "Test High School",
  "districtName": "Test District",
  "administratorName": "John Doe",
  "email": "test@example.com",
  "totalStudents": 500,
  "currentLunchDebt": "5%"
}
```

#### 2.4 Edge Cases
- [ ] Very long school names handled
- [ ] Special characters in fields
- [ ] Empty strings rejected
- [ ] Negative numbers rejected (for totalStudents)
- [ ] Network errors handled gracefully

---

### 3. Admin Authentication Testing

#### 3.1 Login Page
- [ ] Login page loads at `/admin/login`
- [ ] Form displays correctly
- [ ] Styling matches design
- [ ] Page is responsive

#### 3.2 Login Functionality
- [ ] Login with correct credentials succeeds
- [ ] Redirects to dashboard after successful login
- [ ] Login with incorrect username fails
- [ ] Login with incorrect password fails
- [ ] Error message displays for invalid credentials
- [ ] Loading state shows during login
- [ ] Session cookie is set after login

**Test Credentials:**
- Use credentials from `.env` file

#### 3.3 Session Management
- [ ] Already logged-in users redirected to dashboard
- [ ] Session persists after page refresh
- [ ] Session expires after logout
- [ ] Unauthorized access redirects to login

#### 3.4 Logout Functionality
- [ ] Logout button works
- [ ] Session is cleared after logout
- [ ] Redirects to login page after logout
- [ ] Cannot access dashboard after logout

---

### 4. Admin Dashboard Testing

#### 4.1 Dashboard Access
- [ ] Dashboard loads at `/admin/dashboard`
- [ ] Requires authentication (redirects if not logged in)
- [ ] Displays enrollment count
- [ ] Table layout is correct

#### 4.2 View Enrollments
- [ ] All enrollments display in table
- [ ] Enrollments sorted by date (newest first)
- [ ] All fields display correctly
- [ ] Date formatting is correct
- [ ] Empty state shows when no enrollments
- [ ] Loading state shows while fetching

#### 4.3 Edit Functionality
- [ ] Edit button works
- [ ] Form fields become editable
- [ ] Current values populate in edit mode
- [ ] Save button updates enrollment
- [ ] Cancel button discards changes
- [ ] Validation works in edit mode
- [ ] Success feedback after update
- [ ] Error handling for failed updates

**Test Edit:**
1. Click "Edit" on any enrollment
2. Modify a field
3. Click "Save"
4. Verify changes are saved

#### 4.4 Delete Functionality
- [ ] Delete button works
- [ ] Confirmation dialog appears
- [ ] Enrollment deleted on confirmation
- [ ] Enrollment removed from list
- [ ] Cancel prevents deletion
- [ ] Error handling for failed deletions

**Test Delete:**
1. Click "Delete" on an enrollment
2. Confirm deletion
3. Verify enrollment is removed

---

### 5. API Endpoints Testing

#### 5.1 POST /api/enrollments
**Test with valid data:**
```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "Test School",
    "districtName": "Test District",
    "administratorName": "Test Admin",
    "email": "test@example.com",
    "totalStudents": 500,
    "currentLunchDebt": "5%"
  }'
```

**Expected:** 201 status, enrollment object returned

**Test with invalid data:**
```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "",
    "email": "invalid-email"
  }'
```

**Expected:** 400 status, error message

#### 5.2 GET /api/enrollments
**Test without authentication:**
```bash
curl http://localhost:3000/api/enrollments
```

**Expected:** 401 status, "Unauthorized"

**Test with authentication:**
1. Login via admin panel first
2. Use browser dev tools to copy session cookie
3. Test with cookie:
```bash
curl http://localhost:3000/api/enrollments \
  -H "Cookie: adminSession=your_session_secret"
```

**Expected:** 200 status, enrollments array

#### 5.3 PUT /api/enrollments/[id]
**Test update:**
```bash
curl -X PUT http://localhost:3000/api/enrollments/ENROLLMENT_ID \
  -H "Content-Type: application/json" \
  -H "Cookie: adminSession=your_session_secret" \
  -d '{
    "schoolName": "Updated School",
    "districtName": "Updated District",
    "administratorName": "Updated Admin",
    "email": "updated@example.com",
    "totalStudents": 600,
    "currentLunchDebt": "4%"
  }'
```

**Expected:** 200 status, updated enrollment

#### 5.4 DELETE /api/enrollments/[id]
**Test delete:**
```bash
curl -X DELETE http://localhost:3000/api/enrollments/ENROLLMENT_ID \
  -H "Cookie: adminSession=your_session_secret"
```

**Expected:** 200 status, success message

#### 5.5 POST /api/admin/login
**Test login:**
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your_password"
  }'
```

**Expected:** 200 status, session cookie set

#### 5.6 GET /api/admin/login
**Test auth check:**
```bash
curl http://localhost:3000/api/admin/login \
  -H "Cookie: adminSession=your_session_secret"
```

**Expected:** 200 status, `{"authenticated": true}`

---

### 6. Database Testing

#### 6.1 MongoDB Connection
- [ ] Connection established on app start
- [ ] Connection reused across requests
- [ ] Connection errors handled gracefully
- [ ] Reconnection works after connection loss

#### 6.2 Data Persistence
- [ ] Enrollments saved correctly
- [ ] All fields stored properly
- [ ] Timestamps created automatically
- [ ] Data persists after server restart
- [ ] Updates modify existing records
- [ ] Deletes remove records completely

**Verify in MongoDB:**
```javascript
// Connect to MongoDB
mongosh "your_connection_string"

// Check enrollments collection
use lunch-money
db.enrollments.find().pretty()
```

---

### 7. Error Handling Testing

#### 7.1 Network Errors
- [ ] Handles connection timeouts
- [ ] Handles server errors (500)
- [ ] Displays user-friendly error messages
- [ ] Doesn't expose sensitive information

#### 7.2 Validation Errors
- [ ] Missing fields show appropriate errors
- [ ] Invalid email format shows error
- [ ] Invalid data types rejected
- [ ] Error messages are clear and helpful

#### 7.3 Authentication Errors
- [ ] Unauthorized access shows error
- [ ] Expired sessions handled
- [ ] Invalid credentials show error
- [ ] Redirects work correctly

---

### 8. UI/UX Testing

#### 8.1 Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Forms are usable on all screen sizes
- [ ] Tables are scrollable on mobile

#### 8.2 User Experience
- [ ] Loading states are clear
- [ ] Success messages are visible
- [ ] Error messages are helpful
- [ ] Forms are intuitive
- [ ] Navigation is clear
- [ ] Buttons have proper hover states

#### 8.3 Accessibility
- [ ] Form labels are associated with inputs
- [ ] Buttons have proper text
- [ ] Error messages are accessible
- [ ] Keyboard navigation works
- [ ] Focus states are visible

---

### 9. Security Testing

#### 9.1 Authentication Security
- [ ] Admin credentials not exposed in code
- [ ] Session cookies are HTTP-only
- [ ] Session secrets are secure
- [ ] Passwords not logged or exposed

#### 9.2 API Security
- [ ] Admin routes require authentication
- [ ] Public routes don't expose sensitive data
- [ ] Input validation prevents injection
- [ ] Error messages don't leak information

#### 9.3 Data Security
- [ ] MongoDB connection string is secure
- [ ] Environment variables not committed
- [ ] Sensitive data encrypted in transit

---

### 10. Performance Testing

#### 10.1 Load Testing
- [ ] Form submission is fast (< 2 seconds)
- [ ] Dashboard loads quickly (< 1 second)
- [ ] API responses are fast
- [ ] MongoDB queries are optimized

#### 10.2 Connection Pooling
- [ ] MongoDB connections are reused
- [ ] No connection leaks
- [ ] Handles concurrent requests

---

## Automated Testing (Future)

Consider adding:
- Unit tests for API routes
- Integration tests for database operations
- E2E tests with Playwright/Cypress
- Component tests with React Testing Library

---

## Test Results Template

```
Date: ___________
Tester: ___________

Environment Setup: [ ] Pass [ ] Fail
Enrollment Form: [ ] Pass [ ] Fail
Admin Authentication: [ ] Pass [ ] Fail
Admin Dashboard: [ ] Pass [ ] Fail
API Endpoints: [ ] Pass [ ] Fail
Database: [ ] Pass [ ] Fail
Error Handling: [ ] Pass [ ] Fail
UI/UX: [ ] Pass [ ] Fail
Security: [ ] Pass [ ] Fail
Performance: [ ] Pass [ ] Fail

Notes:
_______________________________________
_______________________________________
```

---

## Quick Test Script

Run this to verify basic functionality:

```bash
# 1. Start the server
npm run dev

# 2. In another terminal, test enrollment submission
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "Quick Test School",
    "districtName": "Test District",
    "administratorName": "Test Admin",
    "email": "quicktest@example.com",
    "totalStudents": 100,
    "currentLunchDebt": "3%"
  }'

# 3. Test admin login (replace with your credentials)
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your_password"
  }'
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:** Check `MONGODB_URI` in `.env` and ensure MongoDB is running

### Issue: Admin Login Not Working
**Solution:** Verify `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in `.env`

### Issue: Form Submission Fails
**Solution:** Check browser console, verify MongoDB connection, check all fields are filled

### Issue: Dashboard Shows No Enrollments
**Solution:** Verify authentication, check MongoDB for data, check API response

---

**Last Updated:** $(date)
