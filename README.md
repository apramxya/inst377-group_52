# GeoFence Security IP Address Locator

## Project Title
GeoFence Security IP Address Locator

## Project Description
GeoFence Security IP Address Locator is a web application designed to enhance cybersecurity and user analytics for GeoFence Security, an imaginary company specializing in cybersecurity solutions and geo-targeted insights. This tool allows users to input an IP address and retrieve detailed geographical data and associated security risk levels in real-time. The application provides a user-friendly interface for security and marketing teams to access critical location-based data.

## Target Browsers
- Google Chrome
- Firefox
- Microsoft Edge

## Link to Developer Manual
The Developer Manual can be found in [Developer Manual](#developer-manual)..

---

# Developer Manual

## System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 14 or above
- **MySQL**: Version 8 or above
- **Web Browser**: Any modern browser

## Installation Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Ensure Node.js is installed, then run:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root directory with the following keys:
```env
IP_STACK_API_KEY=<your_ipstack_api_key>
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
```

### 4. Set Up the Database
Create a MySQL database named `geofence` and set up the required tables. Use the following SQL script:
```sql
CREATE DATABASE geofence;
USE geofence;

CREATE TABLE ip_query_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    risk_level VARCHAR(50),
    query_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

### 1. Start the Development Server
Start the backend server using:
```bash
node server.js
```

### 2. Access the Application
Open a browser and navigate to:
```
http://localhost:3000
```

## Testing

### 1. Run Unit Tests
If unit tests are available, run them using a testing framework like Mocha or Jest:
```bash
npm test
```

### 2. Manual Testing
- Open the application in the browser.
- Test the input functionality by entering valid and invalid IP addresses.
- Verify the displayed data for accuracy and UI responsiveness.

## API Documentation

### Endpoints

#### GET /api/ip/:ipAddress
- **Description**: Retrieves geographical and security risk data for a given IP address.
- **Parameters**: `ipAddress` - The IP address to query.
- **Response**:
  ```json
  {
    "ip_address": "8.8.8.8",
    "country": "United States",
    "region": "California",
    "city": "Mountain View",
    "latitude": 37.386,
    "longitude": -122.0838,
    "risk_level": "Low"
  }
  ```

#### POST /api/ip/log
- **Description**: Logs an IP query to the database.
- **Request Body**:
  ```json
  {
    "ip_address": "8.8.8.8",
    "country": "United States",
    "region": "California",
    "city": "Mountain View",
    "latitude": 37.386,
    "longitude": -122.0838,
    "risk_level": "Low"
  }
  ```
- **Response**: Success or error message.

## Known Issues
- **Limited API Key Usage**: The IP Stack API has a limited number of free calls.
  - **Workaround**: Implement caching in MySQL to reduce API calls.
- **Error Handling**: Limited error messages for invalid IP addresses or network issues.
  - **Planned Improvement**: Enhance error handling in the frontend and backend.

## Roadmap
- **User Authentication**: Add user login for personalized IP query history.
- **Advanced Visualization**: Use libraries like D3.js for interactive maps.
- **Mobile Optimization**: Improve responsiveness for smaller devices.
- **Multi-Language Support**: Add localization for international users.

## Vercel Deployment Link:
- https://inst377-group-52-7impgqxvs-aprameya-seshachars-projects.vercel.app
---

Documentation for developers is available in the [docs folder](./docs).
