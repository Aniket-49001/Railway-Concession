# Test Plan

## Unit Tests
- User model: validation, password hashing
- Application model: status transitions, document list

## Integration Tests
- Register -> Login -> Submit Application -> Admin Approve -> Railway View
- Test role-based routes return 403 for unauthorized access

## E2E Tests
- Simulate student signing up and submitting application (use headless browser)
- Simulate admin login and approving an application

## Test Tools
- Jest for unit/integration tests
- Supertest for API testing
- Playwright or Cypress for E2E

## CI
- Run tests in GitHub Actions on push/PR
- Fail PR if tests fail
