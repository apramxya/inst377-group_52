## GeoFence Security IP Address Locator
## Project Description
GeoFence Security IP Address Locator is a web application designed to enhance cybersecurity and user analytics for GeoFence Security, an imaginary company specializing in cybersecurity solutions and geo-targeted insights. This tool lets users input an IP address and retrieve detailed geographical data and associated security risk levels in real-time. The application provides a user-friendly interface for security and marketing teams to access critical location-based data.
## Description of target browsers (iOS? Android? Which ones?)
Google Chrome
# GeoFence Security - Developer Manual

## System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 14 or above
- **MySQL**: Version 8 or above
- **Web Browser**: Any modern browser (e.g., Google Chrome, Firefox, Microsoft Edge)

---

## Installation Guide

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
Create a .env file in the project root directory with the following keys:
```
IP_STACK_API_KEY=<your_ipstack_api_key
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
```
### 4. Set Up the Database
Create a MySQL database named geofence.
Import the database schema (if available) or create a table structure to store IP query logs. You can use the following SQL script to set up the necessary tables:
'''
CREATE DATABASE geofence;
USE geofence;

CREATE TABLE ip_query_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR  (100),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10, 7),
    risk_level VARCHAR(50),
    query_time TIMESTAMP DEFAULT CURRENT _TIMESTAMP
);

'''

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
Open the application in the browser.
Test the input functionality by entering valid and invalid IP addresses.
Verify the response accuracy by checking if the geographical and rok data displayed matches the expected results for a given IP address. For UI behavior, ensure that input fields accept valid IP addresses, display error messages for invalid inputs, and maintain responsiveness.

## Known Issues and Roadmap
### Known Issues
1. Limited API Key Usage: IP Stack API has a limited number of free calls.
- **Temporary Fix: Use caching in MySQL to reduce API calls.**
2. Error Handling: The application doesn't provide detailed error messages for invalid IP addresses or network errors.
- **Fix in Progress: Enhance error handling on both frontend and backend.**

### Roadmap
- **User Authentication: Add user login to track and personalize IP query history.**
- **Enhanced Visualization: Use advanced libraries like D3.js for more interactive maps.**
- **Mobile Optimization: Improve responsiveness for smaller devices.**
- **Multi-Language Support: Add localization for international users.**

## API Documentation
```
/docs              - Documentation folder (developer manual and related files)
/index.html        - Main HTML file
/about.html        - About page
/help.html         - Help page
/styles.css        - CSS styles for the application
/scripts.js        - JavaScript logic (API integration)
/server.js         - Backend server (if applicable)
/.env              - Environment variables file
```



