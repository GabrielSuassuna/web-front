export const Feedback = {
    "required": ["id", "disciplineCode","disciplineName","professorSiape","professorName", "title", "general_score", "date", "upvote", "downvote"],
    "properties": {
        "id": {
            "type": "string",
        },
        "discipline_code": {
            "type": "string",
        },
        "discipline_came": {
            "type": "string",
        },
        "professor_siape": {
            "type": "string",
        },
        "professor_name": {
            "type": "string",
        },
        "title": {
            "type": "string",
        },
        "general_score": {
            "type": "number",
        },
        "date": {
            "type": "Date",
        },
        "upvote_count": {
            "type": "number",
        },
        "downvote_count": {
            "type": "number",
        },
    }
}