export const GetFeedback = {
    "required": ["id", "lecturingId","studentId","title","description", "period", "generalScore", "assiduityScore","clarityScore","relationshipScore","date", "upvotes", "downvotes", "hasVoted", "tags"],
    "properties": {
        "id": {
            "type": "string",
        },
        "lecturingId": {
            "type": "string",
        },
        "studentId": {
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
        "generalScore": {
            "type": "string",
        },
        "assiduityScore": {
            "type": "string",
        },
        "clarityScore": {
            "type": "string",
        },
        "relationshipScore": {
            "type": "string",
        },
        "date": {
            "type": "string",
        },
        "upvotes": {
            "type": "string",
        },
        "downvotes": {
            "type": "string",
        },
        "hasVoted": {
            "type": "string",
        },
        "tags": {
            "type": "string[]",
        }
    }
}