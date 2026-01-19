
// @ts-ignore
declare const Deno: any;

// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as prompts from './prompts.ts'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Get the user from the authorization header
        const authHeader = req.headers.get('Authorization')!
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))

        if (authError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        const { action, problemId, attempt, content, userRole, tools } = await req.json()

        // Fetch Problem
        const { data: problem, error: problemError } = await supabaseClient
            .from('problems')
            .select('*')
            .eq('id', problemId)
            .single()

        if (problemError || !problem) {
            return new Response(JSON.stringify({ error: 'Problem not found' }), {
                status: 404,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        let systemPrompt = ''
        let userPrompt = ''
        let role = ''

        if (action === 'hint') {
            systemPrompt = prompts.HINT_SYSTEM_PROMPT
            userPrompt = prompts.buildHintPrompt(problem.title, problem.description, attempt)
            role = 'hint'
        } else if (action === 'review') {
            systemPrompt = prompts.REVIEW_SYSTEM_PROMPT
            userPrompt = prompts.buildReviewPrompt(problem.title, problem.description, content)
            role = 'review'
        } else if (action === 'workflow') {
            systemPrompt = prompts.WORKFLOW_SYSTEM_PROMPT
            userPrompt = prompts.buildWorkflowPrompt(problem.title, problem.description, userRole, tools)
            role = 'workflow'
        } else {
            throw new Error('Invalid action')
        }

        // Call AI
        const aiResponse = await callAI(systemPrompt, userPrompt)

        // Save Interaction
        await supabaseClient.from('ai_interactions').insert({
            user_id: user.id,
            problem_id: problem.id,
            role: role,
            prompt: userPrompt,
            response: aiResponse
        })

        return new Response(JSON.stringify({ content: aiResponse }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})

async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
    const apiKey = Deno.env.get('GEMINI_API_KEY') || Deno.env.get('OPENAI_API_KEY')
    let baseUrl = Deno.env.get('LLM_BASE_URL')
    let model = Deno.env.get('LLM_MODEL')

    // Default to Gemini settings if Gemini key is present and defaults are not set
    if (Deno.env.get('GEMINI_API_KEY') && !baseUrl) {
        baseUrl = 'https://generativelanguage.googleapis.com/v1beta/openai'
    } else if (!baseUrl) {
        baseUrl = 'https://api.openai.com/v1'
    }

    if (Deno.env.get('GEMINI_API_KEY') && !model) {
        model = 'gemini-1.5-flash'
    } else if (!model) {
        model = 'gpt-3.5-turbo'
    }

    // If using local LLM via ngrok or similar, apiKey might be optional/dummy
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`
    }

    const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            stream: false
        })
    })

    const data = await res.json()
    return data.choices?.[0]?.message?.content || data.message?.content || "Error generating response"
}
