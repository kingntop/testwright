import {
  test,
  expect,
  chromium,
  firefox,
  webkit,
  devices

} from '@playwright/test';


import {
  today,
  yesterday,
  yesterdayDB
} from "./common/utils";
import {
  postApex,
  getMulitScreen
} from "./common/apex";



test('test', async ({}) => {

  let Json = []
  
  const uidInfos = await getMulitScreen();

  for (const uidInfo of uidInfos) {
    console.log(uidInfo.test_id);
    const screens = uidInfo.screen;
    const browserTypes = [chromium, webkit];
    for (const browserType of browserTypes) {
      for (const screen of screens) {
        const browser = await chromium.launch();
        const device = devices[screen.description]
        const context = await browser.newContext({
          ...device
        });
        if (browserType.name() == device.defaultBrowserType) {
          const page = await context.newPage()
          let start_mi = Date.now();
          await page.goto(uidInfo.url, {
            waitUntil: 'domcontentloaded'
          });
          await page.screenshot({
            path: '/logs/public/multiscreen/' + uidInfo.test_id + '/' +  today + '/' + screen.code + '.png',
            // fullPage: true
          });
          const success = 'Y';
          const error = 'N';
          let end_mi = Date.now();
          const elapsed = end_mi - start_mi;
          console.log(start_mi, end_mi, end_mi - start_mi);
          const apexJson = {
            id: uidInfo.test_id,
            url: uidInfo.url,
            gbn: 'M',
            name:uidInfo.test_name,
            success: success,
            error: error,
            elapsed: elapsed,
            cdate: today,
            screenshot: '/multiscreen/'+ uidInfo.test_id + '/' +  today + '/' + screen.code + '.png',
          }
          Json.push(apexJson)
        }
      }
    }

    const aJson = {
      id: uidInfo.test_id,
      gbn: 'M',
      cdate: today,
      data : Json

    }
    console.log(uidInfo.test_id);
    Json = []
    await postApex(aJson)
  }
});