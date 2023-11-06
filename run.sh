#!/usr/bin/env bash

cp ./.env.daim ./.env
chmod +x ./env.sh
./env.sh
cp env-config.js ./public/

export DANGEROUSLY_DISABLE_HOST_CHECK=true
npm run dev --host 0.0.0.0 --disable-host-check
