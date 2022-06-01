export const PutDiscipline = {
    "required": ["id", "code", "name", "hours"],
    "properties": {
        "id": {
            "type": "string",
        },
        "code": {
            "type": "string",
        },
        "name": {
            "type": "string",
        },
        "hours": {
            "type": "number",
        }
    }
}