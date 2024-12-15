# Developer Manual: GeoFence Security IP Address Locator

## System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 14 or above
- **MySQL**: Version 8 or above
- **Web Browser**: Any modern browser (e.g., Google Chrome, Firefox, Microsoft Edge)

## Setup Instructions

### 1. Clone the Repository
```
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Ensure Node.js is installed, then run:
```
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory with the following keys:
```
IP_STACK_API_KEY=<your_ipstack_api_key>
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
```

### 4. Set Up the Database
Create a MySQL database named `geofence`. Use the following SQL script to set up the necessary table structure:
```
CREATE DATABASE geofence;
USE geofence;

CREATE TABLE ip_query_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    risk_level VARCHAR(50),
    query_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

### 1. Start the Development Server
Start the backend server using:
```
node server.js
```

### 2. Access the Application
Open a browser and navigate to:
```
http://localhost:3000
```

## Testing the Application

### 1. Run Unit Tests
If unit tests are written, use a testing framework like Mocha or Jest:
```
npm test
```

### 2. Manual Testing
- **Input Testing**: Open the application in the browser. Test the input functionality by entering valid and invalid IP addresses.
- **Response Accuracy**: Verify the geographical and risk data displayed matches the expected results for specific IP addresses.
- **UI Behavior**:
  - Input fields should accept valid IP addresses.
  - Proper error messages should display for invalid inputs.
  - Ensure responsiveness across different devices and screen sizes.

## API Documentation

### Endpoints

#### `/lookup`
- **Method**: POST
- **Description**: Accepts an IP address and returns geographical data and risk information.
- **Request Body**:
  ```json
  {
    "ip_address": "192.168.1.1"
  }
  ```
- **Response**:
  ```json
  {
    "ip_address": "192.168.1.1",
    "country": "United States",
    "region": "California",
    "city": "San Francisco",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "risk_level": "Low"
  }
  ```

#### `/logs`
- **Method**: GET
- **Description**: Retrieves a list of past IP queries from the database.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "ip_address": "192.168.1.1",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "query_time": "2024-12-15T10:00:00Z"
    }
  ]
  ```

## Known Issues and Roadmap

### Known Issues
1. **Limited API Key Usage**: IP Stack API has a limited number of free calls.
   - **Temporary Fix**: Use caching in MySQL to reduce API calls.
2. **Error Handling**: The application doesn't provide detailed error messages for invalid IP addresses or network errors.
   - **Fix in Progress**: Enhance error handling on both frontend and backend.

### Roadmap
- **User Authentication**: Add user login to track and personalize IP query history.
- **Enhanced Visualization**: Use advanced libraries like D3.js for more interactive maps.
- **Mobile Optimization**: Improve responsiveness for smaller devices.
- **Multi-Language Support**: Add localization for international users.

