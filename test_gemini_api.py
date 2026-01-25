# Test Gemini API Key
import os
from dotenv import load_dotenv
import google.generativeai as genai

print("="*60)
print("Testing Gemini API Key")
print("="*60)

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: GEMINI_API_KEY not found in .env file")
    exit(1)

# Remove quotes if present
api_key = api_key.strip('"\'')

print(f"\n✓ API Key found: {api_key[:20]}...{api_key[-10:]}")
print(f"✓ API Key length: {len(api_key)} characters")

# Configure Gemini
try:
    genai.configure(api_key=api_key)
    print("✓ Gemini configured successfully")
except Exception as e:
    print(f"❌ ERROR configuring Gemini: {e}")
    exit(1)

# Test with a simple prompt
print("\n" + "-"*60)
print("Testing API with a simple prompt...")
print("-"*60)

try:
    model = genai.GenerativeModel('models/gemini-2.0-flash-exp')
    
    test_prompt = "Say 'Hello! The API key is working!' in exactly those words."
    
    print(f"\nSending test prompt: '{test_prompt}'")
    print("\nWaiting for response...")
    
    response = model.generate_content(test_prompt)
    
    print("\n" + "="*60)
    print("✅ SUCCESS! API Key is Working!")
    print("="*60)
    print(f"\nResponse from Gemini:")
    print(f"{response.text}")
    print("\n" + "="*60)
    print("Your Gemini API key is valid and working correctly!")
    print("="*60)
    
except Exception as e:
    print("\n" + "="*60)
    print("❌ ERROR: API Key Test Failed")
    print("="*60)
    print(f"\nError details: {e}")
    print("\nPossible issues:")
    print("1. API key is invalid or expired")
    print("2. API key doesn't have proper permissions")
    print("3. Quota exceeded")
    print("4. Network connection issue")
    print("\nGet a new API key from: https://aistudio.google.com/app/apikey")
    print("="*60)
    exit(1)
