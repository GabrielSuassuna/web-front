export const Lecturing = {
    "required": ["id", "discipline_id", "discipline_name", "discipline_code", "professor_id", "professor_name", "professor_siape", "professor_department", "average_score", "feedback_count"],
    "properties": {
        "id": {
            "type": "string",
        },
        "discipline_name": {
            "type": "string",
        },
        "discipline_code": {
            "type": "string"
        },
        "professor_name": {
            "type": "string"
        },
        "professor_siape": {
            "type": "string"
        },
        "professor_department": {
            "type": "string"
        },
        "average_score": {
            "type": "number"
        },
        "feedback_count": {
            "type": "number"
        },
    }
}