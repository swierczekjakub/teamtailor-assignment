import {writeFile} from "fs/promises";
import {fetchAllPages} from "./fetchData";
import {json2csv} from 'json-2-csv';
import {URL} from '../config/constants'

export const generateCSVFile = async () => {
    try {
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
