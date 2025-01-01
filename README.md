# To-Do-list-app
To-Do-List App is a simple server-less web application designed to manage to-do list items using AWS cloud services. It leverages a serverless architecture with AWS Lambda, API Gateway, and DynamoDB to provide a scalable, cost-effective solution for handling to-do tasks in the cloud. The application supports basic CRUD operations (Create, Read, Update, Delete) on to-do items and is accessible via a RESTful API.

## Key Features:

Serverless Architecture: No server management required. AWS Lambda functions handle all backend logic.

CRUD Operations: Users can create, read, update, and delete to-do list items.

API Gateway: Exposes the Lambda functions as RESTful APIs for easy interaction with the frontend.

Data Storage: To-do items are stored in AWS DynamoDB, a managed NoSQL database service, ensuring fast and scalable data access.

Frontend: The frontend is a simple web-based UI, built with HTML, JavaScript, and CSS, allowing users to interact with the backend via API calls.

Scalability: Leveraging AWS services means the application can scale automatically based on demand, without the need for manual intervention.

## Benefits:

Serverless: Eliminates the need to provision or manage servers, reducing operational overhead.

Cost-effective: Pay only for what you use. No charges when the system is idle.

Highly Available: AWS services are designed for high availability and durability, ensuring the app remains available and responsive.

Easy to Deploy: The app can be deployed using the Serverless Framework, making deployment and management easier and more efficient.

