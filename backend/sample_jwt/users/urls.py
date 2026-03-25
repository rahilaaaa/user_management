from rest_framework.routers import DefaultRouter#automatically generates RESTful URLs for your ViewSets
from . import views
from django.urls import path, include
router = DefaultRouter()

router.register(r'admin/users', views.UserAdminViewSet, basename='admin-user' )#registering url here 

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path("profile/", views.UserProfileViews.as_view(), name="profile"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path('', include(router.urls)) #includes all those URLs into this app’s urlpatterns
]
