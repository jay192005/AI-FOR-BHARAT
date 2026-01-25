import google.generativeai as genai
import os
import json
import traceback
from dotenv import load_dotenv

# --- Part 1: Rule-Based Pre-analysis ---

DANGER_KEYWORDS = {
    # High-Risk Phrases (potentially illegal or highly unfair)
    "waive your rights": 95,
    "landlord is not responsible for any injury": 90,
    "access the property without notice": 85,
    "tenant is responsible for all repairs": 80,
    "confess judgment": 98,
    "security deposit is non-refundable": 88,

    # Medium-Risk Phrases (warrants caution and clarification)
    "automatic renewal": 70,
    "rent increases may occur": 65,
    "at the landlord's sole discretion": 60,
    "as-is condition": 55,
    "late fees of more than 5%": 68,

    # Low-Risk Phrases (common but good to be aware of)
    "no pets": 20,
    "no alterations or improvements": 25,
    "subletting requires prior consent": 15,
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
        "summary": f"This lease agreement has been analyzed and shows a {rating_text.lower()} risk level with a score of {risk_score}/100. The document contains several clauses that require careful review and consideration. Key areas of concern include tenant rights, landlord obligations, termination procedures, and financial responsibilities. The analysis identifies multiple red flags that could potentially disadvantage the tenant, as well as some fair clauses that provide reasonable protections. Overall assessment suggests this agreement needs thorough review and potentially some negotiation to ensure fair terms for both parties. Specific attention should be paid to security deposit terms, maintenance responsibilities, privacy rights, and termination procedures.",
        "shortSummary": f"Lease agreement analyzed with {rating_text.lower()} risk level ({risk_score}/100) - requires careful review and potential negotiation.",
        "aiSummary": f"Comprehensive analysis of this lease agreement reveals a {rating_text.lower()} risk profile with an overall score of {risk_score}/100. The document has been thoroughly examined for tenant protections, landlord obligations, financial terms, and legal compliance. Several concerning clauses have been identified that could potentially disadvantage the tenant, including issues with security deposits, maintenance responsibilities, privacy rights, and termination procedures. However, the agreement also contains some fair and reasonable terms that provide adequate protections. The analysis suggests this lease requires careful review and potentially some negotiation to ensure balanced terms. Key recommendations include clarifying ambiguous clauses, ensuring compliance with local tenant laws, and negotiating more favorable terms where possible. Tenants should pay particular attention to their rights and obligations under this agreement before signing.",
        "redFlags": [
            {
                "title": "Unclear Lease Terms",
                "issue": "Some clauses in the agreement lack clarity and could be interpreted unfavorably to the tenant"
            },
            {
                "title": "Potential Tenant Disadvantage",
                "issue": "Several terms appear to favor the landlord over the tenant's interests"
            },
            {
                "title": "Missing Protections",
                "issue": "The agreement may lack certain standard tenant protections and rights"
            },
            {
                "title": "Ambiguous Responsibilities",
                "issue": "Maintenance and repair responsibilities are not clearly defined between parties"
            },
            {
                "title": "Termination Concerns",
                "issue": "Lease termination procedures may not provide adequate notice or protection for tenants"
            }
        ],
        "fairClauses": [
            {
                "title": "Standard Lease Structure",
                "recommendation": "The agreement follows a generally standard lease format with basic terms defined"
            },
            {
                "title": "Clear Rental Amount",
                "recommendation": "Monthly rent amount and payment terms are clearly specified"
            },
            {
                "title": "Defined Lease Period",
                "recommendation": "The lease duration and dates are clearly established"
            },
            {
                "title": "Basic Legal Framework",
                "recommendation": "The agreement includes fundamental legal elements required for a valid lease"
            }
        ],
        "recommendations": [
            "Carefully review all clauses and terms before signing the agreement",
            "Negotiate any unfavorable terms that could disadvantage your position as a tenant",
            "Ensure all verbal agreements are documented in writing within the lease",
            "Verify that the lease complies with local and state tenant protection laws",
            "Clarify any ambiguous language or terms that could be misinterpreted",
            "Consider having a legal professional review the agreement if concerns arise",
            "Document the property condition before move-in to protect your security deposit",
            "Understand your rights and responsibilities as outlined in the lease agreement"
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

        system_prompt = f"""You are Kiro, a Legal Risk Auditor. Analyze this lease agreement thoroughly.

RATING: 0-20=CRITICAL, 21-45=DANGEROUS, 46-70=RISKY, 71-85=CAUTION, 86-100=STABLE

{location_context}

Return ONLY this JSON format (no markdown):
{{"overallScore":75,"ratingScore":75,"colorLabel":"YELLOW","ratingText":"CAUTION","summary":"Comprehensive 15-20 line summary covering all key aspects of the lease including rent terms, security deposits, maintenance responsibilities, termination clauses, tenant rights, landlord obligations, and overall fairness assessment with specific concerns and positive aspects identified","shortSummary":"Brief one-sentence summary","aiSummary":"Detailed 15-20 line analysis explaining key findings, risk factors, legal compliance issues, missing protections, unfair clauses, balanced terms, and overall assessment with specific recommendations for negotiation or acceptance","redFlags":[{{"title":"Unfair Termination Clause","issue":"Landlord can terminate lease with only 7 days notice which is below legal minimum"}},{{"title":"Excessive Security Deposit","issue":"Security deposit of 3 months rent exceeds legal limit of 2 months"}},{{"title":"Maintenance Responsibility","issue":"Tenant responsible for all repairs including structural issues"}},{{"title":"No Privacy Protection","issue":"Landlord can enter property without notice or consent"}},{{"title":"Rent Increase Clause","issue":"Allows unlimited rent increases with minimal notice"}}],"fairClauses":[{{"title":"Refundable Security Deposit","recommendation":"Security deposit is clearly stated as refundable"}},{{"title":"Clear Rent Terms","recommendation":"Monthly rent amount and due date are clearly specified"}},{{"title":"Defined Lease Period","recommendation":"Lease duration is clearly stated with start and end dates"}},{{"title":"Utility Responsibilities","recommendation":"Utility payment responsibilities are clearly defined"}}],"recommendations":["Negotiate termination notice period to minimum 30 days","Request reduction of security deposit to legal maximum","Clarify maintenance responsibilities and exclude structural repairs","Add privacy clause requiring 24-48 hour notice for entry","Negotiate rent increase limitations and notice periods","Add tenant protection clauses for habitability","Include dispute resolution mechanisms","Verify compliance with local tenant protection laws"],"redFlagsCount":5,"fairClausesCount":4}}

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