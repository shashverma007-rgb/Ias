IAS GAMING — VERSION 2

FILES
- index.html — login/signup screen and game-card dashboard
- style.css — dark gaming theme
- app.js — Supabase email login, session restore and logout

IMPORTANT
This project uses Supabase for real authentication. Do not paste a Supabase service_role/secret key into app.js or any public GitHub file. The browser uses only the anon/publishable key.

A. CREATE SUPABASE PROJECT
1. Go to https://supabase.com/ and create a project.
2. In Project Settings > API, copy the Project URL and anon/public or publishable key.
3. In app.js replace:
   PASTE_YOUR_SUPABASE_PROJECT_URL_HERE
   PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE
4. Do not paste the service_role/secret key into app.js.

B. SIGN-IN
Sign in with your email address and password. The username entered at signup is
a display name and cannot be used to log in. No Edge Function is needed.

C. EMAIL CONFIRMATION AND URLS
1. Supabase Dashboard > Authentication > URL Configuration.
2. Set Site URL to your GitHub Pages URL, including the repository path and
   trailing slash (for example https://YOUR-USER.github.io/Ias/).
3. Add that same URL to Redirect URLs. Signup explicitly requests a redirect
   to the page where the signup occurred; its URL must be allowed here.
   If users can sign up from /Ias/index.html as well, allow that URL too.
4. If the confirmation email template was customized, use Supabase's
   {{ .ConfirmationURL }} link rather than a hard-coded redirect.
5. Keep email confirmation enabled if possible. A user may need to confirm their email before first login.

D. UPLOAD TO GITHUB
1. Sign in at https://github.com/.
2. Open your IAS repository, or create a repository named IAS.
3. Upload index.html, style.css and app.js to the repository root.
4. Commit changes.

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
- Log in using your email address and password.
- Log out and test again.

LIMITATIONS / NEXT STEPS
- This is a front-end gaming portal, not a multiplayer game server.
- Rivals is currently a placeholder card; connect its real published game URL.
- Display names are not guaranteed to be unique and cannot be used to log in.
