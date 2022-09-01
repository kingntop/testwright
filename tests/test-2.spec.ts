import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://mkia.auton.kr/
  // await page.goto('https://mkia.auton.kr/');

  // Go to https://kia.auton.kr/index/main
  await page.goto('https://kia.auton.kr/index/main');

  // Click #main_popup a:has-text("닫기")
  await page.locator('#main_popup a:has-text("닫기")').click();

  // Click text=기아브랜드관 >> nth=1
  await page.locator('text=기아브랜드관').nth(1).click();
  await expect(page).toHaveURL('https://kia.auton.kr/index/brandMall');

  // Click #container a:has-text("레드굿즈")
  await page.locator('#container a:has-text("레드굿즈")').click();
  await expect(page).toHaveURL('https://kia.auton.kr/product/category/brandMall/category_main?pcid=4003&rootid=4001');

  // Click img[alt="\[레드굿즈\] 레이 2022 벤 전용 KC코일매트"] >> nth=1
  await page.locator('#product_tab01 > div.list_content_wrap > ul > li:nth-child(1) > div.list_img_box > a > img:nth-child(1)').click();
  await expect(page).toHaveURL('https://kia.auton.kr/product/category/brandMall/product_view2/88602?pcid=4003&parentid=4002&rootid=4001');

  // Click span:has-text("옵션선택")
  await page.locator('span:has-text("옵션선택")').click();

  // Click text=1열_운전석(1인승 벤) 색상-블랙/커버업-그레이60,300 원
  await page.locator('text=1열_운전석(1인승 벤) 색상-블랙/커버업-그레이60,300 원').click();

  // Click text=장바구니 >> nth=1
  await page.locator('text=장바구니').nth(1).click();

  // Click text=장바구니 보기
  await page.locator('text=장바구니 보기').click();
  await expect(page).toHaveURL('https://kia.auton.kr/cart/cart_list?siteCode=');

});