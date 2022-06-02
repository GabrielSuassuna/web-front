export const GetDiscipline = {
    "required": ["id", "code", "name", "description", "hours"],
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
        "description": {
            "type": "string",
        },
        "hours": {
            "type": "number",
        }
    }
}