import ai
from dotenv import load_dotenv

load_dotenv()

print("="*60)
print("TESTING DOCUMENT ANALYSIS")
print("="*60)

# Test text
test_text = """
RENTAL AGREEMENT

This agreement states that the tenant must pay rent on the 1st of each month.
The security deposit is non-refundable under any circumstances.
The landlord may access the property without notice at any time.
Late fees of 10% will be charged for payments after the 5th.
"""

print("\nTest Document:")
print(test_text)
print("\n" + "="*60)

# Step 1: Rule-based analysis
print("\nStep 1: Running rule-based analysis...")
preliminary = ai.analyze_text_with_rules(test_text)
print(f"✓ Found {len(preliminary['found_issues'])} potential issues")
print(f"✓ Preliminary score: {preliminary['preliminary_score']}")

# Step 2: Gemini analysis
print("\nStep 2: Running Gemini AI analysis...")
result = ai.analyze_with_gemini(test_text, preliminary, state="Maharashtra")

if "error" in result:
    print(f"❌ ERROR: {result['error']}")
else:
    print("✅ Analysis successful!")
    print(f"\nRating: {result.get('ratingText', 'N/A')} ({result.get('ratingScore', 0)}/100)")
    print(f"Summary: {result.get('shortSummary', 'N/A')}")
    print(f"Red Flags: {len(result.get('redFlags', []))}")
    print(f"Fair Clauses: {len(result.get('fairClauses', []))}")
    print(f"Recommendations: {len(result.get('recommendations', []))}")

print("\n" + "="*60)
print("TEST COMPLETE")
print("="*60)
