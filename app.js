// IAS Gaming V2 — Supabase authentication.
// Paste your Supabase Project URL and publishable/anon key below.
// NEVER put your Supabase service_role/secret key in this file.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE";

const configured = SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("PASTE_") &&
  !SUPABASE_ANON_KEY.includes("PASTE_");
const supabaseClient = configured
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const $ = (id) => document.getElementById(id);
const authView = $("auth-view");
const dashboardView = $("dashboard-view");
const form = $("auth-form");
let mode = "login";

$("year").textContent = new Date().getFullYear();

function showMessage(text, success = false) {
  $("auth-message").textContent = text;
  $("auth-message").className = success ? "message success" : "message";
}
function setMode(next) {
  mode = next;
  const signup = mode === "signup";
  $("login-tab").classList.toggle("active", !signup);
  $("signup-tab").classList.toggle("active", signup);
  $("username-wrap").classList.toggle("hidden", !signup);
  $("email-wrap").classList.toggle("hidden", !signup);
  $("login-wrap").classList.toggle("hidden", signup);
  $("username").required = signup;
  $("email").required = signup;
  $("login-id").required = !signup;
  $("form-title").textContent = signup ? "Create account" : "Log in";
  $("form-subtitle").textContent = signup
    ? "Create your IAS player account."
    : "Enter your username or email and password.";
  $("password").autocomplete = signup ? "new-password" : "current-password";
  $("submit-button").innerHTML = signup ? 'CREATE ACCOUNT <span>→</span>' : 'LOG IN <span>→</span>';
  showMessage("");
}
$("login-tab").addEventListener("click", () => setMode("login"));
$("signup-tab").addEventListener("click", () => setMode("signup"));

function showDashboard(user, fallbackName = "") {
  $("welcome-name").textContent =
    user?.user_metadata?.username || fallbackName || user?.email?.split("@")[0] || "Player";
  authView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
}
function showAuth() {
  dashboardView.classList.add("hidden");
  authView.classList.remove("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabaseClient) {
    showMessage("Setup required: add your Supabase URL and public key in app.js.");
    return;
  }
  const password = $("password").value;
  const button = $("submit-button");
  button.disabled = true;
  showMessage(mode === "signup" ? "Creating your account..." : "Signing you in...");

  try {
    if (mode === "signup") {
      const username = $("username").value.trim();
      const email = $("email").value.trim();
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        throw new Error("Username must be 3–20 characters: letters, numbers or underscores.");
      }
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      const { data, error } = await supabaseClient.auth.signUp({
        email, password, options: { data: { username } }
      });
      if (error) throw error;
      if (data.session) showDashboard(data.user, username);
      else {
        showMessage("Account created! Check your email to confirm, then log in with your username or email.", true);
        setMode("login");
      }
    } else {
      const loginId = $("login-id").value.trim();
      let email = loginId;
      if (!loginId.includes("@")) {
        const { data, error } = await supabaseClient.functions.invoke("username-login", {
          body: { username: loginId, password }
        });
        if (error) throw new Error(error.message || "Username login failed. Check Edge Function setup.");
        if (!data?.access_token || !data?.refresh_token) {
          throw new Error(data?.error || "Username or password is incorrect.");
        }
        const { data: sessionData, error: sessionError } =
          await supabaseClient.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token
          });
        if (sessionError) throw sessionError;
        showDashboard(sessionData.user, loginId);
        return;
      }
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      showDashboard(data.user);
    }
  } catch (error) {
    showMessage(error.message || "Something went wrong. Please try again.");
  } finally {
    button.disabled = false;
  }
});

$("logout-button").addEventListener("click", async () => {
  if (supabaseClient) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) { showMessage(error.message); return; }
  }
  showAuth();
  form.reset();
  setMode("login");
});

document.querySelectorAll("[data-game]").forEach((button) => {
  button.addEventListener("click", () => {
    const url = button.dataset.url;
    if (url) window.location.href = url;
    else alert("Rivals is ready for its game link. Add the published game URL in the game card in index.html.");
  });
});

async function restoreSession() {
  if (!supabaseClient) return;
  const { data } = await supabaseClient.auth.getSession();
  if (data.session?.user) showDashboard(data.session.user);
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (session?.user) showDashboard(session.user);
  });
}
restoreSession();
