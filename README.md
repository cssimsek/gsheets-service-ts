# TS utility to read form and write to Google Sheets using googleapis sheets v4
## Purpose
TypeScript utility to read specific ranges from and append to Google Sheets.
## Dependencies:
```
{
    "dependencies": {
        "@types/node": "^13.13.0",
        "googleapis": "^49.0.0",
        "ts-node": "^8.8.2"
    },
    "devDependencies": {
        "tslint": "^5.12.0",
        "typescript": "^3.2.2"
    }
}
```
## How to use:
1. You'll need a GCP project with the [Google Sheets API enabled](https://developers.google.com/sheets/api/quickstart/nodejs).
2. Then create a [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts) under your GCP project and create a JSON key for this user.
3. Save the JSON key in the src/secrets folder as 'credentials.json'.
4. Define the sheet id and range you wish to access:
   * Touch / create a file named sheet-range-ids.json under the src/secrets folder and add "spreadsheetId" and "range" properties referring to your target sheet id and range.
   * Or you can declare the "spreadsheetId" and "range" values when instantiating the SheetManager class: `new SheetManager(_spreadsheetId?: string, _range?: string);`
5. To run the index.ts example implemtation use `ts-node index.ts`.
