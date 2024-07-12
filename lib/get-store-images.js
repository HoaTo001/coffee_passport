export function getStoreImages(slug) {
    const fs = require('fs'); 
    const path = require('path');

    const imagePaths = []
    console.log(String(slug))
    const filePath = __dirname + "../public/carousel/" + String(slug);
    filenames = fs.readdirSync(filePath);

    filenames.forEach(file => { 
         console.log(file); 
       })

}