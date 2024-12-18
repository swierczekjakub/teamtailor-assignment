import {fetchAllPages} from "../services/fetchData";
import {URL} from "../config/constants";
import {Router} from "express";

export const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const data = await fetchAllPages(URL);
    res.json(data);
})
