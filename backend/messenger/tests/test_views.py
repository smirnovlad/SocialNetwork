from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.users_url = reverse('users')
        self.messages_url = reverse('messages')
        self.chatlist_url = reverse('chatlist')

    def test_user_post(self):
        user_data = {
            'username': 'test_username',
            'first_name': 'Alex',
            'last_name': 'Smith',
            'bornAt': '1970-01-01',
            'homeTown': 'LA'
        }
        response = self.client.post(self.users_url, data=user_data)
        print(response.data)
        self.assertEqual(response.status_code, 401)
