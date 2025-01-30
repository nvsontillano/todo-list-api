#!/bin/bash

# Function to log response time
log_response_time() {
  local start_time=$1
  local end_time=$2
  local operation=$3
  local duration=$((end_time - start_time))
  echo "$operation took $duration ms"
}

# 1. Create a user
echo "Creating user..."
START_TIME=$(date +%s%3N)  # Capture start time in milliseconds
USER_CREATION_RESPONSE=$(curl --request POST \
  --url http://localhost:3000/auth/signup \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.3.0' \
  --data '{
    "username": "nicole3",
    "email": "nicole3@gmail.com",
    "password": "password123",
    "firstName": "Nicole",
    "lastName": "Test"
  }')

END_TIME=$(date +%s%3N)  # Capture end time
log_response_time $START_TIME $END_TIME "User creation"

# Extract the token from the user creation response
TOKEN=$(echo $USER_CREATION_RESPONSE | jq -r '.data.token')

# Check if token is empty
if [ -z "$TOKEN" ]; then
  echo "Error: Failed to create user or retrieve token"
  exit 1
fi
echo "User created successfully. Token: $TOKEN"

# 2. Create 1 million tasks
echo "Creating 1 million tasks..."
for i in $(seq 1 1000000); do
  START_TIME=$(date +%s%3N)  # Capture start time for task creation
  TASK_RESPONSE=$(curl --request POST \
    --url http://localhost:3000/task \
    --header "Authorization: Bearer $TOKEN" \
    --header 'Content-Type: application/json' \
    --data "{
      \"title\": \"Test task $i\"
    }")

  END_TIME=$(date +%s%3N)  # Capture end time for task creation
  log_response_time $START_TIME $END_TIME "Task creation #$i"

  # Optionally, print out the task ID or title for the first few tasks
  if [ $i -le 10 ]; then
    echo "Task $i created with ID: $(echo $TASK_RESPONSE | jq -r '.data.id')"
  fi
done
echo "1 million tasks created."

# 3. Re-position the first task to be the last task
# Assuming we know the task ID of the first task is 1
echo "Re-positioning the first task to be the last..."
START_TIME=$(date +%s%3N)  # Capture start time for re-positioning
REPOSITION_RESPONSE=$(curl --request PATCH \
  --url http://localhost:3000/task/1/position \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{
    "positionDelta": 999999
  }')

END_TIME=$(date +%s%3N)  # Capture end time for re-positioning
log_response_time $START_TIME $END_TIME "Task re-positioning"

# Check for success
if [[ $(echo $REPOSITION_RESPONSE | jq -r '.status') == "true" ]]; then
  echo "Task re-positioned successfully."
else
  echo "Error: Failed to reposition task"
fi
