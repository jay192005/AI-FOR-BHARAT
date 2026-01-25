"""
Check if JSON mode is supported in current google-generativeai version
"""
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(override=True)

print("=" * 60)
print("CHECKING JSON MODE SUPPORT")
print("=" * 60)

# Check version
try:
    import pkg_resources
    version = pkg_resources.get_distribution("google-generativeai").version
    print(f"\ngoogle-generativeai version: {version}")
except:
    print("\nCouldn't determine version")

# Configure API
api_key = os.getenv("GEMINI_API_KEY").strip('"\'')
genai.configure(api_key=api_key)

print("\nTesting JSON mode...")

try:
    # Try with JSON mode
    generation_config = {
        "temperature": 0.7,
        "response_mime_type": "application/json",
    }
    
    model = genai.GenerativeModel(
        'gemini-2.5-flash',
        generation_config=generation_config
    )
    
    response = model.generate_content(
        'Return this as JSON: {"test": "success", "value": 123}'
    )
    
    print(f"✅ JSON mode is SUPPORTED!")
    print(f"Response: {response.text[:200]}")
    
except Exception as e:
    error_msg = str(e)
    print(f"❌ JSON mode test failed: {e}")
    
    if "response_mime_type" in error_msg or "mime" in error_msg.lower():
        print("\n⚠️  JSON mode NOT supported in this version")
        print("   Recommendation: Update google-generativeai")
        print("   Run: pip install --upgrade google-generativeai")
    else:
        print(f"\n⚠️  Different error: {error_msg}")

print("\n" + "=" * 60)
