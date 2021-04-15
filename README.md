# ![logo](https://github.com/rishivijayv/screenshots/blob/main/food-inspector/logo80.png?raw=true) The Food Inspector

## Overview
This single page application tells you what it thinks about your food. Upload an image of a food item that you'd like the inspector to analyze, and get the inspector's opinion within seconds. <br>
You can access the app [here](https://thefoodinspector.herokuapp.com/). The app might take longer to load than usual if it is being accessed after a long time. 

## Tech Stack
The Food Inspector is a **Django (Python)** project that uses a **React** app to manage the frontend using the **Material UI** framework for frontend components. The **Clarifai API** is used to analyze user uploaded images. The directories in the project contain the following information: <br>
| Directory       | Information |
| --------------- | ------------- |
| food_inspector  | Contains project level settings and configuration  |
| api             | Retrieves information about food item from Clarifai API |
| frontend        | Handles the project UI |

## Demo
Below are some screenshots of the project. 

### Landing Page
This is the page displayed to the user when they first access the application

![landing_page](https://github.com/rishivijayv/screenshots/blob/main/food-inspector/landing-page.png?raw=true)

### Image Upload and Preview
Users can then upload a food image and preview it before submitting. Users can reset and begin again if they are not happy with their food image

![image_preview](https://github.com/rishivijayv/screenshots/blob/main/food-inspector/image-preview.png?raw=true)

###  Keywords for Food
Finally, users can view what The Inspector thinks of their food based on 5 keywords The Inspector associates with the item along with how sure the Inspector is about its guess.

![keywords](https://github.com/rishivijayv/screenshots/blob/main/food-inspector/keywords.png?raw=true)
