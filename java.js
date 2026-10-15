// Configuración de Supabase (Reemplazar con tus credenciales de proyecto)
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_ANON_KEY = "TU_ANON_KEY";

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

    // 1. Validación en el Frontend (Capación de interfaz)
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
        showMessage(`Error en el servidor: ${error.message}`, "error");
    } else {
        showMessage(`¡Registro exitoso! Se ha enviado una confirmación a: ${email}`, "success");
        form.reset();
    }
});