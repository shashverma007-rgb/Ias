IAS GAMING — VERSION 2

FILES
- index.html — login/signup screen and game-card dashboard
- style.css — dark gaming theme
- app.js — Supabase auth, username/email login, session restore and logout
- Username login requires a separately implemented and deployed Supabase Edge Function named username-login.

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
Username-to-email lookup must happen securely on the server. The username-login
function is not included in this project, so email login works but username login
will not work until a compatible function is implemented and deployed.

After implementing a compatible function, deployment requires the Supabase CLI:
1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Open a terminal in the project folder.
3. Run: supabase login
4. Run: supabase link --project-ref YOUR_PROJECT_REF
   Find project ref in Supabase project URL or Project Settings > General.
5. Configure any server-side secrets required by your implementation in
   Supabase, never in browser files.
6. Deploy the implemented function:
   supabase functions deploy username-login
7. In Supabase Dashboard > Edge Functions, confirm username-login is deployed.

The client sends a username and password and expects access_token and
refresh_token in the response. The function must verify the password through
Supabase Auth and protect any privileged credentials on the server.

C. EMAIL CONFIRMATION AND URLS
1. Supabase Dashboard > Authentication > URL Configuration.
2. Add your GitHub Pages URL to Site URL and Redirect URLs after publishing.
3. Keep email confirmation enabled if possible. A user may need to confirm their email before first login.

D. UPLOAD TO GITHUB
1. Sign in at https://github.com/.
2. Open your IAS repository, or create a repository named IAS.
3. Upload index.html, style.css and app.js to the repository root.
4. Commit changes. If you have implemented the optional username-login function,
   deploy it separately with the Supabase CLI.

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
- Log in using your email address and password. Username login additionally
  requires the separately implemented and deployed Edge Function.
- Log out and test again.

LIMITATIONS / NEXT STEPS
- This is a front-end gaming portal, not a multiplayer game server.
- Rivals is currently a placeholder card; connect its real published game URL.
- A username-login implementation needs uniqueness enforcement and appropriate
  abuse protection, including rate limiting, before public deployment.
- The function should be deployed and tested before relying on username login. Email login works directly through Supabase Auth.
