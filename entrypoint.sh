#!/bin/sh

echo "Check that we have NEXT_PUBLIC_CPG_DOMAIN vars"
test -n "$NEXT_PUBLIC_CPG_DOMAIN"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_CPG_DOMAIN#$NEXT_PUBLIC_CPG_DOMAIN#g"

echo "Starting Nextjs"
exec "$@"