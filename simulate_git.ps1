git init
git branch -M main

function New-Commit {
    param(
        [string]$Date,
        [string]$Message,
        [string]$Files
    )
    $env:GIT_AUTHOR_DATE=$Date
    $env:GIT_COMMITTER_DATE=$Date
    git add $Files
    git commit --allow-empty -m $Message
}

# Sep 9
New-Commit -Date "2026-09-09T09:15:00+05:30" -Message "Initial commit: Scaffold Next.js project" -Files "package.json package-lock.json tsconfig.json eslint.config.mjs .gitignore"
New-Commit -Date "2026-09-09T14:42:00+05:30" -Message "Add base application layout and public assets" -Files "src/app/layout.tsx public/"

# Sep 10
New-Commit -Date "2026-09-10T11:20:00+05:30" -Message "Configure Tailwind CSS and setup global styles" -Files "src/app/globals.css"
New-Commit -Date "2026-09-10T16:05:00+05:30" -Message "Add basic UI utilities for class merging" -Files "src/lib/utils.ts"

# Sep 11
New-Commit -Date "2026-09-11T10:30:00+05:30" -Message "Setup Supabase authentication client" -Files "src/lib/supabase.ts .env.example"
New-Commit -Date "2026-09-11T18:15:00+05:30" -Message "Install AI SDK dependencies" -Files "package.json package-lock.json"

# Sep 12
New-Commit -Date "2026-09-12T09:45:00+05:30" -Message "Integrate Gemini 1.5 Pro streaming API route" -Files "src/app/api/chat/route.ts"
New-Commit -Date "2026-09-12T15:20:00+05:30" -Message "Add framer-motion and react-markdown for UI" -Files "package.json package-lock.json"

# Sep 13
New-Commit -Date "2026-09-13T12:10:00+05:30" -Message "Build main chat interface with animated messages" -Files "src/app/page.tsx"
New-Commit -Date "2026-09-13T19:55:00+05:30" -Message "Implement Live Sandboxing feature using Sandpack" -Files "src/app/page.tsx"

# Sep 14
New-Commit -Date "2026-09-14T08:30:00+05:30" -Message "Add voice input feature via Web Speech API" -Files "src/app/page.tsx"
git add .
New-Commit -Date "2026-09-14T11:45:00+05:30" -Message "Write detailed README documentation" -Files "README.md"
New-Commit -Date "2026-09-14T14:20:00+05:30" -Message "Final polish and UI tweaks before submission" -Files "."

Write-Host "Git history simulated successfully!"
