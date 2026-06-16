const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set a large viewport for a high-res image
  await page.setViewport({ width: 2400, height: 1200, deviceScaleFactor: 2 });
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
        <style>
          body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
            background-color: #faf8f4; /* Cream background matching the site */
          }
          .logo-container { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
          }
          .mark {
            background: linear-gradient(to right, #b8945f 0%, #e2c896 25%, #b8945f 50%, #8f7146 75%, #b8945f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.8rem;
            letter-spacing: 0.55em;
            font-family: sans-serif;
            text-align: center;
            line-height: 1;
            padding-bottom: 20px;
          }
          .name {
            font-family: "Cormorant Garamond", Georgia, serif;
            font-weight: 600;
            font-size: 7rem;
            letter-spacing: 0.14em;
            background: linear-gradient(to right, #b8945f 0%, #e2c896 25%, #b8945f 50%, #8f7146 75%, #b8945f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
            white-space: nowrap;
          }
          .tagline {
            font-family: "Cormorant Garamond", Georgia, serif;
            font-style: italic;
            font-weight: 500;
            font-size: 2.5rem;
            letter-spacing: 0.3em;
            color: #8f7146;
            line-height: 1;
            margin-top: 35px;
            white-space: nowrap;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="logo-container" id="logo">
          <span class="mark">◆</span>
          <span class="name">Radharani Gemstone</span>
          <span class="tagline">Divine Energy, Timeless Luxury</span>
        </div>
      </body>
    </html>
  `;
  
  await page.setContent(html);
  
  console.log("Waiting for fonts to load...");
  await page.evaluateHandle('document.fonts.ready');
  
  // Wait an extra second just to be absolutely sure the font is rendered
  await new Promise(r => setTimeout(r, 1000));
  
  const logoElement = await page.$('#logo');
  
  console.log("Taking screenshot...");
  // Save to the Desktop as requested
  await logoElement.screenshot({ 
    path: 'C:\\Users\\MIT\\OneDrive\\Desktop\\Radharani_Gemstone_Logo.jpg', 
    type: 'jpeg', 
    quality: 100,
    omitBackground: false
  });
  
  await browser.close();
  console.log("Done! Logo saved to Desktop.");
})();
