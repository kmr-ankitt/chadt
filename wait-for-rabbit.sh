#!/bin/sh

echo "Waiting for RabbitMQ to be ready..."

until (echo > /dev/tcp/rabbitmq/5672) >/dev/null 2>&1; do
  echo "RabbitMQ not available yet. Retrying..."
  sleep 2
done

echo "RabbitMQ is up - starting app"
exec "$@"
