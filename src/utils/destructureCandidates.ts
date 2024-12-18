import {
    ApiResponse,
    Candidate,
    CandidateWithJobApplications,
    JobApplication,
    RelationshipData
} from "../types/apiResponse";

export const destructureCandidates = (data: ApiResponse): CandidateWithJobApplications[] => {
    return data.data.map((candidate: Candidate): CandidateWithJobApplications => {
        const {id, attributes: {'first-name': firstName, 'last-name': lastName, email}, relationships} = candidate;
        const firstNameStr = String(firstName);
        const lastNameStr = String(lastName);

        const candidateJobRelationshipData: RelationshipData[] = relationships['job-applications'].data;

        const jobApplications = candidateJobRelationshipData.map((jobApp: RelationshipData) => {
            const jobAppDetails: JobApplication = data.included.find(((item: JobApplication) => item.id === jobApp.id && item.type === 'job-applications')) as JobApplication;

            return {
                id: jobApp.id,
                createdAt: jobAppDetails?.attributes['created-at']
            };
        });

        return {
            id,
            firstName: firstNameStr,
            lastName: lastNameStr,
            email,
            jobApplications
        };
    });
};
