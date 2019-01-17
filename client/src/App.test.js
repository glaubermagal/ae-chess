const puppeteer = require('puppeteer');


describe('Test Chess', () => {
    test('Test knight moves', async () => {

        let browser = await puppeteer.launch({
            headless: false
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 500
            },
            userAgent: ''
        });

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.chess');
        const html = await page.$eval('.chess', e => e.innerHTML);
        await page.click('.A1');
        expect(html.find('.selected')).to.have.length(1);

        await page.click('.E5');
        expect(html.find('.selected.E5')).to.have.length(0);

        await page.click('.B3');
        expect(html.find('.selected.B3')).to.have.length(1);

        await browser.close();

    }, 16000);
});
