const scrapingInfos = require('../scrapingInfos');

test('find the title, price, and images', async () => {
    const weblink = 'https://www.amazon.de/Newaner-Taschenrechner-Tischrechner-12-Stelligem-Tischtaschenrechner-Schwarz/dp/B09XX6ZJY8/ref=sr_1_3?__mk_de_DE=ÅMÅŽÕÑ&crid=2KD72SP3EIMFN&dib=eyJ2IjoiMSJ9._lKP_ed96XDzb1Dq5smG20XJYPILF_lxhkJG9UWqnDVTMAVrh0oD72KUNq5Ry1PwWx86GAGcpcm9lRafgldnS0P4LrMG954PlFCtqJ6aPv9HliqAj-uOybdSWit5pGxUTds_LL90xJmebZAFd5OAS_zt2n_lNx4KnGOvYYxvigqlcgAkVn5GxeqL4qv_UTxnu5XPxzbdGXXMD9ulnfP57HD1uorKaESgY45QBXELM88.dIeqeGan8qnaGub_LklKgIJNCtWU-GUuAcotO6hIWcg&dib_tag=se&keywords=taschenrechner&qid=1718017051&sprefix=taschenrechner%2Caps%2C103&sr=8-3';

    const expectedTitle = 'Newaner Taschenrechner, Tischrechner mit 12-Stelligem Großem LCD-Display, Mini Taschenrechner Standard Funktion für Büro, Zuhause und Schule, Tischtaschenrechner mit Großem Tasten, Schwarz';
    const expectedPrice = '6,99';
    const expectedImages = [
        'https://m.media-amazon.com/images/I/71pUL6U66OL.__AC_SX300_SY300_QL70_ML2_.jpg',
        'https://m.media-amazon.com/images/I/511aNksT8BL._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/4177NhIoG0L._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/51dk8kx1zyL._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/4185Ztg+vGL._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/51GoOjPALkL._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/41jNdcdKCjL._AC_US40_.jpg',
        'https://m.media-amazon.com/images/I/31QeOvKsNFL._AC_US40_.jpg',
        'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/transparent-pixel._V192234675_.gif'
    ];

    const { title, price, images } = await scrapingInfos(weblink);

    expect(title).toBe(expectedTitle);
    expect(price).toBe(expectedPrice);
    expect(images).toEqual(expect.arrayContaining(expectedImages));
});
