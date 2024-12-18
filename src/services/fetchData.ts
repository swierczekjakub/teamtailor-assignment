import {
    ApiResponse,
    CandidateWithJobApplications,
    Meta,
} from "../types/apiResponse";
import {destructureCandidates} from "../utils/destructureCandidates";
import {Cache} from "../utils/cache"

const pageCache = new Cache<{
    candidates: CandidateWithJobApplications[],
    meta: Meta
}>();

export const fetchPage = async (url: string, page: number): Promise<{
    candidates: CandidateWithJobApplications[],
    meta: Meta
}> => {
    try {
        const cachedData = pageCache.get(page);
        if (cachedData) {
            return cachedData.data;
        }

        const response = await fetch(url + page, {
            method: "GET",
            headers: {
                "Authorization": `Token token=${process.env.API_KEY}`,
                "X-Api-Version": "20240404"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        const candidates = destructureCandidates(data);

        const result = {
            candidates,
            meta: data.meta
        }

        pageCache.set(page, result);

        return result;

    } catch (error) {
        {
            console.error('Error fetching candidates:', error);
            throw error;
        }
    }
};

export const fetchAllPages = async (url: string): Promise<CandidateWithJobApplications[]> => {
    let allData: CandidateWithJobApplications[] = [];
    let currentPage: number = 1;
    let totalPages: number = 1;

    do {
        const response = await fetchPage(url, currentPage);
        allData = [...allData, ...response.candidates];
        totalPages = response.meta["page-count"];
        currentPage++;
    } while (currentPage <= totalPages);

    return allData;
};
