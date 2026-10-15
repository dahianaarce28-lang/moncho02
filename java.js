// Configuración de Supabase (Reemplaza con tus datos reales)


const SUPABASE_URL = "https://cpobjhcsvwosolvxwzce.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwb2JqaGNzdndvc29sdnh3emNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjc4MTksImV4cCI6MjEwNzY0MzgxOX0.OhhdMA0g2naBlO5rRS6MBC-MmoLaPE5sL-kFMT1ls1Q";
// Inicialización única del cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DOMINIO_PERMITIDO = "@miinstitucion.edu.py";

const form = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusMessage = document.getElementById("status-message");

function showMessage(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `message ${type}`;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusMessage.className = "message hidden";

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // 1. Validación en el Frontend
    if (!email.endsWith(DOMINIO_PERMITIDO)) {
        showMessage(`Acceso denegado: El correo debe ser del dominio ${DOMINIO_PERMITIDO}`, "error");
        return;
    }

    // 2. Registro con Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.error("Error backend:", error.message);
        showMessage(`Error: ${error.message}`, "error");
    } else {
        showMessage(`¡Registro exitoso! Revisa tu correo de confirmación: ${email}`, "success");
        form.reset();
    }
});
