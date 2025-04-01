#!/bin/sh

if [ "$DEVELOPMENT_MODE" = "true" ]; then
    echo "-- Running Next in development mode"
    npm run dev
else
    echo "-- Running Next in production mode"
    npm run start
fi