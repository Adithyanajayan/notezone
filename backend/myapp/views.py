from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Notes, Subject
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Notes
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes



from .serializers import NotesSerializer
from django.db.models import Avg, Sum
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    NotesSerializer,
    SubjectSerializer
)

# ---------------- TOKEN GENERATOR ----------------
def get_tokens_for_user(user):
    """Generate JWT access and refresh tokens for a user"""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# ---------------- REGISTER VIEW ----------------
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'tokens': tokens,
                'message': 'User registered successfully!'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------------- LOGIN VIEW ----------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            return Response({
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role,
                },
                'tokens': tokens,
                'message': 'Login successful!'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------------- SUBJECT VIEWSET ----------------
class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]


# ---------------- NOTES VIEWSET ----------------
class NotesViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

def recent_notes(request):
    notes = Notes.objects.order_by('-created_at')[:10]
    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def dashboard_stats(request):
    total_notes = Notes.objects.count()
    total_downloads = Notes.objects.aggregate(Sum('downloads'))['downloads__sum'] or 0
    avg_rating = Notes.objects.aggregate(Avg('rating'))['rating__avg'] or 0

    return Response({
        "total_notes": total_notes,
        "total_downloads": total_downloads,
        "average_rating": round(avg_rating, 1)
    })


@api_view(['POST'])
def download_note(request, pk):
    try:
        note = Notes.objects.get(id=pk)
        note.downloads += 1
        note.save()
        return Response({"message": "Download counted!"}, status=status.HTTP_200_OK)
    except Notes.DoesNotExist:
        return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

class AddNoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(uploader=request.user)
            return Response({
                "message": "Note added successfully!",
                "note": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([AllowAny])  # or IsAuthenticated if needed
def search_notes(request):
    search = request.GET.get("search", "")
    category = request.GET.get("category", "")
    rating = request.GET.get("rating", "")
    sort_by = request.GET.get("sort", "relevance")

    notes = Notes.objects.all()

    # SEARCH: title, description, subject name
    if search:
        notes = notes.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search) |
            Q(subject__name__icontains=search)
        )

    # FILTER: category (subject)
    if category:
        notes = notes.filter(subject__name__icontains=category)

    # FILTER: rating (>=)
    if rating:
        notes = notes.filter(rating__gte=float(rating))

    # SORTING
    if sort_by == "rating":
        notes = notes.order_by("-rating")
    elif sort_by == "downloads":
        notes = notes.order_by("-downloads")
    else:
        # relevance → no sorting change
        pass

    serializer = NotesSerializer(notes, many=True)
    return Response(serializer.data)