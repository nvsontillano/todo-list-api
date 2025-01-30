# TODO API

This is an Express.js-based API for managing users and tasks, with user authentication, task creation, updates, deletion, and more.

## Prerequisites
1. NodeJS (v18)
2. npm (v10)

## Setup
1. Clone this repository:
```shell
git clone https://github.com/nvsontillano/todo-list-api
cd todo-list-api
```
2. Install dependencies:
```shell
npm install
```
3. Run the development server:
```shell
npm start
```

## Data Model

### User

| Column     | Type      | Constraints                     | Description                      |
|------------|-----------|---------------------------------|----------------------------------|
| id         | Integer   | Primary Key, Auto-increment     | Unique identifier                |
| username   | String    | Non-nullable                    | User's login username            |
| password   | String    | Hashed, Non-nullable            | User's hashed password           |
| email      | String    | Unique, Non-nullable            | User's email address             |
| firstName  | String    | Nullable                        | User's first name                |
| lastName   | String    | Nullable                        | User's last name                 |
| createdAt  | DateTime  | Auto-generated                  | Timestamp of record creation     |
| updatedAt  | DateTime  | Auto-generated                  | Timestamp of last update         |
| deletedAt  | DateTime  | Nullable                        | Soft delete timestamp            |

### Task

| Column      | Type      | Constraints                 | Description                      |
|-------------|-----------|-----------------------------|----------------------------------|
| id          | Integer   | Primary Key, Auto-increment | Unique identifier                |
| title       | String    | Non-nullable                | Task title                       |
| description | String    | Nullable                    | Optional description of the task |
| position    | Integer   | Non-nullable                | Order of task in the list        |
| isDone      | Boolean   | Non-nullable                | Completion status of the task    |
| createdAt   | DateTime  | Auto-generated              | Timestamp of record creation     |
| updatedAt   | DateTime  | Auto-generated              | Timestamp of last update         |
| deletedAt   | DateTime  | Nullable                    | Soft delete timestamp            |


## Improvements

Here are some potential enhancements to the API:

### Endpoints

#### Authentication

**POST /auth/signup**  
Registers a user. Requires username, password, and other details.  
_Response:_ Access token for subsequent authenticated requests.

**POST /auth/login**  
Logs in a user. Requires username and password.  
_Response:_ Access token for subsequent authenticated requests.

#### Tasks

**POST /task**  
Creates a task. By default:
- `isDone` is set to false.
- `position` is computed automatically as the last in the list.  
_Response:_ Returns the newly created task.

**GET /task**  
Retrieves all tasks for the logged-in user, including done and deleted tasks.

**PATCH /task/:taskId**  
Updates the details of a specific task.  
- Only tasks owned by the logged-in user can be updated.  
_Response:_ Returns the updated task.

**PATCH /task/:taskId/position**  
Reorders a task. Requires a position shift (e.g., 2 for moving down 2 positions, -2 for moving up).  
_Response:_ Updates the task's position and reorders other tasks as necessary.

**DELETE /task/:taskId**  
Soft deletes a task. The task remains in the database but is marked as deleted.

### Improvements

1. **Automated Tests**  
    Adding unit, integration, and E2E tests ensures functionality remains intact during development.  
    _Example:_ Use Jest for comprehensive testing.

2. **Pagination**  
    Implement pagination for the `GET /task` endpoint.  
    - Fetching large numbers of tasks may lead to performance issues (e.g., memory overload).
    - Pagination improves scalability and flexibility for clients.

3. **User Management Endpoints**  
    Add endpoints for updating user details:
    - Change username, password, or other details.
    - Enhance user experience by allowing better profile management.

4. **Caching**  
    Introduce a caching layer (e.g., Redis) to reduce database load for frequently requested data.  
    - Monitor traffic to identify which data is worth caching.

5. **Rate Limiting**  
    Prevent abuse by limiting requests to certain endpoints.  
    _Example:_ Apply rate limits to `/auth/login` to reduce brute-force attacks.  
    Use libraries like `express-rate-limit`.
