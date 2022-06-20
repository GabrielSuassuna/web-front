export const GetLecturing = {
    "required": ["id", "professor_id", "discipline_id", "feedback_count", "average_score"],
    "properties": {
        "id": {
            "type": "string",
        },
        "professor_id": {
            "type": "string",
        },
        "discipline_id": {
            "type": "string",
        },
        "feedback_count": {
            "type": "string",
        },
        "average_score": {
            "type": "string",
        },
    }
}