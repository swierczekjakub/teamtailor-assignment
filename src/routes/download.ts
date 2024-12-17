import {Router} from 'express';
import {generateCSVFile} from "../services/generateCSVFile";

export const downloadRouter = Router();

downloadRouter.get('/', async (req, res) => {
    const csv = await generateCSVFile()

    res.attachment("userData.csv");
    res.status(200).send(csv);
});
