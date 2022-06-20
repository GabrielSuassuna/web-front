export const GetProfessor = {
    "required": ["id", "department_id", "siape", "name", "about", "lattes_url"],
    "properties": {
        "id": {
            "type": "string",
        },
        "department_id": {
            "type": "string",
        },
        "siape": {
            "type": "string",
        },
        "name": {
            "type": "string"
        },
        "about": {
            "type": "string"
        },
        "lattes_url": {
            "type": "string"
        },
    }
}