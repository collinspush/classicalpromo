<?php

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function base_path(): string
{
    $script = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));
    if ($script === '/' || $script === '.' || $script === '') {
        return '';
    }
    return rtrim($script, '/');
}

function request_path(): string
{
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $base = base_path();
    if ($base !== '' && str_starts_with($uri, $base)) {
        $uri = substr($uri, strlen($base)) ?: '/';
    }
    $uri = '/' . trim($uri, '/');
    if ($uri === '/index.php') {
        $uri = '/';
    }
    return $uri;
}

function url(string $path = '/'): string
{
    if (preg_match('#^https?://#', $path)) {
        return $path;
    }
    if ($path === '' || $path[0] !== '/') {
        $path = '/' . ltrim($path, '/');
    }
    $base = base_path();
    if ($path === '/') {
        return $base === '' ? '/' : $base . '/';
    }
    return $base . $path;
}

function redirect(string $path, int $code = 302): void
{
    header('Location: ' . url($path), true, $code);
    exit;
}

function naira(int $amount): string
{
    return '₦ ' . number_format($amount, 0, '.', ',');
}

function uid(string $prefix): string
{
    return $prefix . '_' . bin2hex(random_bytes(6));
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

function csrf_ok(): bool
{
    $sent = (string) ($_POST['csrf'] ?? '');
    $known = (string) ($_SESSION['csrf'] ?? '');
    return $known !== '' && hash_equals($known, $sent);
}

function flash(string $key, ?string $value = null): ?string
{
    if ($value !== null) {
        $_SESSION['flash'][$key] = $value;
        return null;
    }
    $message = $_SESSION['flash'][$key] ?? null;
    unset($_SESSION['flash'][$key]);
    return $message;
}

function sanitize(string $value): string
{
    $value = trim(preg_replace('/\s+/', ' ', $value) ?? '');
    return mb_substr($value, 0, 4000);
}

function compliance_issue(string $text): ?string
{
    $blocked = [
        '/guaranteed\s+(streams|views|followers|placement|viral|airplay)/i',
        '/spotify\s+editorial\s+guarant/i',
        '/buy\s+(streams|followers|likes|views)/i',
        '/artificial\s+streams/i',
        '/fake\s+engagement/i',
        '/bot\s+(streams|plays|views)/i',
    ];
    foreach ($blocked as $pattern) {
        if (preg_match($pattern, $text)) {
            return 'This text promises or sells guaranteed or artificial results. ClassicalPromo only describes campaign activity.';
        }
    }
    return null;
}

function post(string $key, int $max = 500): string
{
    return mb_substr(trim((string) ($_POST[$key] ?? '')), 0, $max);
}

function post_list(string $key): array
{
    $value = $_POST[$key] ?? [];
    if (!is_array($value)) {
        return [];
    }
    return array_values(array_filter(array_map(static fn ($item) => sanitize((string) $item), $value)));
}

function workspace_for(string $role): string
{
    return match ($role) {
        'ADMIN' => '/admin',
        'PARTNER' => '/partner',
        default => '/dashboard',
    };
}

function status_label(string $status): string
{
    return ucwords(strtolower(str_replace('_', ' ', $status)));
}

function recommend_package(array $goals, string $budget): string
{
    if ($budget === 'custom' || $budget === '500000+') {
        return 'custom';
    }
    $rank = ['25000' => 1, '50000' => 2, '100000' => 3, '250000' => 4];
    $level = $rank[$budget] ?? 2;
    if ($level >= 4 || (count($goals) >= 6 && $level >= 3)) {
        return 'breakout';
    }
    if ($level >= 3 || count($goals) >= 3) {
        return 'growth';
    }
    return 'starter';
}

function services_for_goals(array $goals, string $packageId): array
{
    $map = [
        'Streaming' => 'Streaming audience support',
        'Playlist discovery' => 'Playlist outreach',
        'TikTok' => 'TikTok creator campaign',
        'Instagram' => 'Instagram promotion',
        'YouTube' => 'YouTube promotion',
        'Radio' => 'Radio servicing',
        'DJs' => 'DJ promotion',
        'Blogs' => 'Music blog promotion',
        'Press' => 'Press & PR',
        'Brand awareness' => 'Artist branding',
        'International exposure' => 'International market outreach',
    ];
    $fromGoals = [];
    foreach ($goals as $goal) {
        if (isset($map[$goal])) {
            $fromGoals[] = $map[$goal];
        }
    }
    if ($fromGoals) {
        return array_values(array_unique($fromGoals));
    }
    $pack = package_by_id($packageId);
    return $pack['services'] ?? [];
}

function budget_amount(array $payload, ?array $pack): int
{
    $budget = (string) ($payload['budget'] ?? '');
    if ($budget === 'custom') {
        $custom = (int) preg_replace('/[^\d]/', '', (string) ($payload['customBudget'] ?? ''));
        return $custom > 0 ? $custom : (int) ($pack['priceNgn'] ?? 0);
    }
    if ($budget === '500000+') {
        return 500000;
    }
    $amount = (int) $budget;
    if ($amount > 0) {
        return $amount;
    }
    return (int) ($pack['priceNgn'] ?? 0);
}
