IAS GAMING — VERSION 2

FILES
- index.html — login/signup screen and game-card dashboard
- style.css — dark gaming theme
- app.js — Supabase auth, username/email login, session restore and logout
- supabase/functions/username-login/index.ts — secure server-side username-to-email login function

IMPORTANT
This project uses Supabase for real authentication. Do not paste a Supabase service_role/secret key into app.js or any public GitHub file. The browser uses only the anon/publishable key. The Edge Function uses the service role key on the server.

A. CREATE SUPABASE PROJECT
1. Go to https://supabase.com/ and create a project.
2. In Project Settings > API, copy the Project URL and anon/public or publishable key.
3. In app.js replace:
   PASTE_YOUR_SUPABASE_PROJECT_URL_HERE
   PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE
4. Do not paste the service_role/secret key into app.js.

B. DEPLOY USERNAME LOGIN EDGE FUNCTION
Username-to-email lookup must happen securely on the server. This project includes a Supabase Edge Function.

Recommended setup from a computer:
1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Open a terminal in the project folder.
3. Run: supabase login
4. Run: supabase link --project-ref YOUR_PROJECT_REF
   Find project ref in Supabase project URL or Project Settings > General.
5. Set server-side secrets:
   supabase secrets set SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
   The Edge Function runtime provides SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY automatically in Supabase-hosted functions. If your project does not provide them, set them through the Supabase secrets manager, never in browser files.
6. Deploy:
   supabase functions deploy username-login
7. In Supabase Dashboard > Edge Functions, confirm username-login is deployed.

The function uses the server-side service role key only to look up the username. It verifies the password with the regular Supabase Auth password sign-in. Do not expose the function's service role key.

C. EMAIL CONFIRMATION AND URLS
1. Supabase Dashboard > Authentication > URL Configuration.
2. Add your GitHub Pages URL to Site URL and Redirect URLs after publishing.
3. Keep email confirmation enabled if possible. A user may need to confirm their email before first login.

D. UPLOAD TO GITHUB
1. Sign in at https://github.com/.
2. Open your IAS repository, or create a repository named IAS.
3. Upload index.html, style.css and app.js to the repository root.
4. Upload the whole supabase folder too, preserving this path:
   supabase/functions/username-login/index.ts
5. Commit changes.

E. ENABLE GITHUB PAGES
1. Repository > Settings > Pages.
2. Under Build and deployment choose Deploy from a branch.
3. Select branch main and folder /(root), then Save.
4. Wait for GitHub to publish the website. Copy the URL shown on the Pages screen.
5. Add that URL in Supabase Authentication > URL Configuration as described above.

F. ADD A GAME LINK
In index.html, find the Rivals card's button:
<button class="play-button" data-game="rivals">PLAY ↗</button>
Add your published game URL like this:
<button class="play-button" data-game="rivals" data-url="https://YOUR-GAME-LINK">PLAY ↗</button>
Replace the example with the real public game URL.

TESTING
- Sign up with a username, email and password (at least 8 characters).
- Confirm your email if confirmation is enabled.
- Log in using either the email address OR username, plus password.
- Log out and test again.

LIMITATIONS / NEXT STEPS
- This is a front-end gaming portal, not a multiplayer game server.
- Rivals is currently a placeholder card; connect its real published game URL.
- The username-login function scans Supabase Auth users in pages up to 20,000 users. For a large production platform, replace this with a dedicated username table, uniqueness enforcement, rate limiting and monitoring.
- Add CAPTCHA/rate limiting to the login function before opening public registration widely.
- The function should be deployed and tested before relying on username login. Email login works directly through Supabase Auth.
