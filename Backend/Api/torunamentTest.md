{
"GET /tournament": {
"description": "Get all tournaments - No request body needed",
"response_example": {
"tournaments": [
{
"Tournament_id": "550e8400-e29b-41d4-a716-446655440000",
"Academy_id": "123e4567-e89b-12d3-a456-426614174000",
"Name": "Summer Cricket Championship 2024",
"Date": "2024-07-15",
"Location": "Mumbai Central Ground",
"description": "Annual summer cricket tournament for under-19 teams",
"Registration_fee": 5000,
"Prize_pool": 100000,
"Max_Teams": 16,
"Min_Teams": 8,
"registration_deadline": "2024-06-30"
}
]
}
},

"GET /tournament/:id": {
"description": "Get tournament by ID - No request body needed",
"params": {
"id": "550e8400-e29b-41d4-a716-446655440000"
},
"response_example": {
"tournament": {
"Tournament_id": "550e8400-e29b-41d4-a716-446655440000",
"Academy_id": "123e4567-e89b-12d3-a456-426614174000",
"Name": "Summer Cricket Championship 2024",
"Date": "2024-07-15",
"Location": "Mumbai Central Ground",
"description": "Annual summer cricket tournament for under-19 teams",
"Registration_fee": 5000,
"Prize_pool": 100000,
"Max_Teams": 16,
"Min_Teams": 8,
"registration_deadline": "2024-06-30"
}
}
},

"POST /academy/:id/create": {
"description": "Create a new tournament",
"params": {
"id": "123e4567-e89b-12d3-a456-426614174000"
},
"request_body": {
"Name": "Winter Cricket League 2024",
"Date": "2024-12-10",
"Location": "DY Patil Stadium",
"description": "Winter season cricket tournament featuring top academies",
"registrationfee": 7500,
"prizePool": 150000,
"maxteams": 12,
"minteams": 6,
"registrationDeadline": "2024-11-25"
}
},

"PUT /academy/:id/update": {
"description": "Update an existing tournament",
"params": {
"id": "123e4567-e89b-12d3-a456-426614174000"
},
"request_body": {
"tournamentId": "550e8400-e29b-41d4-a716-446655440000",
"Name": "Updated Winter Cricket League 2024",
"Description": "Updated tournament description",
"Registration_fee": 8000,
"Prize_pool": 200000,
"Max_Teams": 14,
"registration_deadline": "2024-11-30"
}
},

"DELETE /academy/:id/delete": {
"description": "Delete a tournament",
"params": {
"id": "123e4567-e89b-12d3-a456-426614174000"
},
"request_body": {
"tournamentId": "550e8400-e29b-41d4-a716-446655440000"
}
}
}
