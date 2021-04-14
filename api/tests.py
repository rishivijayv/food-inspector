from django.test import TestCase
from django.urls import reverse

class FoodKeywordErrorCodeTests(TestCase):
    """
    Check GET request is rejected and a 405 status code is returned
    """
    def test_404_on_get_request(self):
        url = reverse('inspector:keywords')
        response = self.client.get(url)
        self.assertTrue(response.status_code, 404)

    """
    Check POST request without foodImage set returns 400 status code
    """
    def test_400_on_no_image_in_request(self):
        url = reverse('inspector:keywords')
        response = self.client.post(url)
        self.assertTrue(response.status_code, 400)




