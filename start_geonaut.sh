#!/bin/bash
set -e

# Navigate to the app directory
cd /var/www/geonaut/nextjs-2

# Load NVM and Node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# Run Next.js
echo "Starting Geonaut on Port 3003..."
exec npm run start -- -p 3003