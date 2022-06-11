export const PostFeedback = {
    "required": ["lecturingId","studentId","title","description", "period", "generalScore", "assiduityScore","clarityScore","relationshipScore","date", "tags"],
    "properties": {
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
        "tags": {
            "type": "string[]"
        }
    }
}