#!/bin/sh

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  >&2 echo "Postgres is not live"
  sleep 1
done

>&2 echo "Postgres up - executing command"
exec $cmd