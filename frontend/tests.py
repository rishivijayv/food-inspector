from django.test import TestCase
from django.urls import reverse

class LandingPageStatusCodeTests(TestCase):
    """
    Check GET request to index has a status code of 200 and is successful
    """
    def test_landing_page_get_success(self):
        url = reverse('frontend:index')
        response = self.client.get(url)
        self.assertTrue(response.status_code, 200)
