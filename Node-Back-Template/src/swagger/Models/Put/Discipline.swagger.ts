export const PutDiscipline = {
    "required": ["code", "name", "description", "hours"],
    "properties": {
        "code": {
            "type": "string",
        },
        "name": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "hours": {
            "type": "number",
        }
    }
}