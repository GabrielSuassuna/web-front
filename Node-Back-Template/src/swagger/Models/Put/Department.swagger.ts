export const PutDepartment = {
    "required": ["name", "description", "course_coordinator_id", "department_head_id"],
    "properties": {
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