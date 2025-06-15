
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, context, type = 'general' } = await req.json()

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('Authentication required')
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Prepare the system prompt based on the analysis type
    const systemPrompts = {
      analysis: "You are a business analyst AI. Provide data-driven insights and analysis. Focus on metrics, performance indicators, and quantitative analysis.",
      recommendation: "You are a strategic business advisor AI. Provide actionable recommendations and strategic guidance. Focus on next steps and implementation strategies.",
      automation: "You are a process optimization AI. Identify opportunities for automation and efficiency improvements. Focus on workflow optimization and technology solutions.",
      general: "You are a general business consultant AI. Provide comprehensive business advice and insights. Be practical and actionable in your responses."
    }

    const systemPrompt = systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.general
    const fullPrompt = context 
      ? `Context: ${context}\n\nQuestion: ${prompt}`
      : prompt

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: fullPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`)
    }

    const openaiData = await openaiResponse.json()
    const aiContent = openaiData.choices[0]?.message?.content

    if (!aiContent) {
      throw new Error('No response from OpenAI')
    }

    // Generate insights with structured data
    const insights = {
      content: aiContent,
      type,
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
      category: type === 'analysis' ? 'Performance' : type === 'recommendation' ? 'Strategy' : type === 'automation' ? 'Efficiency' : 'General',
      priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      suggestions: [
        `Consider implementing this ${type} approach gradually`,
        `Monitor key metrics to track progress`,
        `Gather stakeholder feedback during implementation`
      ],
      actionItems: [
        `Review the ${type} recommendations`,
        `Create an implementation timeline`,
        `Identify required resources and budget`
      ]
    }

    // Save to database
    const { data: savedInsight, error: saveError } = await supabaseClient
      .from('ai_insights')
      .insert({
        user_id: user.id,
        type,
        content: insights.content,
        prompt,
        context,
        category: insights.category,
        priority: insights.priority,
        confidence: insights.confidence,
        suggestions: insights.suggestions,
        action_items: insights.actionItems
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving insight:', saveError)
      // Continue without saving if there's an error
    }

    return new Response(
      JSON.stringify({
        ...insights,
        id: savedInsight?.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in ai-business-insights function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
