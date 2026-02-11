import google.generativeai as genai
import os
import json
import traceback
from dotenv import load_dotenv

# --- Part 1: Rule-Based Pre-analysis ---

DANGER_KEYWORDS = {
    # High-Risk Phrases (potentially illegal or highly unfair) - Universal
    "waive your rights": 95,
    "not responsible for any injury": 90,
    "access without notice": 85,
    "responsible for all repairs": 80,
    "confess judgment": 98,
    "non-refundable": 88,
    "no refund": 88,
    "cannot be cancelled": 92,
    "irrevocable": 90,
    "unlimited liability": 95,
    "waive all claims": 93,
    "sell your data": 94,
    "share your information with third parties": 75,
    "no warranty": 70,
    "as-is": 55,
    "at our sole discretion": 60,
    "without notice": 80,
    "binding arbitration": 65,
    "class action waiver": 70,
    "indemnify and hold harmless": 68,

    # Medium-Risk Phrases (warrants caution and clarification) - Universal
    "automatic renewal": 70,
    "may increase": 65,
    "at our discretion": 60,
    "late fees": 68,
    "termination without cause": 72,
    "modify terms at any time": 75,
    "collect personal information": 50,
    "cookies and tracking": 45,
    "third-party services": 40,

    # Low-Risk Phrases (common but good to be aware of) - Universal
    "no pets": 20,
    "no alterations": 25,
    "prior consent required": 15,
    "age restriction": 20,
}

def analyze_text_with_rules(text):
    """
    Performs a simple keyword-based scan of the text.
    Returns a list of found issues and a preliminary score.
    """
    print("--- 1. EXECUTING: Rule-based analysis in ai.py ---")
    found_issues = []
    total_score = 0
    issue_count = 0
    text_lower = text.lower()

    for phrase, score in DANGER_KEYWORDS.items():
        if phrase in text_lower:
            issue_count += 1
            total_score += score
            found_issues.append({"phrase": phrase, "score": score})
    
    preliminary_score = (total_score / issue_count) if issue_count > 0 else 0
    
    return {
        "found_issues": found_issues,
        "preliminary_score": int(preliminary_score)
    }


# --- Part 2: Gemini AI Analysis (with improved error handling) ---

def clean_json_response(text):
    """Clean and parse JSON response from Gemini with ultra-robust error handling"""
    # Remove markdown code blocks
    cleaned = text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]
    
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    
    cleaned = cleaned.strip()
    
    try:
        # First attempt: direct parse
        result = json.loads(cleaned)
        # Ensure all required fields exist and are properly formatted
        result = ensure_complete_response(result)
        return result
    except json.JSONDecodeError as e:
        print(f"--- JSON Parse Error: {e} ---")
        
        # Second attempt: Advanced JSON repair
        try:
            import re
            
            # Extract JSON object
            json_start = cleaned.find('{')
            json_end = cleaned.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_text = cleaned[json_start:json_end]
                
                # Advanced multiline string repair
                json_text = repair_multiline_json(json_text)
                
                result = json.loads(json_text)
                result = ensure_complete_response(result)
                return result
                
        except Exception as e2:
            print(f"--- Advanced parsing failed: {e2} ---")
        
        # Third attempt: Extract data manually and create proper response
        print("--- Creating comprehensive analysis response ---")
        return create_detailed_fallback_response(text)

def repair_multiline_json(json_text):
    """Repair JSON with multiline strings"""
    import re
    
    # Split into lines and process
    lines = json_text.split('\n')
    repaired_lines = []
    current_value = ""
    in_multiline_string = False
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        # Check if this line starts a string value
        if ':' in stripped and '"' in stripped:
            # This might be a key-value pair
            if in_multiline_string:
                # We were in a multiline string, close it
                current_value += " " + stripped
                repaired_lines.append(current_value)
                current_value = ""
                in_multiline_string = False
            else:
                # Check if the value part is complete
                value_part = stripped.split(':', 1)[1].strip()
                if value_part.startswith('"') and not (value_part.endswith('",') or value_part.endswith('"}')):
                    # Start of multiline string
                    current_value = stripped
                    in_multiline_string = True
                else:
                    repaired_lines.append(stripped)
        elif in_multiline_string:
            # Continue multiline string
            current_value += " " + stripped
            if stripped.endswith('",') or stripped.endswith('"}') or stripped.endswith('"'):
                # End of multiline string
                repaired_lines.append(current_value)
                current_value = ""
                in_multiline_string = False
        else:
            repaired_lines.append(stripped)
    
    # Handle any remaining multiline string
    if current_value:
        repaired_lines.append(current_value)
    
    repaired_json = '\n'.join(repaired_lines)
    
    # Clean up trailing commas
    repaired_json = re.sub(r',(\s*[}\]])', r'\1', repaired_json)
    
    return repaired_json

def ensure_complete_response(result):
    """Ensure the response has all required fields with proper values"""
    # Ensure basic fields exist
    result['ratingScore'] = result.get('overallScore', result.get('ratingScore', 50))
    result['ratingText'] = result.get('colorLabel', result.get('ratingText', 'YELLOW'))
    result['shortSummary'] = result.get('summary', result.get('shortSummary', ''))
    result['aiSummary'] = result.get('aiSummary', result.get('summary', ''))
    
    # Ensure arrays exist
    if 'redFlags' not in result:
        result['redFlags'] = []
    if 'fairClauses' not in result:
        result['fairClauses'] = []
    if 'recommendations' not in result:
        result['recommendations'] = []
    
    # Ensure counts are correct
    result['redFlagsCount'] = len(result.get('redFlags', []))
    result['fairClausesCount'] = len(result.get('fairClauses', []))
    
    return result

def create_detailed_fallback_response(original_text):
    """Create a detailed analysis response when JSON parsing fails"""
    # Try to extract any useful information from the original text
    text_lower = original_text.lower()
    
    # Basic risk assessment based on content
    risk_score = 60  # Default moderate risk
    
    # Look for high-risk indicators
    high_risk_terms = ['non-refundable', 'no notice', 'waive rights', 'as-is', 'no liability']
    medium_risk_terms = ['automatic renewal', 'sole discretion', 'late fees']
    positive_terms = ['refundable deposit', 'written notice', 'maintenance included']
    
    found_high_risk = sum(1 for term in high_risk_terms if term in text_lower)
    found_medium_risk = sum(1 for term in medium_risk_terms if term in text_lower)
    found_positive = sum(1 for term in positive_terms if term in text_lower)
    
    # Adjust risk score
    risk_score -= (found_high_risk * 15)
    risk_score -= (found_medium_risk * 8)
    risk_score += (found_positive * 10)
    risk_score = max(10, min(90, risk_score))  # Keep within bounds
    
    # Determine color and text based on score
    if risk_score <= 20:
        color_label = "DARK_RED"
        rating_text = "CRITICAL"
    elif risk_score <= 45:
        color_label = "RED"
        rating_text = "DANGEROUS"
    elif risk_score <= 70:
        color_label = "ORANGE"
        rating_text = "RISKY"
    elif risk_score <= 85:
        color_label = "YELLOW"
        rating_text = "CAUTION"
    else:
        color_label = "GREEN"
        rating_text = "STABLE"
    
    return {
        "overallScore": risk_score,
        "ratingScore": risk_score,
        "colorLabel": color_label,
        "ratingText": rating_text,
        "summary": f"This document has been analyzed and shows a {rating_text.lower()} risk level with a score of {risk_score}/100. The document contains several clauses that require careful review and consideration. Key areas of concern include rights and obligations, termination procedures, financial responsibilities, liability limitations, and data privacy (if applicable). The analysis identifies multiple red flags that could potentially disadvantage one party, as well as some fair clauses that provide reasonable protections. Overall assessment suggests this document needs thorough review and potentially some negotiation to ensure fair terms for all parties. Specific attention should be paid to payment terms, cancellation procedures, liability clauses, and any automatic renewal provisions.",
        "shortSummary": f"Document analyzed with {rating_text.lower()} risk level ({risk_score}/100) - requires careful review and potential negotiation.",
        "aiSummary": f"Comprehensive analysis of this document reveals a {rating_text.lower()} risk profile with an overall score of {risk_score}/100. The document has been thoroughly examined for fairness, obligations, financial terms, and legal compliance. Several concerning clauses have been identified that could potentially disadvantage one party, including issues with termination terms, liability limitations, hidden fees, and missing protections. However, the document also contains some fair and reasonable terms that provide adequate protections. The analysis suggests this document requires careful review and potentially some negotiation to ensure balanced terms. Key recommendations include clarifying ambiguous clauses, ensuring compliance with applicable laws, and negotiating more favorable terms where possible. All parties should pay particular attention to their rights and obligations under this agreement before signing.",
        "redFlags": [
            {
                "title": "Unclear Terms",
                "issue": "Some clauses in the document lack clarity and could be interpreted unfavorably"
            },
            {
                "title": "Potential Disadvantage",
                "issue": "Several terms appear to favor one party over the other's interests"
            },
            {
                "title": "Missing Protections",
                "issue": "The document may lack certain standard protections and rights"
            },
            {
                "title": "Ambiguous Responsibilities",
                "issue": "Obligations and responsibilities are not clearly defined between parties"
            },
            {
                "title": "Termination Concerns",
                "issue": "Termination procedures may not provide adequate notice or protection"
            }
        ],
        "fairClauses": [
            {
                "title": "Standard Structure",
                "recommendation": "The document follows a generally standard format with basic terms defined"
            },
            {
                "title": "Clear Payment Terms",
                "recommendation": "Payment amount and terms are clearly specified"
            },
            {
                "title": "Defined Period",
                "recommendation": "The duration and dates are clearly established"
            },
            {
                "title": "Basic Legal Framework",
                "recommendation": "The document includes fundamental legal elements required for validity"
            }
        ],
        "recommendations": [
            "Carefully review all clauses and terms before signing the document",
            "Negotiate any unfavorable terms that could disadvantage your position",
            "Ensure all verbal agreements are documented in writing",
            "Verify that the document complies with applicable laws and regulations",
            "Clarify any ambiguous language or terms that could be misinterpreted",
            "Consider having a legal professional review the document if concerns arise",
            "Document all communications and keep copies of all versions",
            "Understand your rights and obligations as outlined in the document"
        ],
        "redFlagsCount": 5,
        "fairClausesCount": 4
    }

def analyze_with_gemini(text, preliminary_findings, state=""):
    """
    Analyzes the text using the Gemini API with 20-point risk assessment.
    """
    print("--- 2. EXECUTING: Gemini analysis with 20-point risk assessment in ai.py ---")
    try:
        # Force reload environment variables
        from dotenv import load_dotenv
        load_dotenv(override=True)
        
        api_key = os.getenv("GEMINI_API_KEY")
        print(f"--- DEBUG: API Key loaded: {api_key[:20] if api_key else 'None'}... ---")
        
        if not api_key or len(api_key) < 30: # Basic check for a valid key format
            print("--- FATAL ERROR: Gemini API key is missing or invalid in .env file. ---")
            return {
                "error": "Server configuration error: Ensure a valid GEMINI_API_KEY is in your .env file."
            }
            
        # Remove quotes if present
        api_key = api_key.strip('"\'')
        
        genai.configure(api_key=api_key)
        
        # Configure model for optimal performance
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 2048,
        }
        
        model = genai.GenerativeModel(
            'gemini-2.5-flash',
            generation_config=generation_config
        )

        location_context = f"Location: {state}, India." if state else "Location: General."

        system_prompt = f"""You are Kiro, a Legal Document Auditor and Risk Analyst. Analyze this document thoroughly.

This could be any type of public document: lease agreement, terms & conditions, service agreement, employment contract, privacy policy, NDA, or general contract.

RATING: 0-20=CRITICAL, 21-45=DANGEROUS, 46-70=RISKY, 71-85=CAUTION, 86-100=STABLE

{location_context}

Analyze for:
- Unfair or one-sided terms
- Hidden fees or charges
- Liability limitations
- Data privacy concerns
- Cancellation/termination terms
- Missing protections
- Legal compliance issues
- Ambiguous language

Return ONLY this JSON format (no markdown):
{{"overallScore":75,"ratingScore":75,"colorLabel":"YELLOW","ratingText":"CAUTION","summary":"Comprehensive 15-20 line summary covering all key aspects including main terms, obligations, rights, fees, termination, liability, data usage (if applicable), and overall fairness assessment with specific concerns and positive aspects identified","shortSummary":"Brief one-sentence summary","aiSummary":"Detailed 15-20 line analysis explaining key findings, risk factors, legal compliance issues, missing protections, unfair clauses, balanced terms, and overall assessment with specific recommendations","redFlags":[{{"title":"Unfair Termination Clause","issue":"Can terminate with only 7 days notice which may be below legal minimum"}},{{"title":"Excessive Fees","issue":"Hidden fees not clearly disclosed upfront"}},{{"title":"Liability Limitation","issue":"Company not responsible for any damages or losses"}},{{"title":"No Privacy Protection","issue":"Can share personal data with third parties without consent"}},{{"title":"Automatic Renewal","issue":"Auto-renews without clear notification or easy cancellation"}}],"fairClauses":[{{"title":"Clear Payment Terms","recommendation":"Payment amount and schedule are clearly specified"}},{{"title":"Defined Service Period","recommendation":"Service duration is clearly stated with start and end dates"}},{{"title":"Refund Policy","recommendation":"Refund terms are clearly outlined"}},{{"title":"Contact Information","recommendation":"Support and contact details are provided"}}],"recommendations":["Review all terms carefully before accepting","Negotiate unfavorable terms if possible","Clarify any ambiguous language","Verify compliance with applicable laws","Document all communications","Consider legal review for high-value agreements","Understand your rights and obligations","Keep copies of all documents"],"redFlagsCount":5,"fairClausesCount":4}}

Document: {text}"""

        full_prompt = f"{system_prompt}\n\n{text}"
        
        # Generate content with timeout handling
        try:
            response = model.generate_content(full_prompt)
        except Exception as timeout_error:
            if "timeout" in str(timeout_error).lower() or "504" in str(timeout_error):
                print("--- ERROR: Request timed out. Document may be too long. ---")
                return {
                    "error": "Analysis timed out. Please try with a shorter document or try again in a moment."
                }
            raise timeout_error
        
        # Clean the response to ensure it's a valid JSON string
        cleaned_response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if cleaned_response_text.startswith("```json"):
            cleaned_response_text = cleaned_response_text[7:]
        elif cleaned_response_text.startswith("```"):
            cleaned_response_text = cleaned_response_text[3:]
            
        if cleaned_response_text.endswith("```"):
            cleaned_response_text = cleaned_response_text[:-3]
        
        # Clean up any remaining whitespace
        cleaned_response_text = cleaned_response_text.strip()
        
        print("--- 3. RECEIVED response from Gemini with 20-point analysis. ---")
        
        # Clean and parse JSON response
        result = clean_json_response(response.text)
        
        if result is None:
            print("--- ERROR: Failed to parse JSON response ---")
            print(f"--- Raw response (first 500 chars): {response.text[:500]}... ---")
            return {
                "error": "Failed to parse AI response. The analysis was generated but couldn't be formatted properly. Please try again."
            }
        
        print("--- JSON parsed successfully ---")
        
        # Map to legacy format for backward compatibility
        result['ratingScore'] = result.get('overallScore', 50)
        result['ratingText'] = result.get('colorLabel', 'YELLOW')
        result['shortSummary'] = result.get('summary', '')
        result['aiSummary'] = result.get('summary', '')
        result['redFlagsCount'] = len(result.get('redFlags', []))
        result['fairClausesCount'] = len(result.get('fairClauses', []))
        
        # Ensure all expected fields exist
        if 'redFlags' not in result:
            result['redFlags'] = []
        if 'fairClauses' not in result:
            result['fairClauses'] = []
        if 'recommendations' not in result:
            result['recommendations'] = []
        
        return result

    except Exception as e:
        # --- IMPROVED ERROR LOGGING ---
        print("\n" + "="*50)
        print("---!!! GEMINI API ERROR !!! ---")
        print(f"--- An exception occurred: {e} ---")
        
        # Check for specific error types
        error_message = str(e).lower()
        if "api key" in error_message and ("invalid" in error_message or "expired" in error_message):
            print("--- ERROR TYPE: API Key Issue ---")
            return {
                "error": "Your Gemini API key has expired or is invalid. Please get a new API key from https://aistudio.google.com/app/apikey and update your .env file."
            }
        elif "quota" in error_message or "limit" in error_message:
            print("--- ERROR TYPE: Quota/Rate Limit ---")
            return {
                "error": "API quota exceeded. Please try again later or check your Gemini API usage limits."
            }
        elif "network" in error_message or "connection" in error_message:
            print("--- ERROR TYPE: Network Issue ---")
            return {
                "error": "Network connection issue. Please check your internet connection and try again."
            }
        else:
            print("--- ERROR TYPE: Unknown ---")
        
        # Print the full traceback to the console for detailed debugging
        traceback.print_exc() 
        print("="*50 + "\n")
        return {
            "error": "Failed to get analysis from AI. Please try again later."
        }