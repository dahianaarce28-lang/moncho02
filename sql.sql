-- 1. Función para validar el dominio institucional antes de insertar en auth.users
CREATE OR REPLACE FUNCTION public.check_institutional_domain()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email NOT LIKE '%@miinstitucion.edu.py' THEN
    RAISE EXCEPTION 'Acceso denegado: Solo se permiten correos con dominio @miinstitucion.edu.py';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger que se dispara antes de crear un nuevo usuario en la tabla auth.users
CREATE OR REPLACE TRIGGER validate_email_domain_before_signup
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.check_institutional_domain();