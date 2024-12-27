🚴‍♂️ Bike-Store: A Comprehensive Bike and Order Management Backend
This project is a modern backend solution for managing bikes and orders, built with Node.js, Express, TypeScript, MongoDB, and Mongoose. It’s designed to streamline bike inventory and order operations while ensuring robust functionality and an intuitive experience for users.

🌟 Key Features
Effortless Bike Management

🚀 Create a New Bike: Add bike details and store them in the database with ease.
🔍 Advanced Search Functionality: Search for bikes by name, brand, or category for quick access.
📋 Retrieve Specific Bike Data: Fetch detailed information for any bike in the inventory.
✏️ Update Bike Information: Modify existing bike data to keep your inventory up-to-date.
🗑️ Delete Bikes: Remove outdated or unavailable bike information when necessary.
Seamless Order Management

🛒 Place an Order: Users can place orders for any available bike with automatic stock adjustments.
📈 Revenue Tracking: Calculate the total revenue generated from all bike orders in real time.
Reliable Backend Architecture

Powered by TypeScript for type safety and scalability.
Uses MongoDB and Mongoose for seamless database operations.

LIVE VERCEL LINK :https://bikestorebackend.vercel.app/


Bike Store SetUp PREREquisits: 
1.install npm package 
2.SetUp mongodb
3.setup typeScript and node version with express


Test API endpoints
Create Bike: api/products
Get all Bikes: api/products/searchTerm=<term>
get SPecefic bike: api/products/:productId
update bike:api/products/:productId
delete bike:api/products/:productId
orderbike:api/orders
getREvenue:api/orders/revenue
