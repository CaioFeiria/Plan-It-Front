# Sistema de Autenticação - PlanIt

Este diretório contém os componentes de autenticação do sistema PlanIt.

## Componentes

### Login (`/auth/login`)
- Formulário de login com validações
- Campos: email, senha, lembrar-me
- Validações em tempo real com FormControl
- Design moderno e responsivo

### Registro (`/auth/register`)
- Formulário de registro com validações
- Campos: nome, email, senha, confirmar senha, aceitar termos
- Validação de confirmação de senha
- Design consistente com o login

## Serviços

### AuthService
- Gerencia autenticação do usuário
- Armazena token e dados do usuário
- Métodos: login, register, logout, isAuthenticated
- Persistência de dados (localStorage/sessionStorage)

## Guards

### AuthGuard
- Protege rotas que requerem autenticação
- Redireciona para login se não autenticado
- Aplicado nas rotas principais do sistema

## Interceptors

### AuthInterceptor
- Adiciona token de autorização nas requisições HTTP
- Intercepta todas as requisições automaticamente

## Rotas

- `/auth/login` - Página de login
- `/auth/register` - Página de registro
- `/` - Página principal (protegida)

## Validações

### Login
- Email: obrigatório, formato válido
- Senha: obrigatória, mínimo 6 caracteres

### Registro
- Nome: obrigatório, 3-100 caracteres
- Email: obrigatório, formato válido
- Senha: obrigatória, mínimo 6 caracteres
- Confirmar senha: obrigatória, deve coincidir com senha
- Aceitar termos: obrigatório

## Design

- Interface moderna com gradiente de fundo
- Cards com sombra e bordas arredondadas
- Ícones PrimeNG para melhor UX
- Validações visuais com cores de erro
- Botões com estados de loading
- Responsivo para mobile e desktop
