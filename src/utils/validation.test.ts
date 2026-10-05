import { validateEmail, validateLogin, validatePassword, validateSignup } from './validation';

describe('validação de autenticação', () => {
  test('aceita credenciais válidas', () => {
    expect(validateEmail('jogador@example.com')).toBe(true);
    expect(validatePassword('123456')).toBe(true);
    expect(validateLogin('jogador@example.com', '123456')).toBeNull();
  });

  test('rejeita campos vazios e dados inválidos', () => {
    expect(validateLogin('', '')).toBe('Preencha e-mail e senha.');
    expect(validateLogin('invalido', '123456')).toBe('Informe um e-mail válido.');
    expect(validateSignup('A', 'a@b.com', '123456')).toContain('nome');
  });
});
