import {writeFile} from "fs/promises";
import {fetchAllPages} from "./fetchData";
import {json2csv} from 'json-2-csv';

export const generateCSVFile = async () => {
    try {
        const URL = "https://api.teamtailor.com/v1/candidates?fields[candidates]=first-name,last-name,email,job-applications&include=job-applications&fields[job-applications]=created-at&page[size]=30&page[number]="
        const data = await fetchAllPages(URL)

        const csv = json2csv(data, {
            delimiter: {field: ';'},
            expandArrayObjects: true,
        });

        await writeFile("userData.csv", csv)
        console.log('The File was successfully generated!');
        return csv;

    } catch (err) {
        console.error('Error during file generation:', err);
    }
}
