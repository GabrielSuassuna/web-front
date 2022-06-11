export const GetHasVote = {
    "required": ["id", "feedbackId","studentId","isUpvote"],
    "properties": {
        "id": {
            "type": "string",
        },
        "feedback_id": {
            "type": "string",
        },
        "student_id": {
            "type": "string",
        },
        "is_upvote": {
            "type": "boolean",
        }
    }
}