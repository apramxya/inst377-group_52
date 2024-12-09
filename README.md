## GeoFence Security IP Address Locator
## Project Description
GeoFence Security IP Address Locator is a web application designed to enhance cybersecurity and user analytics for GeoFence Security, an imaginary company specializing in cybersecurity solutions and geo-targeted insights. This tool allows users to input an IP address and retrieve detailed geographical data and associated security risk levels in real time. The application provides a user-friendly interface for both security teams and marketing teams to access critical location-based data.
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
Import the database schema (if available) or create a table structure to store IP query logs.
