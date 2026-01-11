# Deployment Guide

## Environment
- Create `.env` with:
  - MONGO_URI
  - PORT
  - SESSION_SECRET

## Steps (Heroku example)
1. Create app: `heroku create`
2. Add MONGO_URI as config var
3. `git push heroku main`
4. `heroku config:set SESSION_SECRET="<secret>"`

## Docker (optional)
- Add `Dockerfile` and `docker-compose.yml` for local dev and production

## Monitoring
- Use process manager (PM2) or PaaS monitoring
- Add health checks and logs

## Backups
- Regularly export MongoDB data or use Atlas backups
