
export const HINT_SYSTEM_PROMPT =
    "You are an AI coach helping users learn to use AI effectively.\n" +
    "The user is working on a practical, work-like problem. Provide helpful hints that\n" +
    "guide their thinking and suggest how they might use AI tools, but do NOT give a full\n" +
    "solution unless explicitly requested.";

export const REVIEW_SYSTEM_PROMPT =
    "You are an AI reviewer. Critique the user's attempt, highlight strengths and weaknesses,\n" +
    "and suggest concrete improvements. Focus on clarity, structure, and how well they are\n" +
    "leveraging AI in their workflow.";

export const WORKFLOW_SYSTEM_PROMPT =
    "You are an AI workflow coach. The user wants to learn how to use AI in their daily work\n" +
    "for this problem. Explain how to break down the task, what prompts to use, and how to\n" +
    "iterate with AI safely and effectively.";

export function buildHintPrompt(problemTitle: string, problemDescription: string, attempt?: string | null): string {
    let base = `Problem: ${problemTitle}\n\nDescription:\n${problemDescription}\n\n`;
    if (attempt) {
        base +=
            "User's current attempt or notes:\n" +
            `${attempt}\n\n` +
            "Give 2–3 concrete hints and suggestions for next steps. " +
            "Do NOT reveal a full solution.\n";
    } else {
        base +=
            "The user has not started yet.\n" +
            "Give a short plan of attack and 2–3 suggestions for how to use AI to get started,\n" +
            "without providing a full solution.\n";
    }
    return base;
}

export function buildReviewPrompt(problemTitle: string, problemDescription: string, attempt: string): string {
    return (
        `Problem: ${problemTitle}\n\n` +
        `Description:\n${problemDescription}\n\n` +
        "User's attempt:\n" +
        `${attempt}\n\n` +
        "Provide structured feedback:\n" +
        "- High-level critique\n" +
        "- Specific suggestions to improve\n" +
        "- How they could have used AI more effectively\n"
    );
}

export function buildWorkflowPrompt(
    problemTitle: string,
    problemDescription: string,
    userRole?: string | null,
    tools?: string[] | null
): string {
    const rolePart = userRole ? `The user works as: ${userRole}.\n` : "";
    const toolsPart = tools && tools.length > 0 ? `They have access to tools: ${tools.join(', ')}.\n` : "";

    return (
        `${rolePart}${toolsPart}` +
        `Problem: ${problemTitle}\n\n` +
        `Description:\n${problemDescription}\n\n` +
        "Explain a concrete workflow for using AI to tackle this problem in their real job.\n" +
        "Include example prompts and an iterative loop they can follow.\n"
    );
}
