import { test, expect } from '@playwright/test';

const devUrl = "http://localhost:4321/";
const prodUrl = "https://www.ryanjeynes.co.uk/";

test.describe('Page metadata', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('content match', async({ page }) => {
        await expect(page).toHaveURL(devUrl);

        const metaOgUrl = page.locator("meta[property='og:url']");
        const canonical = page.locator("link[rel='canonical']");
        await expect(metaOgUrl).toHaveAttribute('content', prodUrl);
        await expect(canonical).toHaveAttribute('href', prodUrl);

        const pageTitle = "Ryan Jeynes | Web Portfolio";
        const metaOgTitle = page.locator("meta[property='og:title']");
        await expect(page).toHaveTitle(pageTitle);
        await expect(metaOgTitle).toHaveAttribute('content', pageTitle);

        const pageDescription = "I'm a Full Stack Web Developer from a beautiful small town in Worcestershire. Check out my portfolio for some examples of my previous work.";
        const metaDesc = page.locator("meta[name='description']");
        const metaOgDesc = page.locator("meta[property='og:description']");
        await expect(metaDesc).toHaveAttribute('content', pageDescription);
        await expect(metaOgDesc).toHaveAttribute('content', pageDescription);
    });
});

test.describe('Navigation', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Header visibility', async ({ page }) => {
        const header = page.locator('body > header'); //Specifying a preceding body tag otherwise Playwright fetches header elements from Astro's shadow DOM
        await expect(header).toBeVisible();
    });

    test('Hamburger visibility', async ({ page, isMobile }) => {
        const hamburger = page.locator('div#header-left .nav-toggle');

        if(isMobile){
            await expect(hamburger).toBeVisible();
        }
        else {
            await expect(hamburger).toBeHidden();
        }
    });

    test('Navigation item count', async ({ page, isMobile }) => {
        if(isMobile){
            await page.locator('button#astronav-menu').click();
        }

        const nav = page.locator('nav > ul li');
        await expect(nav).toHaveCount(4);
    });

    test('Navigation links', async ({ page, isMobile }) => {
        const menuToggle = page.locator('button#astronav-menu');
        const menuItems = [
            {text: 'About', href:'#about'},
            {text: 'Skills', href:'#skills'},
            {text: 'Projects', href:'#projects'},
            {text: 'Contact', href:'#contact'}
        ];

        const nav = page.locator('nav > ul');

        for(let i = 0; i < menuItems.length; i++){
            if(isMobile){
                await menuToggle.click();
            }

            await nav.getByText(menuItems[i].text).click();
            await expect(page).toHaveURL(devUrl + menuItems[i].href);
        }
    });
});

test.describe('Buttons', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Theme toggle button', async ({ page }) => {
        const body = page.locator('body');
        const themeToggle = page.locator("label[for='theme-toggle']");

        await themeToggle.click();
        await expect(body).toHaveClass('dark');
        await page.evaluate(() => {
            window.localStorage.setItem('theme', 'dark');
        });

        await themeToggle.click();
        await expect(body).toHaveClass('');
        await page.evaluate(() => {
            window.localStorage.removeItem('theme');
        });
    })
});

test.describe('Skills section', async () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Skills section title', async ({ page }) => {
        await expect(page.locator('section#skills > h2')).toHaveText('Skills');
    });

    test('Skill columns', async ({ page }) => {
        const skillCategoryCount = 3;
        const counts = [6, 6, 6]; //Back end, front end, other

        const skillCategories = page.locator('section#skills div.skills-list');
        await expect(skillCategories).toHaveCount(skillCategoryCount);

        for(let i = 0; i < skillCategoryCount; i++)
        {
           const cards = skillCategories.nth(i).locator('.card');
           await expect(cards).toHaveCount(counts[i]);
        }
    });
});

test.describe('Projects section', async () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Project section title', async ({ page }) => {
        await expect(page.locator('section#projects > h2')).toHaveText('Projects');
    });

    test('Project card count', async ({ page }) => {
        const projectsToBeVisible = 3;

        const projectCards = page.locator('section#projects .card');
        await expect(projectCards).toHaveCount(projectsToBeVisible);
    });
});