from django.http import JsonResponse
import torch
from PIL import Image
from torchvision import transforms
import io
import base64

# @csrf_exempt
def predict_image(request):
    if request.method == 'POST':
        # Retrieve the base64-encoded image data from the request body
        image_data = request.POST.get('image')
        print(image_data);

        # Decode the base64-encoded image data
        image_bytes = base64.b64decode(image_data)

        # Load the image from bytes
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        # Apply the image transformation
        transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        image = transform(image)

        # Add a batch dimension
        image = image.unsqueeze(0)

        # Perform prediction using the pre-trained model
        with torch.no_grad():
            output = model(image)

        # Get the top three predicted categories and their confidence scores
        _, predicted_idxs = torch.topk(output, 3)
        categories = [categories[idx.item()] for idx in predicted_idxs]
        confidences = [torch.softmax(output, 1)[0][idx].item() for idx in predicted_idxs]

        # Create JSON response
        response_data = {
            'categories': categories,
            'confidences': confidences
        }
        return JsonResponse(response_data)
    else:
        # Return an error response if the request method is not POST
        response_data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(response_data, status=400)
