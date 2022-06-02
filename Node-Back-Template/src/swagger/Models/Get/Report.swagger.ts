export const GetReport = {
    "required": ["id", "feedbackId", "authorId", "status"],
    "properties": {
        "id": {
            "type": "string",
        },
        "feedbackId": {
            "type": "string",
        },
        "authorId": {
            "type": "string",
        },
        "reviewerId": {
            "type": "string",
        },
        "status": {
            "type": "string",
        }
    }
}