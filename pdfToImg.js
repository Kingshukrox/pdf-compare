//commonJS module imports
const fs = require("fs").promises;
const pdf2img = require('pdf-img-convert');
const prompt=require("prompt-sync")();
//ES6 imports
// import PromptSync from "prompt-sync";
// import * as fs from "fs";
// import pdf2img from "pdf-img-convert"

const pdf1=prompt("Enter 1st/original pdf name...     ");
const pdf2=prompt("Enter 2nd pdf name...     ");



//async implementation

// width or height control the scale of the output images - One or the other, it ignores height if width is supplied too.
// page_numbers controls which pages are rendered - pages are 1-indexed.
// base64 should be set to true if a base64-encoded image output is required. Otherwise it'll just output an array of Uint8Arrays.
// scale is the viewport scale ratio, which defaults to 1 (original width and height).
const config = {
    // width: 100, //Number in px
    // height: 100, // Number in px
    page_numbers: [1], // A list of pages to render instead of all of them eg- [1,2,3]
    // base64: True,
    // scale: 2.0,
};
var counter=1; //used for naming output temp files
async function createImg(pdfName) {
    pdfArray = await pdf2img.convert(`input/${pdfName}.pdf`,config);
    for (i = 0; i < pdfArray.length; i++) {
        fs.writeFile(`temp/temp${counter}.png`, pdfArray[i], function (error) {
            if (error) {
                console.error("Error: " + error);
            }
        });
        counter++;
    }
}

//calling createImg Fn to create pdf->png of the pdf filename passed
createImg(pdf1);
createImg(pdf2);


//sync implementation
// var outputImage1 = pdf2img.convert(`input/${pdf1}.pdf`);
// var outputImage2 = pdf2img.convert(`input/${pdf2}.pdf`);

// From here, the images can be used for other stuff or just saved if that's required:

// outputImage1.then(function (outputImages) {
//     for (i = 0; i < outputImages.length; i++){
//         fs.writeFile("input/temp1.png", outputImages[i], function (error) {
//             if (error) {
//                 console.error("Error: " + error);
//             }
//         });}
// });
// outputImage2.then(function (outputImages) {
//     for (i = 0; i < outputImages.length; i++){
//         fs.writeFile("input/temp2.png", outputImages[i], function (error) {
//             if (error) {
//                 console.error("Error: " + error);
//             }
//         });}
// });