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
npm i
```

### 3. Configure Key Variables
Create a `.env` file in the project root directory with the following keys:
```env
IP_STACK_API_KEY = <your_ipstack_api_key>
IP_QUALITYSCORE_API_KEY = <your_qualityscore_api_key>

```

## Running the Application

### 1. Start the Development Server
Start the backend server using:
```bash
node index.js
```

### 2. Access the Application
Open a browser and navigate to:
```
http://localhost:3000
```

## Testing

### 1. Manual Testing
- Open the application in the browser.
- Test the input functionality by entering valid and invalid IP addresses.
- Verify the displayed data for accuracy and UI responsiveness.

## API Documentation

### Endpoints

#### GET
### **1. GET /**
- **Description**: Serves the main HTML file (`index.html`) from the `public` directory.

### **2. GET /getIPData**
- **Description**: Fetches location details for a given IP address.

### **3. GET /getFraudScore**
- **Description**: Retrieves the fraud score for an IP address.
    
#### API
### **2. IPStack API**
- **Purpose**: Provides geographic location data for an IP address.

### **2. IPQualityScore API**
- **Purpose**: Provides fraud detection scores for an IP address.

## Known Issues
- **Limited API Key Usage**: The IP Stack API and Quality Score have a limited number of free calls.
  - **Workaround**: Implement caching in Supabase to reduce API calls.

## Roadmap For Future Development
- **User Authentication**: Add user login for personalized IP query history.
- **Advanced Visualization**: Use libraries like D3.js for interactive maps.
- **Mobile Optimization**: Improve responsiveness for smaller devices.
- **Multi-Language Support**: Add localization for international users.

## Vercel Deployment Link:
- https://inst377-group-52-7impgqxvs-aprameya-seshachars-projects.vercel.app
---

Documentation for developers is available in the [docs folder](./docs).
