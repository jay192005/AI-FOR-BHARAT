#!/usr/bin/env python3

import sys
import os
sys.path.append('.')

from ai import analyze_text_with_rules, analyze_with_gemini

# Test document with various clauses
test_text = """
RENTAL AGREEMENT

This rental agreement is between John Doe (Landlord) and Jane Smith (Tenant).

Property: 123 Main Street, Apartment 2B, Mumbai, Maharashtra
Rent: $1,200 per month, due on the 1st of each month
Security Deposit: $2,400 (2 months rent, refundable)
Lease Term: 12 months starting January 1, 2024

Terms and Conditions:
1. Rent is due on the 1st of each month with a 5-day grace period
2. Late fees of $100 apply after the 5th of the month
3. No pets allowed without written consent
4. Tenant responsible for utilities (electricity, water, gas)
5. Landlord responsible for major repairs and maintenance
6. 30-day written notice required for termination by either party
7. Security deposit refundable within 30 days of lease end
8. Landlord must provide 24-hour notice before entering property
9. Tenant may not sublet without landlord's written permission
10. Property rented in current condition, tenant to maintain cleanliness

Additional Clauses:
- Automatic renewal for 6 months if no notice given
- Rent increases limited to 5% annually with 60-day notice
- Tenant has right to peaceful enjoyment of property
- Landlord maintains property insurance
- Disputes resolved through local housing authority
"""

print("="*60)
print("TESTING IMPROVED ANALYSIS WITH DETAILED RESPONSE")
print("="*60)

try:
    # Step 1: Rule-based analysis
    print("1. Rule-based analysis...")
    rule_results = analyze_text_with_rules(test_text)
    print(f"   ✅ Found {len(rule_results['found_issues'])} keyword issues")
    
    # Step 2: Gemini analysis
    print("\n2. Gemini AI analysis...")
    gemini_results = analyze_with_gemini(test_text, rule_results, "Maharashtra")
    
    if 'error' in gemini_results:
        print(f"   ❌ Error: {gemini_results['error']}")
    else:
        print("   ✅ SUCCESS! Detailed analysis completed")
        print(f"   Score: {gemini_results.get('overallScore', 'N/A')}/100")
        print(f"   Rating: {gemini_results.get('ratingText', 'N/A')}")
        print(f"   Red Flags: {len(gemini_results.get('redFlags', []))}")
        print(f"   Fair Clauses: {len(gemini_results.get('fairClauses', []))}")
        print(f"   Recommendations: {len(gemini_results.get('recommendations', []))}")
        
        # Show first few items
        if gemini_results.get('redFlags'):
            print(f"   First Red Flag: {gemini_results['redFlags'][0].get('title', 'N/A')}")
        if gemini_results.get('fairClauses'):
            print(f"   First Fair Clause: {gemini_results['fairClauses'][0].get('title', 'N/A')}")
        
        print(f"   Summary Length: {len(gemini_results.get('summary', ''))} chars")

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()

print("="*60)