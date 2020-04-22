import { google } from 'googleapis';
const sheets = google.sheets('v4');
const keys = require('./secrets/credentials.json');
const sheetRangeIds = require('./secrets/sheet-range-ids.json');

const jwtClient = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    undefined
);

class SheetManager {

    spreadsheetId: string;
    range: string;
    jwtClientToken: JwtClientToken | undefined = undefined;
    authorized: boolean = false;

    constructor(_spreadsheetId ? : string, _range ? : string) {
        this.spreadsheetId = _spreadsheetId || sheetRangeIds.spreadsheetId;
        this.range = _range || sheetRangeIds.range;
    }

    async authorize() {

        return new Promise((resolve, reject) => {
            jwtClient.authorize((err ? : any, tokens ? : any): void => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Successfully connected!");
                    resolve(tokens);
                }
            });
        });

    }

    async getData() {

        if (!this.authorized) {
            await this.authorize().then((tokens) => {
                this.jwtClientToken = tokens as JwtClientToken;
                console.log(this.jwtClientToken);
            }).catch((err) => {
                console.log(err.message)
            });
            this.authorized = true;
            console.log(`Initial auth`);
        } else {
            console.log('From memory');
        }
        sheets.spreadsheets.values.get({
            auth: jwtClient,
            spreadsheetId: this.spreadsheetId,
            range: this.range,
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
            } else {
                if (response) {
                    console.log(response.data.values);
                    const values = response.data.values;
                    if (values) {
                        for (const row of values) {
                            console.log(JSON.stringify(row));
                        }
                    } else {
                        console.log('Found nothing...');
                    }

                }

            }
        });
    }

    async appendData(newRowData: string[]) {

        if (!this.authorized) {
            await this.authorize().then((tokens) => {
                this.jwtClientToken = tokens as JwtClientToken;
                console.log(this.jwtClientToken);
            }).catch((err) => {
                console.log(err.message)
            });
            this.authorized = true;
            console.log(`Initial auth`);
        } else {
            console.log('From memory');
        }
        sheets.spreadsheets.values.append({
            auth: jwtClient,
            spreadsheetId: this.spreadsheetId,
            range: this.range,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                'values': [
                    newRowData
                ]
            }
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
            } else {
                if (response) {
                    console.log(response.data);
                } else {
                    console.log('No response received');
                }
            }
        });
    }
}

export default SheetManager;

interface JwtClientToken {
    access_token: string;
    token_type: string;
    expiry_date: number;
    refresh_token: string;
    id_token: any;
}