export const GetProfessor = {
    "required": ["id", "departmentId", "siape", "name", "about", "lattes_url"],
    "properties": {
        "id": {
            "type": "string",
        },
        "departmentId": {
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