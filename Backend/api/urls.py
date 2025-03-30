from django.urls import path
from .views import api_home, RegisterView, LoginView, FileUploadView, FileListView, dashboard_stats, user_profile, update_username, update_phone, manage_address

urlpatterns = [
    path('', api_home, name='api-home'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('files/', FileListView.as_view(), name='file-list'),
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
    path('profile/', user_profile, name='user-profile'),
    path('profile/update-username/', update_username, name='update-username'),
    path('profile/update-phone/', update_phone, name="update_phone"),
    path('profile/address/', manage_address, name="manage_address"),

]
