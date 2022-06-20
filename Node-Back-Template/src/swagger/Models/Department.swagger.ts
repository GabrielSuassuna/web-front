export const Department = {
    "required": ["id", "name", "description"],
    "properties": {
        "id": {
            "type": "string",
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "course_coordinator_id": {
            "type": "string"
        },
        "department_head_id": {
            "type": "string"
        },
    }
}