import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("="*60)
print("GEMINI API KEY TEST")
print("="*60)

if not api_key:
    print("❌ ERROR: No API key found in .env file")
    exit(1)

# Remove quotes if present
api_key = api_key.strip('"\'')

print(f"✓ API Key loaded: {api_key[:20]}...{api_key[-10:]}")
print(f"✓ Key length: {len(api_key)} characters")
print()

try:
    # Configure the API
    genai.configure(api_key=api_key)
    print("✓ API configured successfully")
    
    # Try to list available models
    print("\nAttempting to list available models...")
    models = genai.list_models()
    
    print("✓ API key is VALID!")
    print("\nAvailable Gemini models:")
    for model in models:
        if 'gemini' in model.name.lower():
            print(f"  - {model.name}")
    
    # Try a simple generation test
    print("\n" + "="*60)
    print("Testing text generation...")
    print("="*60)
    
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Say 'Hello, the API is working!' in one sentence.")
    
    print(f"✓ Generation successful!")
    print(f"Response: {response.text}")
    print("\n" + "="*60)
    print("✅ ALL TESTS PASSED - API KEY IS WORKING!")
    print("="*60)
    
except Exception as e:
    print("\n" + "="*60)
    print("❌ API KEY TEST FAILED")
    print("="*60)
    error_msg = str(e).lower()
    
    if "429" in str(e) or "quota" in error_msg or "resource exhausted" in error_msg:
        print("\n🚫 ERROR TYPE: Quota Exceeded")
        print("\nYour API key has exceeded its quota limit.")
        print("\nSOLUTIONS:")
        print("1. Create a NEW Google Cloud project:")
        print("   - Go to: https://console.cloud.google.com/")
        print("   - Click 'NEW PROJECT' (not select existing)")
        print("   - Create project with a new name")
        print("   - Go to: https://aistudio.google.com/app/apikey")
        print("   - Select your NEW project")
        print("   - Create API key")
        print("   - Update .env file")
        print()
        print("2. Enable billing on your project for unlimited quota")
        print("   - Very cheap: ~$0.001 per request")
        print()
        print("3. Wait 24 hours for quota reset (resets at midnight UTC)")
        
    elif "api key" in error_msg and ("invalid" in error_msg or "not valid" in error_msg):
        print("\n🚫 ERROR TYPE: Invalid API Key")
        print("\nYour API key is not valid or has been revoked.")
        print("\nSOLUTION:")
        print("Get a new API key from: https://aistudio.google.com/app/apikey")
        
    elif "permission" in error_msg or "forbidden" in error_msg:
        print("\n🚫 ERROR TYPE: Permission Denied")
        print("\nThe API key doesn't have permission to use Gemini API.")
        print("\nSOLUTION:")
        print("1. Go to: https://console.cloud.google.com/")
        print("2. Enable 'Generative Language API'")
        print("3. Create a new API key")
        
    else:
        print(f"\n🚫 ERROR TYPE: Unknown")
        print(f"\nError details: {e}")
    
    print("\n" + "="*60)
    exit(1)
