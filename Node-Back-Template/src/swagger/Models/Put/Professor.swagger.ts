export const PutProfessor = {
    "required": ["departmentId", "siape", "name", "password","about", "lattesUrl"],
    "properties": {
        "departmentId": {
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
        "lattesUrl": {
            "type": "string"
        }
    }
}