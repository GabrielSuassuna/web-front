export const GetReport = {
    "required": ["id", "feedbackId", "authorId", "status"],
    "properties": {
        "id": {
            "type": "string",
        },
        "feedback_id": {
            "type": "string",
        },
        "author_id": {
            "type": "string",
        },
        "reviewer_id": {
            "type": "string",
        },
        "status": {
            "type": "string",
        },
        "feedback": {
            "type": "GetFeedback"
        },
        "logs": {
            "type": "GetReportLog[]"
        },

    }
}