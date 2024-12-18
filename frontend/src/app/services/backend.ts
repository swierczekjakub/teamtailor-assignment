import {BASE_URL} from "@/app/config/constants";

export const getCandidates = async () => {
    return fetch(BASE_URL);
}
