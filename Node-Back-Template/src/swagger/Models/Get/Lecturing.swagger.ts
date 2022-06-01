export const GetLecturing = {
    "required": ["id", "disciplineId", "disciplineName", "disciplineCode", "professorId", "professorName", "professorSiape", "professorDepartment", "averageScore","numberOfFeedbacks","assiduityScore","clarityScore","relationshipScore",],
    "properties": {
        "id": {
            "type": "string",
        },
        "disciplineId": {
            "type": "string",
        },
        "disciplineName": {
            "type": "string",
        },
        "disciplineCode": {
            "type": "string"
        },
        "professorId": {
            "type": "string"
        },
        "professorName": {
            "type": "string"
        },
        "professorSiape": {
            "type": "string"
        },
        "professorDepartment": {
            "type": "string"
        },
        "averageScore": {
            "type": "number"
        },
        "numberOfFeedbacks": {
            "type": "number"
        },
        "assiduityScore": {
            "type": "number"
        },
        "clarityScore": {
            "type": "number"
        },
        "relationshipScore": {
            "type": "number"
        },
    }
}