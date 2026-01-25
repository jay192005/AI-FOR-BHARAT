import requests
import json

print("="*60)
print("TESTING BACKEND API")
print("="*60)

# Test text
test_text = """
RENTAL AGREEMENT
This agreement states that the tenant must pay rent on the 1st of each month.
The security deposit is non-refundable under any circumstances.
"""

# Prepare the request
url = "http://127.0.0.1:5000/api/analyze"
data = {
    'text': test_text,
    'state': 'Maharashtra',
    'email': 'test@example.com'
}

print(f"\nSending POST request to: {url}")
print(f"Data: text={len(test_text)} chars, state=Maharashtra")
print("\n" + "="*60)

try:
    response = requests.post(url, data=data, timeout=30)
    
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SUCCESS!")
        print(f"Rating: {result.get('ratingText', 'N/A')} ({result.get('ratingScore', 0)}/100)")
        print(f"Summary: {result.get('shortSummary', 'N/A')[:100]}...")
        print(f"Red Flags: {len(result.get('redFlags', []))}")
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(f"Response: {response.text}")
        
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ CONNECTION ERROR: Cannot connect to backend")
    print(f"Make sure the backend is running on http://127.0.0.1:5000")
    print(f"Error: {e}")
    
except requests.exceptions.Timeout:
    print(f"\n❌ TIMEOUT: Request took too long")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")

print("\n" + "="*60)
