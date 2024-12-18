import React from "react";
import moment from "moment";

interface CandidateTableProps {
    candidatesData: Candidate[]
}

export const CandidateTable = ({candidatesData}: CandidateTableProps) => {
    const tdClass = "border border-gray-300 px-4 py-2"
    const thClass = "text-left" + tdClass;
    const getFormattedDate = (date: string) => {
        // console.log({date, moment: moment(date, )})
        return moment(date).format("DD-MM-YYYY hh:mm:ss")
    }

    return (
        <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
            <thead>
            <tr className="bg-gray-100">
                <th className={thClass}>First Name</th>
                <th className={thClass}>Last Name</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Job Applications</th>
            </tr>
            </thead>
            <tbody>
            {candidatesData.map((candidate: Candidate) => (
                <tr key={candidate.id}>
                    <td className={tdClass}>{candidate.firstName}</td>
                    <td className={tdClass}>{candidate.lastName}</td>
                    <td className={tdClass}>{candidate.email}</td>
                    <td className={tdClass}>
                        {candidate.jobApplications.length > 0 ? (
                            <ul>
                                {candidate.jobApplications.map((job) => (
                                    <li key={job.id}>
                                        {getFormattedDate(job.createdAt)} (ID: {job.id})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            "No applications"
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
