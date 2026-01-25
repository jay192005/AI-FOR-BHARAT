import requests
import io

print("="*60)
print("TESTING FILE UPLOAD TO BACKEND")
print("="*60)

# Create a test text file
test_content = """
RENTAL AGREEMENT

This agreement states that the tenant must pay rent on the 1st of each month.
The security deposit is non-refundable under any circumstances.
The landlord may access the property without notice at any time.
Late fees of 10% will be charged for payments after the 5th.
"""

# Create a file-like object
test_file = io.BytesIO(test_content.encode('utf-8'))
test_file.name = 'test_agreement.txt'

# Prepare the request
url = "http://127.0.0.1:5000/api/analyze"
files = {
    'file': ('test_agreement.txt', test_file, 'text/plain')
}
data = {
    'state': 'Maharashtra',
    'email': 'test@example.com'
}

print(f"\nSending POST request to: {url}")
print(f"File: test_agreement.txt ({len(test_content)} bytes)")
print(f"State: Maharashtra")
print("\n" + "="*60)

try:
    response = requests.post(url, files=files, data=data, timeout=60)
    
    print(f"\nResponse Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ FILE UPLOAD SUCCESS!")
        print(f"Rating: {result.get('ratingText', 'N/A')} ({result.get('ratingScore', 0)}/100)")
        print(f"Summary: {result.get('shortSummary', 'N/A')[:100]}...")
        print(f"Red Flags: {len(result.get('redFlags', []))}")
        print(f"Recommendations: {len(result.get('recommendations', []))}")
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(f"Response: {response.text}")
        
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ CONNECTION ERROR: Cannot connect to backend")
    print(f"Make sure the backend is running on http://127.0.0.1:5000")
    print(f"Error: {e}")
    
except requests.exceptions.Timeout:
    print(f"\n❌ TIMEOUT: Request took too long (>60s)")
    print("The AI analysis might be taking longer than expected")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")

print("\n" + "="*60)
