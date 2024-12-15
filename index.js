const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// API keys
const IPSTACK_API_KEY = "5fcc6e30d326f1a4c65bc34082c99eae";
const IP_QUALITYSCORE_API_KEY = "ZFdPCNJxEToPwn6INfbMI4nwPFaJToMl";

// Supabase Configuration
const SUPABASE_URL = "https://vlkynsbtdiubxpancxnw.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3luc2J0ZGl1YnhwYW5jeG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDM4NjcsImV4cCI6MjA0ODkxOTg2N30.0mu_4oKl-ab-EwL4r51NvVcL7ybczVU9Gl28C6VsQOc";
const SUPABASE_TABLE = "fraud_scores";

app.use(express.json());

app.use(express.static(__dirname + "/public"));

// IP lookup function using IPStack API
async function ipLookUp(ip) {
    try {
        const response = await axios.get(
            `http://api.ipstack.com/${ip}?access_key=${IPSTACK_API_KEY}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching location data: " + error.message);
    }
}

// IP fraud check function using IPQualityScore API
async function ipSafety(ip) {
    try {
        const response = await axios.get(
            `https://ipqualityscore.com/api/json/ip/${IP_QUALITYSCORE_API_KEY}/${ip}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching fraud data: " + error.message);
    }
}

// Function to query Supabase for fraud score
async function getFraudScoreFromSupabase(ip) {
    try {
        const response = await axios.get(
            `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`,
            {
                headers: {
                    apiKey: SUPABASE_API_KEY,
                    Authorization: `${SUPABASE_API_KEY}`,
                },
                params: {
                    ip: `eq.${ip}`,
                    select: "fraud_score",
                },
            }
        );
        return response.data.length > 0 ? response.data[0].fraud_score : null;
    } catch (error) {
        console.error("Error querying Supabase:", error.message);
        return null;
    }
}

// Function to store fraud score in Supabase
async function storeFraudScoreInSupabase(ip, fraudScore) {
    try {
        await axios.post(
            `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`,
            { ip, fraud_score: fraudScore },
            {
                headers: {
                    apiKey: SUPABASE_API_KEY,
                    Authorization: `${SUPABASE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Fraud score successfully stored in Supabase.");
    } catch (error) {
        console.error("Error storing fraud score in Supabase:", error.message);
    }
}

// Default
app.get("/", (req, res) => {
    res.sendFile("public/index.html", { root: __dirname });
});

// Endpoint to get location data
app.get("/getIPData", async (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        const locationData = await ipLookUp(ip);
        res.json(locationData);
    } catch (error) {
        console.error("Error in /getIPData:", error.message);
        res.status(500).json({
            error: "An error occurred while fetching IP data.",
        });
    }
});

// Endpoint to get fraud score for an IP
app.get("/getFraudScore", async (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        // Check Supabase for fraud score
        let fraudScore = await getFraudScoreFromSupabase(ip);

        if (fraudScore !== null) {
            console.log(`Fraud score for IP ${ip} retrieved from Supabase.`);
            return res.json({ ip, fraud_score: fraudScore, source: "cache" });
        }

        // Fetch from API if not in Supabase
        console.log(
            `Fraud score for IP ${ip} not found in Supabase. Fetching from API...`
        );
        const fraudData = await ipSafety(ip);

        if (fraudData && fraudData.fraud_score !== undefined) {
            fraudScore = fraudData.fraud_score;

            // Store in Supabase for future use
            await storeFraudScoreInSupabase(ip, fraudScore);

            return res.json({ ip, fraud_score: fraudScore, source: "api" });
        } else {
            return res
                .status(500)
                .json({ error: "Unable to fetch fraud score from API." });
        }
    } catch (error) {
        console.error("Error in /getFraudScore:", error.message);
        return res
            .status(500)
            .json({ error: "An error occurred while fetching fraud score." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
