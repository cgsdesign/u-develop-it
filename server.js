const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
///Express Middle wair
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// .get tet rought to make sure all hookups work .get= rout method, res.json() = response method
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World, I am testing if my hookups and .get  and res.json work. If this shows up, they do!'
    });
  });
  
// Default response for any other requests(Not Found) Catch all
  //IMPORTANT!! This will not work on FIREFOX use Cromeç
app.use((req, res) => {
    res.status(404).end();
  });

//listener to start Express.js (always at bottom)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });