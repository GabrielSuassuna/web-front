export const PutReportLog = {
    "required": ["status", "date", "description", "authorId"],
    "properties": {
        "status": {
            "type": "string",
        },
        "date": {
            "type": "Date",
        },
        "description": {
            "type": "string",
        },
        "authorId": {
            "type": "string",
        },
    }
}