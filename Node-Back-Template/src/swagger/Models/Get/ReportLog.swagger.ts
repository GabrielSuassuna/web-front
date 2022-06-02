export const GetReportLog = {
    "required": ["id", "date", "title", "authorName"],
    "properties": {
        "id": {
            "type": "string",
        },
        "date": {
            "type": "Date",
        },
        "title": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "authorName": {
            "type": "string",
        }
    }
}