export const PutProfessor = {
    "required": ["departmentId", "siape", "name", "password","about", "lattes_url"],
    "properties": {
        "department_id": {
            "type": "string",
        },
        "siape": {
            "type": "string",
        },
        "name": {
            "type": "string"
        },
        "password": {
            "type": "string",
        },
        "about": {
            "type": "string"
        },
        "lattes_url": {
            "type": "string"
        }
    }
}