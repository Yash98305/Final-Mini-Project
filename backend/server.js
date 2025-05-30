const { app, server } = require("./index.js"); // Import both app & server
const connectDatabase = require("./database/db.js");

// Handle Uncaught Exceptions (e.g., undefined variables)
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error("Shutting down the server due to an Uncaught Exception...");
    process.exit(1);
});

// Connect to MongoDB
connectDatabase();

// Set the Port
const PORT = process.env.PORT || 8000;

// Start the Server (Already created in index.js)
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Handle Unhandled Promise Rejections (e.g., database errors)
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    console.error("Shutting down the server due to an Unhandled Promise Rejection...");

    server.close(() => {
        process.exit(1);
    });
});