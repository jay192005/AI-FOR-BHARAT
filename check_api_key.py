"""
Quick API key validation test
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

api_key = os.getenv("GEMINI_API_KEY")

print("=" * 60)
print("GEMINI API KEY VALIDATION")
print("=" * 60)

# Remove quotes if present
api_key = api_key.strip('"\'') if api_key else None

print(f"\n1. API Key Found: {'Yes' if api_key else 'No'}")
if api_key:
    print(f"   Key Preview: {api_key[:20]}...{api_key[-10:]}")
    print(f"   Key Length: {len(api_key)} characters")

if not api_key:
    print("\n❌ ERROR: No API key found in .env file")
    exit(1)

# Configure and test
print("\n2. Configuring Gemini API...")
try:
    genai.configure(api_key=api_key)
    print("   ✅ Configuration successful")
except Exception as e:
    print(f"   ❌ Configuration failed: {e}")
    exit(1)

# Test with a simple generation
print("\n3. Testing API key with simple request...")
try:
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Say 'API key is working!' in one sentence.")
    print(f"   ✅ API Response: {response.text.strip()}")
    print("\n" + "=" * 60)
    print("✅ API KEY IS VALID AND WORKING!")
    print("=" * 60)
except Exception as e:
    error_msg = str(e).lower()
    print(f"   ❌ API Test Failed: {e}")
    print("\n" + "=" * 60)
    
    if "expired" in error_msg or "invalid" in error_msg:
        print("❌ API KEY IS EXPIRED OR INVALID")
        print("\nTo fix:")
        print("1. Go to: https://aistudio.google.com/app/apikey")
        print("2. Create a new API key")
        print("3. Update .env file with new key")
    elif "quota" in error_msg or "limit" in error_msg:
        print("❌ API QUOTA EXCEEDED")
        print("\nWait 24 hours or enable billing")
    else:
        print("❌ UNKNOWN ERROR")
        print("\nCheck your internet connection and try again")
    
    print("=" * 60)
    exit(1)
