import {writeFile} from "fs/promises";
import {fetchAllPages} from "./fetchData";
import {json2csv} from 'json-2-csv';
import {URL} from '../config/constants'

export const generateCSVFile = async () => {
    try {
        const data = await fetchAllPages(URL)
        const csv = json2csv(data, {
            keys: [
                {field: "id", title: "candidate_id"},
                {field: "firstName", title: "first_name"},
                {field: "firstName", title: "last_name"},
                {field: "email", title: "email"},
                {field: "jobApplications.id", title: "job_application_id"},
                {field: "jobApplications.createdAt", title: "job_application_created_at"}
            ],
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
