from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from fpdf import FPDF
from io import BytesIO
from django.http import FileResponse

@api_view(["POST"])
def text_to_pdf_api(request):
    """
    Accepts text input as JSON and returns a generated PDF file.
    """
    user_text = request.data.get("text", "")

    if not user_text.strip():
        return Response(
            {"error": "No text provided."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, user_text)

    # Save to memory
    buffer = BytesIO()
    pdf.output(buffer)
    buffer.seek(0)

    # Return PDF file as response
    response = FileResponse(buffer, content_type='application/pdf')
    response["Content-Disposition"] = 'attachment; filename="generated.pdf"'
    return response

