export const PostProfessor = {
    "required": ["departmentId", "siape", "name", "password", "about", "lattes_url", "is_head_of_department", "is_course_coordinator"],
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
            "type": "string"
        },
        "about": {
            "type": "string"
        },
        "lattes_url": {
            "type": "string"
        },
        "is_head_of_department": {
            "type": "boolean"
        },
        "is_course_coordinator": {
            "type": "boolean"
        },
    }
}