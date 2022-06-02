export const Feedback = {
    "required": ["id", "disciplineCode","disciplineName","professorSiape","professorName", "title", "general_score", "date", "upvote", "downvote"],
    "properties": {
        "id": {
            "type": "string",
        },
        "disciplineCode": {
            "type": "string",
        },
        "disciplineName": {
            "type": "string",
        },
        "professorSiape": {
            "type": "string",
        },
        "professorName": {
            "type": "string",
        },
        "title": {
            "type": "string",
        },
        "generalScore": {
            "type": "number",
        },
        "date": {
            "type": "Date",
        },
        "upvotes": {
            "type": "Date",
        },
        "downvotes": {
            "type": "Date",
        },
    }
}