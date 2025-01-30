{
"title": "Player Routes API Testing Guide",
"base_url": "http://localhost:3000",
"headers": {
"Content-Type": "application/json",
"Authorization": "Bearer YOUR_JWT_TOKEN"
},
"routes": {
"1. Register": {
"method": "POST",
"endpoint": "/player/register",
"description": "Register a new player",
"body": {
"Name": "John Doe",
"Email": "john.doe@example.com",
"Password": "securepass123",
"Gender": "Male",
"Dob": "1995-05-15",
"Contact_number": "+1234567890",
"Skill_level": "Intermediate"
},
"expected_response": {
"status": 201,
"body": {
"message": "Player registered successfully"
}
}
},

    "2. Login": {
      "method": "POST",
      "endpoint": "/player/login",
      "description": "Login with registered credentials",
      "body": {
        "Email": "john.doe@example.com",
        "Password": "securepass123"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "token": "jwt_token_here",
          "player": {
            "id": 1,
            "email": "john.doe@example.com",
            "name": "John Doe"
          }
        }
      }
    },

    "3. Logout": {
      "method": "POST",
      "endpoint": "/player/logout",
      "description": "Logout current user",
      "body": {},
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Logged out successfully",
          "redirect": "/home"
        }
      }
    },

    "4. Get Home": {
      "method": "GET",
      "endpoint": "/player/1/home",
      "description": "Get player's home page data",
      "params": {
        "id": "1"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "calendar": [
            {
              "event_id": 1,
              "event_name": "Training Session",
              "event_date": "2024-02-01T10:00:00",
              "description": "Regular training session"
            }
          ],
          "academyUpdates": [
            {
              "update_id": 1,
              "title": "New Coach Joining",
              "content": "We're excited to announce...",
              "publish_date": "2024-01-28T09:00:00"
            }
          ],
          "upcomingTournaments": [
            {
              "tournament_id": 1,
              "name": "Spring Championship",
              "date": "2024-03-15",
              "venue": "Main Stadium"
            }
          ]
        }
      }
    },

    "5. Get Profile": {
      "method": "GET",
      "endpoint": "/player/1/profile",
      "description": "Get player's profile",
      "params": {
        "id": "1"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "Player_id": 1,
          "Name": "John Doe",
          "Email": "john.doe@example.com",
          "Gender": "Male",
          "Dob": "1995-05-15",
          "Contact_number": "+1234567890",
          "Skill_level": "Intermediate"
        }
      }
    },

    "6. Get Players by Skill Set": {
      "method": "GET",
      "endpoint": "/player/skill-set/Intermediate",
      "description": "Get players by skill level",
      "params": {
        "skill-set": "Intermediate"
      },
      "expected_response": {
        "status": 200,
        "body": [
          {
            "Player_id": 1,
            "Name": "John Doe",
            "Skill_level": "Intermediate"
          },
          {
            "Player_id": 2,
            "Name": "Jane Smith",
            "Skill_level": "Intermediate"
          }
        ]
      }
    },

    "7. Get Update Form": {
      "method": "GET",
      "endpoint": "/player/1/profile/update",
      "description": "Get player's current data for update form",
      "params": {
        "id": "1"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "Player_id": 1,
          "Name": "John Doe",
          "Email": "john.doe@example.com",
          "Gender": "Male",
          "Dob": "1995-05-15",
          "Contact_number": "+1234567890",
          "Skill_level": "Intermediate"
        }
      }
    },

    "8. Update Profile": {
      "method": "PUT",
      "endpoint": "/player/1/profile/update",
      "description": "Update player's profile",
      "params": {
        "id": "1"
      },
      "body": {
        "Name": "John Updated Doe",
        "Contact_number": "+1987654321",
        "Skill_level": "Advanced"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Profile updated successfully"
        }
      }
    },

    "9. Delete Player": {
      "method": "DELETE",
      "endpoint": "/player/1/delete",
      "description": "Delete player account",
      "params": {
        "id": "1"
      },
      "expected_response": {
        "status": 200,
        "body": {
          "message": "Player deleted successfully"
        }
      }
    }

},

"testing_steps": [
"1. Start by registering a new user with the Register route",
"2. Login with the registered credentials to get JWT token",
"3. Add the JWT token to Authorization header for all subsequent requests",
"4. Test remaining routes in any order",
"5. Test error cases by providing invalid data",
"6. End by testing the delete route (note: this will remove the test account)"
],

"error_test_cases": {
"Registration": {
"duplicate_email": {
"Email": "john.doe@example.com",
"expected_status": 409
},
"invalid_password": {
"Password": "123",
"expected_status": 400
}
},
"Login": {
"wrong_password": {
"Password": "wrongpass",
"expected_status": 401
},
"non_existent_email": {
"Email": "nonexistent@example.com",
"expected_status": 404
}
}
}
}
