export const GetFeedback = {
    "required": ["id", "lecturingId","studentId","title","description", "period", "generalScore", "assiduityScore","clarityScore","relationshipScore","date", "upvotes", "downvotes", "hasVoted", "tags"],
    "properties": {
        "id": {
            "type": "string",
        },
        "lecturing_id": {
            "type": "string",
        },
        "student_id": {
            "type": "string",
        },
        "title": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "period": {
            "type": "string",
        },
        "general_score": {
            "type": "string",
        },
        "assiduity_score": {
            "type": "string",
        },
        "clarity_score": {
            "type": "string",
        },
        "relationship_score": {
            "type": "string",
        },
        "date": {
            "type": "string",
        },
        "upvote_count": {
            "type": "number",
        },
        "downvote_count": {
            "type": "number",
        },
        "has_voted": {
            "type": "string",
        },
        "tags": {
            "type": "string[]",
        }
    }
}