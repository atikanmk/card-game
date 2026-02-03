# Deploy to Render - One-Click Configuration

## Backend Service
```yaml
services:
  - type: web
    name: card-game-server
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: ALLOWED_ORIGINS
        sync: false
```

## Frontend Service
```yaml
services:
  - type: web
    name: card-game-client
    env: static
    buildCommand: cd client && npm install && REACT_APP_SOCKET_URL=$BACKEND_URL npm run build
    staticPublishPath: client/build
```

## Steps:
1. Click "New Web Service" on Render
2. Connect your GitHub repository
3. Use the configuration above
4. Set ALLOWED_ORIGINS to match your frontend URL
5. Set REACT_APP_SOCKET_URL in frontend to match your backend URL
