# 🚀 Official Backend Deployment Guide

This guide is for **maintainers only** who manage the official backend at `https://figma-slack-bridge.vercel.app`.

End users don't need this - they use the official backend automatically.

---

## 📋 Pre-Deployment Checklist

### 1. Vercel Project Setup

**Project Configuration:**
- ✅ Project name: `figma-slack-bridge`
- ✅ Framework: Other (Serverless Functions)
- ✅ Root directory: `figma-slack-bridge`
- ✅ Production branch: `main` (or `master`)
- ✅ Auto-deploy enabled on push

### 2. Environment Variables

**Required in Vercel Dashboard:**

```bash
CLICKUP_CLIENT_ID=<your_official_clickup_client_id>
CLICKUP_CLIENT_SECRET=<your_official_clickup_client_secret>
CLICKUP_REDIRECT_URI=https://figma-slack-bridge.vercel.app/api/clickup-callback
```

**How to set:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `figma-slack-bridge` project
3. Go to **Settings → Environment Variables**
4. Add each variable for **Production**, **Preview**, and **Development**

### 3. ClickUp OAuth App Configuration

The official ClickUp OAuth app must be configured with:

**App Settings:**
- **App Name**: Figma to Slack Notifier (Official)
- **Description**: Official plugin for connecting Figma designs with ClickUp tasks and Slack notifications
- **Redirect URIs**:
  - `https://figma-slack-bridge.vercel.app/api/clickup-callback` (Production)
  - `http://localhost:3000/api/clickup-callback` (Development, optional)

**Permissions/Scopes:**
- `task:read` - Read task information
- `task:write` - Update task custom fields
- `team:read` - Read workspace information
- `list:read` - Read lists and folders

**Where to configure:**
[ClickUp Settings → Apps](https://app.clickup.com/settings/apps)

### 4. Domain Configuration

**Production URL:** `https://figma-slack-bridge.vercel.app`

**Verify:**
- ✅ HTTPS enabled (Vercel handles this)
- ✅ Domain is accessible publicly
- ✅ CORS headers allow all origins (`*`)
- ✅ No rate limiting on Vercel's side

---

## 🔍 Verification Steps

After deployment, verify all endpoints are working:

### Test Endpoints

```bash
# 1. Health check (send-to-slack accepts POST, will return 405 for GET)
curl https://figma-slack-bridge.vercel.app/api/send-to-slack

# 2. ClickUp authorization URL generator
curl https://figma-slack-bridge.vercel.app/api/clickup-authorize

# 3. Slack users endpoint (requires POST with token)
curl -X POST https://figma-slack-bridge.vercel.app/api/fetch-slack-users \
  -H "Content-Type: application/json" \
  -d '{"token":"xoxb-test"}'
```

### Expected Responses

All endpoints should return:
- ✅ CORS headers present
- ✅ JSON responses
- ✅ Proper error messages (not 500s for valid requests)

---

## 🔄 Deployment Process

### Automatic Deployment

The backend auto-deploys when you push to the production branch:

```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
git push origin main  # or master

# Vercel automatically:
# 1. Detects the push
# 2. Builds the project
# 3. Deploys to production
# 4. Runs health checks
```

**Monitor deployment:**
- Vercel Dashboard: https://vercel.com/dashboard
- Deployment logs show build status
- Check for any errors in the logs

### Manual Deployment

If you need to manually trigger a deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
cd figma-slack-bridge
vercel --prod
```

---

## 📊 Monitoring & Maintenance

### 1. Check Logs Regularly

**Where to check:**
- Vercel Dashboard → Your Project → Logs
- Filter by time period and function

**What to look for:**
- ❌ 500 errors (server errors)
- ❌ ClickUp API errors (rate limits, auth failures)
- ❌ Unusual traffic patterns
- ✅ Normal 200/400 responses

### 2. Rate Limiting

**ClickUp API limits:**
- 100 requests per minute per workspace
- 10,000 requests per hour per workspace

**Vercel limits (Hobby plan):**
- 100GB bandwidth per month
- 100,000 function invocations per day
- 10 seconds max function duration

**If you hit limits:**
- Upgrade Vercel plan
- Contact ClickUp for increased limits
- Implement request caching (if needed)

### 3. Security Audits

**Monthly checks:**
- [ ] Review Vercel logs for suspicious activity
- [ ] Check ClickUp OAuth app for unauthorized access
- [ ] Verify environment variables are still valid
- [ ] Test all endpoints for proper error handling
- [ ] Review CORS configuration

### 4. Dependency Updates

**Quarterly:**
```bash
cd figma-slack-bridge
npm outdated
npm update
npm audit fix
```

**Test after updates:**
- Deploy to preview environment first
- Test all OAuth flows
- Verify API endpoints still work
- Then deploy to production

---

## 🚨 Incident Response

### Backend is Down

1. **Check Vercel Status:**
   - Visit [Vercel Status](https://www.vercel-status.com/)
   - Check if there's a platform-wide incident

2. **Check Recent Deployments:**
   - Vercel Dashboard → Deployments
   - Rollback to last known good deployment if needed

3. **Verify Environment Variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Ensure all required variables are set

4. **Check Function Logs:**
   - Look for errors in Vercel logs
   - Identify which endpoint is failing

### ClickUp OAuth Not Working

1. **Verify OAuth App Settings:**
   - Check redirect URI matches exactly
   - Verify Client ID and Secret are correct
   - Ensure app is not disabled/deleted

2. **Check Environment Variables:**
   - `CLICKUP_CLIENT_ID` is set
   - `CLICKUP_CLIENT_SECRET` is set
   - `CLICKUP_REDIRECT_URI` matches production URL

3. **Test OAuth Flow Manually:**
   - Get auth URL from `/api/clickup-authorize`
   - Complete authorization in browser
   - Check callback endpoint receives code

### High Error Rate

1. **Identify Error Type:**
   - 400 errors: Client-side issues (bad requests)
   - 401 errors: Authentication failures
   - 500 errors: Server-side issues

2. **Check Logs for Patterns:**
   - Which endpoint is failing?
   - What's the error message?
   - Is it affecting all users or specific ones?

3. **Mitigate:**
   - If server error: Rollback deployment
   - If ClickUp error: Check API status
   - If rate limit: Implement backoff or upgrade plan

---

## 🔐 Security Best Practices

### 1. Secret Management

**Never commit secrets to Git:**
- ❌ Don't put Client ID/Secret in code
- ❌ Don't put them in `.env` files that get committed
- ✅ Always use Vercel environment variables
- ✅ Use different secrets for development/production

### 2. Access Control

**Vercel Project Access:**
- Limit team members who can deploy
- Use 2FA on Vercel account
- Review access logs regularly

**ClickUp OAuth App:**
- Keep Client Secret secure
- Don't share in Slack/email/docs
- Rotate secrets if compromised

### 3. CORS Configuration

**Current setting:** `Access-Control-Allow-Origin: *`

**Why this is safe:**
- Users' tokens are never exposed to other users
- Backend is stateless (no shared state)
- Each request validates tokens independently
- Required for Figma plugins (run in sandboxed environment)

### 4. Token Handling

**Best practices:**
- ✅ Tokens passed in request bodies (not URLs)
- ✅ Tokens stored client-side (Figma encrypted storage)
- ✅ Never log tokens in server logs
- ✅ Never store tokens on backend

---

## 📈 Scaling Considerations

### When to Scale Up

**Indicators you need to upgrade:**
- Hitting Vercel's invocation limits (100k/day on Hobby)
- Hitting bandwidth limits (100GB/month)
- High latency (>3s average response time)
- Users reporting rate limit errors

### Upgrade Path

1. **Vercel Pro Plan** ($20/month):
   - 1TB bandwidth
   - 1M function invocations/month
   - 100s max function duration
   - Team collaboration features

2. **Add Caching** (if needed):
   - Cache ClickUp workspace/folder data
   - Cache Slack channels/users (they rarely change)
   - Use Vercel Edge Config or Redis

3. **Optimize Functions:**
   - Reduce cold start time
   - Implement request batching
   - Add connection pooling

---

## 📞 Support Contacts

**Vercel Support:**
- Dashboard: https://vercel.com/support
- Email: support@vercel.com

**ClickUp Support:**
- API Docs: https://clickup.com/api
- Developer Support: developers@clickup.com

**Plugin Issues:**
- GitHub Issues: [Your repo]/issues
- Maintainer: [Your email]

---

## 🎯 Production Checklist

Before declaring the backend "production-ready":

- [ ] All environment variables set in Vercel
- [ ] ClickUp OAuth app configured with correct redirect URI
- [ ] All API endpoints tested and working
- [ ] CORS headers verified on all endpoints
- [ ] Error handling tested (bad tokens, rate limits, etc.)
- [ ] Logs reviewed - no unexpected errors
- [ ] Monitoring/alerting set up (optional but recommended)
- [ ] Documentation updated (README, CONTRIBUTING, etc.)
- [ ] Plugin tested end-to-end with production backend
- [ ] Rollback plan in place

---

## 🔄 Rollback Procedure

If a deployment causes issues:

1. **Immediate rollback via Vercel Dashboard:**
   - Go to Deployments
   - Find the last working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI:**
   ```bash
   vercel rollback [deployment-url]
   ```

3. **Verify rollback:**
   - Test affected endpoints
   - Check logs for continued errors
   - Notify users if needed

---

**Last Updated:** 2025-01-28

**Maintainer:** [Your name/team]

**Production URL:** https://figma-slack-bridge.vercel.app
