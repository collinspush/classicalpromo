<?php

function current_user(): ?array
{
    $id = $_SESSION['user_id'] ?? null;
    if (!$id) {
        return null;
    }
    foreach (db()['users'] as $user) {
        if ($user['id'] === $id) {
            return $user;
        }
    }
    unset($_SESSION['user_id']);
    return null;
}

function require_login(): array
{
    $user = current_user();
    if (!$user) {
        redirect('/login?next=' . rawurlencode(request_path()));
    }
    return $user;
}

function require_role(array $roles): array
{
    $user = require_login();
    if (!in_array($user['role'], $roles, true)) {
        redirect(workspace_for($user['role']));
    }
    return $user;
}

function attempt_login(string $email, string $password): ?string
{
    $email = strtolower(trim($email));
    foreach (db()['users'] as $user) {
        if (strtolower($user['email']) === $email && password_verify($password, $user['passwordHash'])) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            return workspace_for($user['role']);
        }
    }
    return null;
}

function logout_user(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
}
