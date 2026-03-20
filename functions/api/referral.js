export async function onRequestPost(context) {
  const { env } = context;

  try {
    const data = await context.request.json();

    // Validate required fields
    const required = ['referrer_name', 'referrer_email', 'referrer_phone', 'young_person_name', 'reason_for_referral'];
    for (const field of required) {
      if (!data[field] || !data[field].trim()) {
        return new Response(JSON.stringify({ success: false, error: `${field} is required` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (!data.consent_given) {
      return new Response(JSON.stringify({ success: false, error: 'Consent is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build HTML email
    const urgencyColors = { routine: '#1A5632', urgent: '#C5A028', crisis: '#DC2626' };
    const urgencyColor = urgencyColors[data.urgency] || '#1A5632';

    const emailHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1A5632; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Referral Received</h1>
          <p style="color: #C5A028; margin: 8px 0 0; font-size: 14px;">AVA HOUSE — Building Stronger Placements, Brighter Futures</p>
        </div>

        <div style="padding: 24px; background: #FAF8F0;">
          <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #1A5632; font-size: 18px; margin: 0 0 12px; border-bottom: 2px solid #F5E6B8; padding-bottom: 8px;">Urgency</h2>
            <span style="display: inline-block; padding: 4px 16px; border-radius: 20px; background: ${urgencyColor}; color: white; font-weight: 600; text-transform: uppercase; font-size: 14px;">${data.urgency || 'routine'}</span>
          </div>

          <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #1A5632; font-size: 18px; margin: 0 0 12px; border-bottom: 2px solid #F5E6B8; padding-bottom: 8px;">Referrer Information</h2>
            <p><strong>Name:</strong> ${data.referrer_name}</p>
            <p><strong>Organisation:</strong> ${data.referrer_organisation || 'N/A'}</p>
            <p><strong>Role:</strong> ${data.referrer_role || 'N/A'}</p>
            <p><strong>Email:</strong> ${data.referrer_email}</p>
            <p><strong>Phone:</strong> ${data.referrer_phone}</p>
          </div>

          <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #1A5632; font-size: 18px; margin: 0 0 12px; border-bottom: 2px solid #F5E6B8; padding-bottom: 8px;">Young Person Details</h2>
            <p><strong>Name:</strong> ${data.young_person_name}</p>
            <p><strong>Age/DOB:</strong> ${data.young_person_age || 'N/A'}</p>
            <p><strong>Gender:</strong> ${data.young_person_gender || 'N/A'}</p>
            <p><strong>Cultural Background:</strong> ${data.cultural_background || 'N/A'}</p>
            <p><strong>NDIS Number:</strong> ${data.ndis_number || 'N/A'}</p>
            <p><strong>Funding Type:</strong> ${data.funding_type || 'N/A'}</p>
          </div>

          <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #1A5632; font-size: 18px; margin: 0 0 12px; border-bottom: 2px solid #F5E6B8; padding-bottom: 8px;">Referral Details</h2>
            <p><strong>Support Types:</strong> ${(data.support_types || []).join(', ') || 'N/A'}</p>
            <p><strong>Current Living Situation:</strong> ${data.current_living_situation || 'N/A'}</p>
            <p><strong>Reason for Referral:</strong></p>
            <p style="background: #F5E6B8; padding: 12px; border-radius: 6px;">${data.reason_for_referral}</p>
          </div>
        </div>

        <div style="background: #0E3B22; padding: 16px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">This referral was submitted via avahouse.com.au</p>
        </div>
      </div>
    `;

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AVA HOUSE Referrals <onboarding@resend.dev>',
        to: ['margswork2214@gmail.com', 'tasigale68@gmail.com'],
        subject: `New Referral: ${data.young_person_name} — ${(data.urgency || 'routine').toUpperCase()}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();
      console.error('Resend error:', emailError);
      // Don't fail the whole request if email fails — still save to Supabase
    }

    // Save to Supabase
    const supabaseResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/referrals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        referrer_name: data.referrer_name,
        referrer_organisation: data.referrer_organisation || null,
        referrer_role: data.referrer_role || null,
        referrer_email: data.referrer_email,
        referrer_phone: data.referrer_phone,
        young_person_name: data.young_person_name,
        young_person_age: data.young_person_age || null,
        young_person_gender: data.young_person_gender || null,
        cultural_background: data.cultural_background || null,
        ndis_number: data.ndis_number || null,
        funding_type: data.funding_type || null,
        support_types: data.support_types || [],
        current_living_situation: data.current_living_situation || null,
        reason_for_referral: data.reason_for_referral,
        urgency: data.urgency || 'routine',
        consent_given: data.consent_given,
        status: 'new',
      }),
    });

    if (!supabaseResponse.ok) {
      const dbError = await supabaseResponse.text();
      console.error('Supabase error:', dbError);
      // Still return success if email sent — the referral was received
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Referral error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to process referral. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
