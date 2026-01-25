"""
Simple test to verify backend /api/analyze endpoint
"""
import requests

print("=" * 60)
print("TESTING BACKEND /api/analyze ENDPOINT")
print("=" * 60)

# Test data
test_text = """
RENTAL AGREEMENT
Rent: $1000/month
Security deposit is non-refundable
Landlord may enter without notice
"""

# Prepare form data
files = {
    'text': (None, test_text),
    'state': (None, 'Maharashtra'),
    'email': (None, 'test@example.com')
}

print("\n1. Sending request to backend...")
print(f"   URL: http://127.0.0.1:5000/api/analyze")
print(f"   Text length: {len(test_text)} characters")

try:
    response = requests.post(
        'http://127.0.0.1:5000/api/analyze',
        files=files,
        timeout=60
    )
    
    print(f"\n2. Response received:")
    print(f"   Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"   Score: {result.get('ratingScore', 'N/A')}/100")
        print(f"   Rating: {result.get('ratingText', 'N/A')}")
        print(f"   Red Flags: {len(result.get('redFlags', []))}")
    else:
        print(f"\n❌ ERROR:")
        print(f"   Response: {response.text}")
        
except requests.exceptions.ConnectionError:
    print(f"\n❌ CONNECTION ERROR:")
    print(f"   Cannot connect to backend at http://127.0.0.1:5000")
    print(f"   Make sure backend is running: python app.py")
    
except requests.exceptions.Timeout:
    print(f"\n❌ TIMEOUT ERROR:")
    print(f"   Request took longer than 60 seconds")
    
except Exception as e:
    print(f"\n❌ UNEXPECTED ERROR:")
    print(f"   {e}")

print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
