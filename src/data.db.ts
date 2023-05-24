
import * as fs from "fs";
import isEqual from 'lodash/isEqual';
import path from "path";
import dataList from "./data";

// Function to write data to file
const writeDataToFile = () => {
    const content = JSON.stringify(dataList, null, 2);
    fs.writeFile(path.resolve(__dirname)+'/file.dataList.db', content, 'utf8', (err) => {
        if (err) console.error('Error writing data to file:', err.message);
    });
};

export const retrieveDataFromFile = () => {
    try {
        const rawData = fs.readFileSync(path.resolve(__dirname)+'/file.dataList.db', 'utf8')
        if (rawData) {
            const data = JSON.parse(rawData);
            dataList.companies = data.companies;
            dataList.link = data.link;
        }
    } catch (err: any) {console.error('Error reading data from file:', err.message)}
};

setInterval(() => {
    if (dataList.companies.length === 0 && dataList.link.length === 0) return;
    const persistentData = JSON.parse(fs.readFileSync(path.resolve(__dirname)+'/file.dataList.db', 'utf8'));
    if (!isEqual(persistentData, dataList)) writeDataToFile();
}, 6000);
