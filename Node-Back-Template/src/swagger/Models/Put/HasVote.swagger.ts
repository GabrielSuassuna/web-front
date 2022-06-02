export const PutHasVote = {
    "required": ["feedbackId", "studentId", "isUpvote"],
    "properties": {
        "feedbackId": {
            "type": "string",
        },
        "studentId": {
            "type": "string"
        },
        "isUpvote": {
            "type": "boolean"
        },
    }
}