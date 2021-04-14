import json

# Only expect these error codes from this app. More can be added later
ERROR_CODES = {
    400: 'Bad Request',
    405: 'Method Not Allowed',
    502: 'Bad Gateway'
}

"""
Returns a clean dictionary representing the top 5 keywords predicted by clarifai 
from the image along with their probabilities. 
"""
def clean_clarifai_predictions(predictions):
    keyword_dict = {}
    
    for predict_obj in predictions:
        keyword_dict[predict_obj.name.capitalize()] = round(predict_obj.value, 2)
    
    return {
        "keywords": keyword_dict
    }

"""
Creates a python dictionary for sending a success response with top 5 keywords/keywords
identified by clarifai
"""
def create_success_response(predictions):
    data = clean_clarifai_predictions(predictions)
    return {
        "data": data
    }

"""
Creates a Python dictionary for sending an error response in case something goes wrong
while processing user request
"""
def create_error_response(error_code):
    return {
        "error": {
            "code": error_code,
            "message": ERROR_CODES[error_code]
        }
    }



