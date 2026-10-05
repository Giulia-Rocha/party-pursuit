export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password) return 'Preencha e-mail e senha.';
  if (!validateEmail(email)) return 'Informe um e-mail válido.';
  if (!validatePassword(password)) return 'A senha deve ter ao menos 6 caracteres.';
  return null;
}

export function validateSignup(username: string, email: string, password: string): string | null {
  if (username.trim().length < 2) return 'Informe um nome com ao menos 2 caracteres.';
  return validateLogin(email, password);
}
