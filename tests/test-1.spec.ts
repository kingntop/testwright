import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.google.com/search?q=ehaodrnr&oq=ehaodrnr&aqs=chrome..69i57.35275j0j2&sourceid=chrome&ie=UTF-8
  await page.goto('https://www.google.com/search?q=ehaodrnr&oq=ehaodrnr&aqs=chrome..69i57.35275j0j2&sourceid=chrome&ie=UTF-8');

  // Click text=도매꾹 :: 돈버는 쇼핑, domeggook
  await page.locator('text=도매꾹 :: 돈버는 쇼핑, domeggook').click();
  await expect(page).toHaveURL('https://domeggook.com/main/');

  // Click form[name="searchItem"] div:has-text("상품명 상품명 상품번호 공급사ID 공급사닉네임") >> nth=0
  await page.locator('form[name="searchItem"] div:has-text("상품명 상품명 상품번호 공급사ID 공급사닉네임")').first().click();

  // Fill input[name="sw"]
  await page.locator('input[name="sw"]').fill('');

  // Press Enterahsl
  await page.locator('input[name="sw"]').press('Enter');
  await expect(page).toHaveURL('https://domeggook.com/main/item/itemList.php?sfc=ttl&sf=ttl&sw=ahslxj');

});