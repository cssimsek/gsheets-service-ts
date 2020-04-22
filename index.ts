import SheetManager from './src/gsheets-api-util';

const sheetManager = new SheetManager();

(async () => {
    try {
        //await sheetManager.appendData(['mophandle@fiveagainstone.com','Mophandle Tudor','Which way to the temple of the Mop?','General Inquiry']);
        await sheetManager.getData();
    } catch (err) {
        console.log(err.message);
    }
})();