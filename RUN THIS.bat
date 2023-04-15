@echo off
title print automation
node pdfToImg.js
node imgCompare.js
echo open output folder
pause