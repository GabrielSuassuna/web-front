export const GetHasVote = {
    "required": ["id", "feedbackId","studentId","isUpvote"],
    "properties": {
        "id": {
            "type": "string",
        },
        "feedbackId": {
            "type": "string",
        },
        "studentId": {
            "type": "string",
        },
        "isUpvote": {
            "type": "boolean",
        }
    }
}