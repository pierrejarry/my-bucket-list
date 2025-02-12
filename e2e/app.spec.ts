import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/my-bucket-list/');
});

const fillForm = async (page: Page, name: string, description: string) => {
  const bucketListInput = page.getByRole('textbox', { name: /choose a name/i });
  const descriptionInput = page.getByRole('textbox', { name: /add a description/i });

  await bucketListInput.fill(name);
  await descriptionInput.fill(description);
};

test.describe('Application', () => {

  test('should show a title and a description', async ({ page }) => {
    await expect(page.getByRole('heading', {name: /my bucket list/i})).toBeVisible();
    await expect(page.locator('.description')).toBeVisible();
  });
  
  test('should show 2 disabled buttons that get enabled when filling the first input', async ( {page} ) => {
    /* Reset button is visible and disabled */
    const resetBtn = page.getByRole('button', {name: /reset/i});
    const validateBtn = page.getByRole('button', {name: /validate/i});
    const bucketListInput = page.getByRole('textbox', {name: /choose a name/i});

    /* Initial state: buttons are disabled */
    await expect(resetBtn).toBeDisabled();
    await expect(validateBtn).toBeDisabled();

    /* Fill input and expect buttons to be enabled */
    await bucketListInput.fill('My bucket list');
    await expect(resetBtn).toBeEnabled();
    await expect(validateBtn).toBeEnabled();
  });

  test('should empty the inputs when clicking on Reset button', async ( {page} ) => {
    await fillForm(page, 'My first bucket list', 'This is a new description');
    
    const resetBtn = page.getByRole('button', {name: /reset/i});
    await resetBtn.click();

    const bucketListInput = page.getByRole('textbox', {name: /choose a name/i});
    const descriptionInput = page.getByRole('textbox', {name: /add a description/i});

    await expect(bucketListInput).toHaveValue('');
    await expect(descriptionInput).toHaveValue('');
  });

  test('should show elements of the next page when clicking on validate button', async ({ page }) => {
    await fillForm(page, 'My first bucket list', 'This is a new description');

    const validateBtn = page.getByRole('button', { name: /validate/i });
    await validateBtn.click();

    /* Verify elements on the next page */
    await expect(page.getByRole('heading', { name: 'My first bucket list' })).toBeVisible();
    await expect(page.getByRole('button', { name: /add new element/i })).toBeVisible();
    await expect(page.getByText(/bucket list is empty/i)).toBeVisible();
  });
});


