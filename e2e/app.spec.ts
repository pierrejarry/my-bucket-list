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

const fillFormAndValidate = async (page: Page, name: string, description: string) => {
  await fillForm(page, name, description);
  await page.getByRole('button', { name: /validate/i }).click();
};

// Selectors function for first screen elements
const firstScreenSelectors = (page: Page) => ({
  resetBtn: page.getByRole('button', { name: /reset/i }),
  validateBtn: page.getByRole('button', { name: /validate/i }),
  bucketListInput: page.getByRole('textbox', { name: /choose a name/i }),
  descriptionInput: page.getByRole('textbox', { name: /add a description/i }),
});

// Selectors function for second screen elements
const secondScreenSelectors = (page: Page) => ({
  addElementBtn: page.getByRole('button', { name: /add new element/i }),
  elemInput: page.getByPlaceholder(/example: my first element/i),
  cancelBtn: page.getByRole('button', { name: /cancel/i }),
  okBtn: page.getByRole('button', { name: /ok/i }),
  listItem: page.getByRole('listitem'),
});

test.describe('First screen: Create Bucket List', () => {

  test('should show a title and a description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my bucket list/i })).toBeVisible();
    await expect(page.locator('.description')).toBeVisible();
  });

  test('should show 2 disabled buttons that get enabled when filling the first input', async ({ page }) => {
    const { resetBtn, validateBtn, bucketListInput } = firstScreenSelectors(page);    

    /* Initial state: buttons are disabled */
    await expect(resetBtn).toBeDisabled();
    await expect(validateBtn).toBeDisabled();

    /* Fill input and expect buttons to be enabled */
    await bucketListInput.fill('My bucket list');
    await expect(resetBtn).toBeEnabled();
    await expect(validateBtn).toBeEnabled();
  });

  test('should empty the inputs when clicking on Reset button', async ({ page }) => {
    const { resetBtn, bucketListInput, descriptionInput } = firstScreenSelectors(page);

    await fillForm(page, 'My first bucket list', 'This is a new description');
    await resetBtn.click();

    /* Inputs have empty values */
    await expect(bucketListInput).toHaveValue('');
    await expect(descriptionInput).toHaveValue('');
  });

  test('should show elements of the next page when clicking on validate button', async ({ page }) => {
    const { validateBtn } = firstScreenSelectors(page);

    await fillForm(page, 'My first bucket list', 'This is a new description');
    await validateBtn.click();

    /* Elements are visible on the next page */
    await expect(page.getByRole('heading', { name: 'My first bucket list' })).toBeVisible();
    await expect(page.getByRole('button', { name: /add new element/i })).toBeVisible();
    await expect(page.getByText(/bucket list is empty/i)).toBeVisible();
  });

});

test.describe('Second Screen: Create and manage new items', () => {
  test('should show an input and buttons to create a new element when clicking on add element button', async ({ page }) => {
    const { addElementBtn } = secondScreenSelectors(page);

    await fillFormAndValidate(page, 'My first bucket list', 'This is a new description');
    await addElementBtn.click();

    await expect(page.getByPlaceholder(/example: my first element/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /cancel/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ok/i })).toBeVisible();
  });

  test('should create a new element and be visible in the list', async ({ page }) => {
    const { addElementBtn, elemInput, okBtn, listItem } = secondScreenSelectors(page);

    await fillFormAndValidate(page, 'My first bucket list', 'This is a new description');
    await addElementBtn.click();

    await elemInput.fill('My first bucket list element!');
    await okBtn.click();

    await expect(listItem).toBeVisible();

    // Check that the label contains the text "hello"
    await expect(listItem.locator('label.container')).toHaveText(/my first bucket list element/i);
  })
});
