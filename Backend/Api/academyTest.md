{
"title": "Academy Routes API Testing Guide",
"base_url": "http://localhost:3000",
"headers": {
"Content-Type": "application/json",
"Authorization": "Bearer YOUR_JWT_TOKEN"
},
"routes": {
"1. Register Academy": {
"method": "POST",
"endpoint": "/academy/register",
"description": "Register a new academy",
"body": {
"name": "Champion Sports Academy",
"location": "123 Sports Street",
"contact_email": "info@championsports.com",
"contact_phone": "+1234567890",
"city": "New York",
"description": "Premier sports training facility",
"website_url": "https://championsports.com",
"specialization": "Tennis, Swimming",
"password": "SecurePass123!"
},
"expected_response": {
"status": 201,
"body": {
"message": "Academy registered successfully!"
}
}
},

    "2. Login Academy": {
      "method": "POST",
      "endpoint": "/academy/login",
      "description": "Login with registered credentials",
      "body": {
        "email": "info@championsports.com",
        "password": "SecurePass123!"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "token": "jwt_token_here",
          "academy": {
            "id": "uuid-here",
            "name": "Champion Sports Academy",
            "email": "info@championsports.com"
          }
        }
      }
    },

    "3. Logout Academy": {
      "method": "POST",
      "endpoint": "/academy/logout",
      "description": "Logout current academy",
      "auth_required": true,
      "body": {},
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Logged out successfully",
          "redirect": "/home"
        }
      }
    },

    "4. Get Academy Home": {
      "method": "GET",
      "endpoint": "/academy/123e4567-e89b-12d3-a456-426614174000/home",
      "description": "Get academy's home page data",
      "auth_required": true,
      "expected_response": {
        "status": 200,
        "body": {
          "calendar": [
            {
              "event_id": 1,
              "event_name": "Summer Training Camp",
              "event_date": "2024-02-15T09:00:00",
              "description": "Intensive summer training program"
            }
          ],
          "updates": [
            {
              "update_id": 1,
              "title": "New Facilities Opening",
              "content": "We're excited to announce our new indoor courts",
              "publish_date": "2024-01-30T10:00:00"
            }
          ],
          "tournaments": [
            {
              "tournament_id": 1,
              "name": "Junior Championship",
              "tournament_date": "2024-03-01",
              "venue": "Main Court",
              "registration_deadline": "2024-02-15"
            }
          ]
        }
      }
    },

    "5. Get Academies by City": {
      "method": "GET",
      "endpoint": "/academy/city/New York",
      "description": "Get list of academies in a specific city",
      "expected_response": {
        "status": 200,
        "body": {
          "academies": [
            {
              "Academy_id": "123e4567-e89b-12d3-a456-426614174000",
              "name": "Champion Sports Academy",
              "location": "123 Sports Street",
              "contact_email": "info@championsports.com",
              "city": "New York",
              "specialization": "Tennis, Swimming"
            }
          ]
        }
      }
    },

    "6. Get Academy Profile": {
      "method": "GET",
      "endpoint": "/academy/123e4567-e89b-12d3-a456-426614174000/profile",
      "description": "Get academy's profile",
      "auth_required": true,
      "expected_response": {
        "status": 200,
        "body": {
          "Academy_id": "123e4567-e89b-12d3-a456-426614174000",
          "name": "Champion Sports Academy",
          "location": "123 Sports Street",
          "contact_email": "info@championsports.com",
          "contact_phone": "+1234567890",
          "city": "New York",
          "description": "Premier sports training facility",
          "website_url": "https://championsports.com",
          "specialization": "Tennis, Swimming"
        }
      }
    },

    "7. Get Update Form": {
      "method": "GET",
      "endpoint": "/academy/123e4567-e89b-12d3-a456-426614174000/profile/update",
      "description": "Get academy's current data for update form",
      "auth_required": true,
      "expected_response": {
        "status": 200,
        "body": {
          "Academy_id": "123e4567-e89b-12d3-a456-426614174000",
          "name": "Champion Sports Academy",
          "location": "123 Sports Street",
          "contact_email": "info@championsports.com",
          "contact_phone": "+1234567890",
          "city": "New York",
          "description": "Premier sports training facility",
          "website_url": "https://championsports.com",
          "specialization": "Tennis, Swimming"
        }
      }
    },

    "8. Update Profile": {
      "method": "PUT",
      "endpoint": "/academy/123e4567-e89b-12d3-a456-426614174000/profile/update",
      "description": "Update academy's profile",
      "auth_required": true,
      "body": {
        "name": "Champion Sports Academy International",
        "contact_phone": "+1987654321",
        "description": "Updated premier sports training facility",
        "website_url": "https://championsports.international",
        "specialization": "Tennis, Swimming, Basketball"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Academy updated successfully!"
        }
      }
    },

    "9. Delete Academy": {
      "method": "DELETE",
      "endpoint": "/academy/123e4567-e89b-12d3-a456-426614174000/delete",
      "description": "Delete academy account",
      "auth_required": true,
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Academy deleted successfully!"
        }
      }
    }

},

"error_test_cases": {
"Registration": {
"duplicate_email": {
"body": {
"contact_email": "info@championsports.com"
},
"expected_status": 409,
"expected_message": "Academy already registered with this email"
},
"missing_required_fields": {
"body": {
"name": "Test Academy"
},
"expected_status": 400,
"expected_message": "Required fields are missing"
}
},
"Login": {
"invalid_credentials": {
"body": {
"email": "info@championsports.com",
"password": "wrongpassword"
},
"expected_status": 401,
"expected_message": "Invalid password"
},
"non_existent_email": {
"body": {
"email": "nonexistent@example.com",
"password": "password123"
},
"expected_status": 404,
"expected_message": "Academy not found"
}
}
},

"testing_steps": [
"1. Start by registering a new academy using the Register route",
"2. Login with the registered credentials to get the JWT token",
"3. Add the JWT token to Authorization header for protected routes",
"4. Test each route according to the sequence above",
"5. Test error cases using the provided error test cases",
"6. Finally, test the delete route (this will remove the test account)"
]
}
