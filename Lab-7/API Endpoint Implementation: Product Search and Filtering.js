
// SOLUTION - 1
// const express = require('express');
// const app = express();
// const port = 3000;
// const path = require('path');
// const fs = require('fs');

// app.get('/products', (req, res) => {
//     const dbPath = path.join(__dirname, 'db.json');
//     let allProducts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

//     const { name, minPrice, maxPrice } = req.query;

//     // Validate minPrice
//     if (minPrice !== undefined && isNaN(Number(minPrice))) return res.status(400).json({ error: "Invalid minPrice" });
    

//     // Validate maxPrice
//     if (maxPrice !== undefined && isNaN(Number(maxPrice))) return res.status(400).json({ error: "Invalid maxPrice" });
    

//     const min = Number(minPrice) 
//     const max = Number(maxPrice)

//     // Validate price range
//     if (min > max) {
//         return res.status(400).json({
//             error: "minPrice cannot be greater than maxPrice"
//         });
//     }

//     // Apply filters
//     const filteredProducts = allProducts.filter(product => {
//         // Name filter
//         if (
//             name !== undefined &&
//             !product.name.toLowerCase().includes(name.toLowerCase())
//         ) {
//             return false;
//         }

//         // Minimum price filter
//         if (min !== undefined && product.price < min) {
//             return false;
//         }

//         // Maximum price filter
//         if (max !== undefined && product.price > max) {
//             return false;
//         }

//         return true;
//     });

//     res.json(filteredProducts);
// });

// app.listen(port, () => {
//     console.log(`Product API listening at http://localhost:${port}`);
// });

// module.exports = { app };

// SOLUTION - 2
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.get('/products', (req, res) => {

    const dbPath = path.join(__dirname, 'db.json');
    let allProducts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
 

   const { name, minPrice, maxPrice } = req.query;

    // 1. Check if minPrice is greater than maxPrice, and if so, return an error immediately
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });
    }

    // 2. Filter by name if 'name' query parameter exists
    if (name) {
        const searchTerm = name.toLowerCase();
        allProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }

    // 3. Filter by minPrice if 'minPrice' query parameter exists
    if (minPrice) {
        const min = Number(minPrice);
        if (!isNaN(min)) {
            allProducts = allProducts.filter(product => product.price >= min);
        } else {
            return res.status(400).json({ error: "Invalid minPrice" });
        }
    }

    // 4. Filter by maxPrice if 'maxPrice' query parameter exists
    if (maxPrice) {
        const max = Number(maxPrice);
        if (!isNaN(max)) {
            allProducts = allProducts.filter(product => product.price <= max);
        } else {
            return res.status(400).json({ error: "Invalid maxPrice" });
        }
    }


      res.json(allProducts);
    

});

app.listen(port, () => {
    console.log(`Product API listening at http://localhost:${port}`);
});

module.exports = { app };

