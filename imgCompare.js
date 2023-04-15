//importing part
const fs = require('fs'); //file system module
const PNG = require('pngjs').PNG; //png ecoder/decoder
const pixelmatch = require('pixelmatch'); //pixelmatch library
const pdf2img = require('pdf-img-convert'); //pdf2img library


//load input image and other initializations
const image1=fs.readFileSync('temp/temp1.png') //creates an image buffer from file ./input/[image 1 name]
const png1 = PNG.sync.read(image1); //takes the image1 buffer and returns png image
const image2=fs.readFileSync('temp/temp2.png') //creates an image buffer from file ./input/[image 2 name]
const png2 = PNG.sync.read(image2); //takes the image2 buffer and returns png image
const {width, height} = png1; //get height and width from 1st img by destructuring
const outputImage = new PNG({width, height}); //create a blank PNG and set its heigh and width

//pixelmatch
// available options to use
// threshold — Matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive. 0.1 by default.
// includeAA — If true, disables detecting and ignoring anti-aliased pixels. false by default.
// alpha — Blending factor of unchanged pixels in the diff output. Ranges from 0 for pure white to 1 for original brightness. 0.1 by default.
// aaColor — The color of anti-aliased pixels in the diff output in [R, G, B] format. [255, 255, 0] by default.
// diffColor — The color of differing pixels in the diff output in [R, G, B] format. [255, 0, 0] by default.
// diffColorAlt — An alternative color to use for dark on light differences to differentiate between "added" and "removed" parts. If not provided, all differing pixels use the color specified by diffColor. null by default.
// diffMask — Draw the diff over a transparent background (a mask), rather than over the original image. Will not draw anti-aliased pixels (if detected).
const options={
    threshold: 0.25,
    alpha:0.8,
    // diffColor:[255,0,0],
    // aaColor:[12,214,243]
}
// png1, png2 — Image data of the images to compare (Buffer, Uint8Array or Uint8ClampedArray). Note: image dimensions must be equal.
// outputImage — Image data to write the diff to, or null if don't need a diff image.
// width, height — Width and height of the images. Note that all three images need to have the same dimensions.
// options — The options defined above
pixelmatch(png1.data, png2.data, outputImage.data, width, height, options); //pixelmatch api

//output file
const outputPng=PNG.sync.write(outputImage) //take the outputImage PNG and returns an image buffer
fs.writeFileSync('output/output.png',outputPng) // writes the image buffer outputPng to file ./output/output.png

//cleanup of temporary files created
fs.unlinkSync("temp/temp1.png")
fs.unlinkSync("temp/temp2.png")
