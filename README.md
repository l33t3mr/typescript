# ./Doc
- Documentation of the models and their relations
- JSON collection for POSTMAN that can be imported

# Use Cases
- There are three types of users: `prof`, `student` and `tutor`
- All users are allowed to upload materials (Only PDF)
- All users can see the courses they're registered into (in case of prof, courses created by prof) and can see all courses on the platform
- Only `prof` can create or delete a course
- Deleting a `prof` deletes all related courses and materials created by that prof
- Deleting a `student` removes student from courses and deltes materials created by student
- A `student` can register/unregister course
- You can see materials belonging to course by opening it
- You can manage your own materials directly

# Development
- For development use the command `docker-compose up -f docker-compose-dev.yaml up -d`

- Database is initialized with some data to test.
    - Login with Users in the DB:
        - email: max@muster.com
            - password: test
            - role: prof
        - email: paula@muster.com
            - password: test
            - role: student
        
# Testing
## Make sure `node_module` and `dist` folders are removed before running the commands
- For testing:
    - If you're on Linux/Mac, run `start.sh`
    - If you're on windows:
    ```
    docker-compose up -d
    cd frontend
    npm install
    npm start
    ```
- Database is initialized with some data to test.
    - Login with Users in the DB:
        - email: max@muster.com
            - password: test
            - role: prof
        - email: paula@muster.com
            - password: test
            - role: student
