export const PostHasVote = {
    "required": ["feedbackId", "studentId", "isUpvote"],
    "properties": {
        "feedback_id": {
            "type": "string",
        },
        "student_id": {
            "type": "string"
        },
        "is_upvote": {
            "type": "boolean"
        },
    }
}