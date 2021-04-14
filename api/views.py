from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_pb2, status_code_pb2

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from . import helpers

# Can be removed when deploying
import json


# Loads the API key
with open('tempConfig.json') as config_file:
    config = json.load(config_file)
    CLARIFAI_KEY = config['CLARIFAI_API_KEY']
    MODEL_ID = config['MODEL_ID']
    
"""
Exempting CSRF because this does not use cookies. According to this stack overflow answer:
https://security.stackexchange.com/a/166798, I do not need to use CSRF protection.
I still use CORS to ensure the request only originates from origins that I have whitelisted
(see CORS_ORIGIN_WHITELIST in settings.py for more)
"""
@csrf_exempt
def keywords(request):
    if request.method != 'POST':
        # Method not allowed
        return JsonResponse(helpers.create_error_response(405), status=405)

    # Check if request has a foodImage file
    if 'foodImage' not in request.FILES:
        return JsonResponse(helpers.create_error_response(400), status=400)
        
    # Retrieving image from the request
    food_image = request.FILES['foodImage'].file.read()


    # Client setup
    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)
    metadata = (('authorization', f'Key {CLARIFAI_KEY}'),)
    
    
    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            model_id = f"{MODEL_ID}",
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=resources_pb2.Image(
                            base64=food_image
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )

    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        # Something went wrong while retrieving info from Clarifai - 502
        return JsonResponse(helpers.create_error_response(502), status=502)

    # Since only one image was sent, there is only one output
    output = post_model_outputs_response.outputs[0]    

    return JsonResponse(helpers.create_success_response(output.data.concepts[:5]))


