import {
  test,
  chromium,
  firefox,
  expect
} from '@playwright/test';
import {
  today,
  errMsg
} from "./common/utils";
import path from 'path';
import {
  getUrlList,
  postApex
} from "./common/apex";

import fs from 'fs';
test('TestCase', async ({}) => {
  const urlList = await getUrlList();
  for (let i = 0; i < urlList.length; i++) {

    const browser = await chromium.launch({
      // channel: 'msedge',
    });

    const dirVideo = `/logs/public/video/${urlList[i].test_id}/${today}`
    let elapsed: number = 0;
    let success = 'Y';
    let error = '';
    const context = await browser.newContext({
      recordVideo: {
        dir: dirVideo
      }
    });
    await context.tracing.start({
      screenshots: true,
      snapshots: true
    })
    let page = await context.newPage();
    try {
      const startTime = new Date();
      await page.goto(urlList[i].url, {
        waitUntil: 'domcontentloaded'
      });
      const endTime = new Date();
      elapsed = endTime - startTime;

      await page.waitForTimeout(2000);
      await page.waitForSelector(urlList[i].expect, {timeout:urlList[i].time_limit });
      await page.screenshot({
        path: `/logs/public/screenshot/${urlList[i].test_id}/${today}.png`
      });

      if (urlList[i].time_limit < elapsed) throw '시간초과:' + elapsed.toString()

    } catch (err) {
      success = 'N';
      error = errMsg(err.toString())
    }
    await context.tracing.stop({
      path: `/logs/public/trace/${urlList[i].test_id}/${today}.zip`
    });
    
    await context.close();
    await browser.close();
    const files = fs.readdirSync(dirVideo);
    const videoDir = `${dirVideo}/${files[0]}`.replace('./', '/').replace('/logs/public', '');
    const upJson = {
      id: urlList[i].test_id,
      url: urlList[i].url,
      gbn: 'T',
      name: urlList[i].test_name,
      elapsed: elapsed,
      cdate: today,
      success: success,
      error: error,
      error_gbn:error.substring(0, error.indexOf(':')),
      screenshot: `/screenshot/${urlList[i].test_id}/${today}.png`,
      traces: `/trace/${urlList[i].test_id}/${today}.zip`,
      video: `${videoDir}`,
    }
    const result = await postApex(upJson);
  }
})