const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless:false});
  const page = await browser.newPage();

  // Go to the URL
  await page.goto('https://books.toscrape.com/', { waitUntil: 'networkidle2' });

  // Scrape data
  const books = await page.evaluate(() => {
    const bookElements = document.querySelectorAll('.product_pod');
    const bookDetails = [];
    bookElements.forEach(book => {
      const title = book.querySelector('h3 a').title;
      const price = book.querySelector('.price_color').innerText;
      bookDetails.push({ title, price });
    });
    return bookDetails;
  });

  console.log(books);

  // Close the browser
  await browser.close();
})();




// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const fs = require('fs');
// const path = require('path');
// const { getStream } = require('puppeteer-stream'); // Ensure you have this package installed

// puppeteer.use(StealthPlugin());

// async function HandlejoinMeeting(meetUrl, userEmail) {
//     console.log("Joining Meet");
//     console.log(meetUrl);
//     console.log(userEmail);
//     const parts = meetUrl.split('/');
//     const meetingId = parts[parts.length - 1];

//     console.log(meetingId);

//     try {
//         const browser = await puppeteer.launch({
//             headless: false, // Set to false for debugging
//             args: [
//                 "--autoplay-policy=no-user-gesture-required",
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-accelerated-2d-canvas',
//                 '--disable-gpu',
//             ],
//             executablePath: require('puppeteer').executablePath(),
//         });
//         const page = await browser.newPage();

//         // Define the path for storing the recorded file
//         const dirPath = './report/video/';
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath, { recursive: true });
//         }
//         const filePath = path.join(dirPath, `meetingId_${meetingId}.webm`);
//         console.log(filePath);
//         const fileStream = fs.createWriteStream(filePath);

//         // Get the media stream
//         const stream = await getStream(page, { audio: true, video: true });
//         stream.pipe(fileStream);

//         const context = browser.defaultBrowserContext();
//         await context.overridePermissions("https://meet.google.com", ["microphone", "camera", "notifications"]);

//         console.log("Navigating to URL...");
//         await page.goto(meetUrl, { waitUntil: "networkidle2", timeout: 120000 });
//         console.log("Navigation complete");

//         // Take a screenshot for debugging
//         await page.screenshot({ path: 'screenshot.png' });

//         // Check if the page content includes some expected text
//         const pageContent = await page.content();
//         console.log(pageContent.includes('Google Meet'));

//         await page.waitForSelector('input[aria-label="Your name"]', { visible: true, timeout: 50000 });
//         console.log('Name input found');
//         await page.type('input[aria-label="Your name"]', 'riktam.ai NoteTaker');

//         try {
//             const cameraButtonSelector = '[aria-label*="Turn off camera"]';
//             const microphoneButtonSelector = '[aria-label*="Turn off microphone"]';

//             await page.waitForSelector(cameraButtonSelector, { visible: true, timeout: 60000 });
//             console.log('Camera button found');
//             await page.click(cameraButtonSelector);
//             console.log('Camera turned off');

//             await page.waitForSelector(microphoneButtonSelector, { visible: true, timeout: 60000 });
//             console.log('Microphone button found');
//             await page.click(microphoneButtonSelector);
//             console.log('Microphone turned off');

//         } catch (err) {
//             console.error('Error turning off camera/microphone:', err);
//         }

//         const askToJoinButtonSelector = 'button[class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 jEvJdc QJgqC"]';
//         await page.waitForSelector(askToJoinButtonSelector, { visible: true, timeout: 50000 });
//         console.log('Ask to join button found');
//         await page.click(askToJoinButtonSelector);
//         console.log('Clicked on Ask to join button');

//         const meetingstartTime = Date.now();
//         console.log("MeetingStartTime", meetingstartTime);

//     } catch (error) {
//         console.error('Error starting recording:', error);
//     }
// }

// // Test the function with sample data
// HandlejoinMeeting('https://meet.google.com/zne-khvy-eep', 'pangajk3@gmail.com');
