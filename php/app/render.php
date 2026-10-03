<?php

function page_start(string $title, string $description = ''): void
{
    $user = current_user();
    $full = $title === '' ? SITE_NAME : $title . ' · ' . SITE_NAME;
    $description = $description !== '' ? $description : 'ClassicalPromo is a music promotion platform for African and international artists, managers, labels and music professionals.';
    $path = request_path();
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . e($full) . '</title>';
    echo '<meta name="description" content="' . e($description) . '">';
    echo '<link rel="canonical" href="https://' . e(SITE_DOMAIN) . e($path === '/' ? '/' : $path) . '">';
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="' . e(url('/assets/css/app.css')) . '?v=5">';
    echo '</head><body>';
    echo '<a class="skip" href="#content">Skip to content</a>';
    echo '<header class="site-header"><div class="wrap bar">';
    echo '<a class="brand" href="' . e(url('/')) . '" aria-label="ClassicalPromo home"><span class="mark">C</span><span class="wordmark">Classical<span>Promo</span></span></a>';
    echo '<nav class="desk" aria-label="Primary">';
    foreach (nav_items() as [$href, $label]) {
        $on = request_path() === $href ? ' class="on"' : '';
        echo '<a' . $on . ' href="' . e(url($href)) . '">' . e($label) . '</a>';
    }
    echo '</nav><div class="desk actions">';
    if ($user) {
        echo '<a class="quiet" href="' . e(url(workspace_for($user['role']))) . '">' . ($user['role'] === 'ADMIN' ? 'Admin' : 'Workspace') . '</a>';
    } else {
        echo '<a class="quiet" href="' . e(url('/login')) . '">Log in</a>';
    }
    echo '<a class="btn" href="' . e(url('/pitch')) . '">Pitch your song</a></div>';
    echo '<button class="menu-btn" type="button" aria-expanded="false" aria-label="Menu" data-menu><span></span><span></span></button>';
    echo '</div><div class="mobile" data-mobile hidden><nav aria-label="Mobile">';
    foreach (nav_items() as [$href, $label]) {
        echo '<a href="' . e(url($href)) . '">' . e($label) . '</a>';
    }
    echo '<a href="' . e(url($user ? workspace_for($user['role']) : '/login')) . '">' . ($user ? 'Open workspace' : 'Log in') . '</a>';
    echo '<a class="btn" href="' . e(url('/pitch')) . '">Pitch your song</a></nav></div></header>';
    echo '<main id="content">';
}

function page_end(): void
{
    $year = date('Y');
    echo '</main><footer class="site-footer"><div class="wrap foot-mark"><p>ClassicalPromo</p><span>' . e(SITE_TAGLINE) . '</span></div><div class="wrap foot">';
    echo '<div><p class="mist">Your music deserves to be heard.</p>';
    echo '<a class="gold" href="mailto:' . e(SITE_EMAIL) . '">' . e(SITE_EMAIL) . '</a></div>';
    $columns = [
        'Platform' => [['Pitch your song', '/pitch'], ['Promotion', '/promotion'], ['Pricing', '/pricing'], ['Marketplace', '/marketplace'], ['Create artist account', '/register']],
        'Network' => [['The network', '/network'], ['Join the network', '/partners'], ['Academy', '/academy'], ['Media', '/media'], ['About', '/about']],
        'Promotion' => [['Nigeria', '/music-promotion-nigeria'], ['Playlists', '/spotify-playlist-promotion'], ['TikTok', '/tiktok-music-promotion'], ['Radio', '/radio-promotion'], ['DJs', '/dj-promotion'], ['Afrobeats', '/afrobeats-promotion']],
    ];
    foreach ($columns as $title => $links) {
        echo '<div><p class="kicker">' . e($title) . '</p><ul>';
        foreach ($links as [$label, $href]) {
            echo '<li><a href="' . e(url($href)) . '">' . e($label) . '</a></li>';
        }
        echo '</ul></div>';
    }
    echo '</div><div class="legal wrap"><p>© ' . e($year) . ' ClassicalPromo. ' . e(SITE_DOMAIN) . '</p>';
    echo '<p>Campaigns report promotional activity. ClassicalPromo does not sell guaranteed streams, followers, views, airplay or editorial playlist placement.</p>';
    echo '<p><a href="' . e(url('/privacy')) . '">Privacy</a> <a href="' . e(url('/terms')) . '">Terms</a> <a href="' . e(url('/faq')) . '">FAQ</a></p></div></footer>';
    echo '<script src="' . e(url('/assets/js/site.js')) . '"></script></body></html>';
}

function layout(string $title, string $html, string $description = ''): void
{
    page_start($title, $description);
    echo $html;
    page_end();
}

function h(string $html): string
{
    return $html;
}

function button(string $href, string $label, string $kind = 'gold'): string
{
    return '<a class="btn ' . ($kind === 'line' ? 'line' : '') . '" href="' . e(url($href)) . '">' . e($label) . '</a>';
}

function page_header(string $eyebrow, string $title, string $lede = ''): string
{
    $html = '<section class="page-head wrap"><p class="kicker">' . e($eyebrow) . '</p><h1 class="display">' . e($title) . '</h1>';
    if ($lede !== '') {
        $html .= '<p class="lede">' . e($lede) . '</p>';
    }
    return $html . '</section>';
}

function field(string $name, string $label, string $type = 'text', string $value = '', bool $required = false): string
{
    $req = $required ? ' required' : '';
    return '<label class="field"><span>' . e($label) . '</span><input name="' . e($name) . '" type="' . e($type) . '" value="' . e($value) . '"' . $req . '></label>';
}

function workspace_shell(array $user, string $title, array $links, string $body): void
{
    page_start($title);
    echo '<div class="workspace wrap"><aside><p class="kicker">' . e($user['role']) . '</p><p class="who">' . e($user['name']) . '</p><nav>';
    foreach ($links as [$href, $label]) {
        $active = request_path() === $href ? ' class="on"' : '';
        echo '<a' . $active . ' href="' . e(url($href)) . '">' . e($label) . '</a>';
    }
    echo '<a href="' . e(url('/logout')) . '">Log out</a></nav></aside><section class="desk-main">';
    $note = flash('ok');
    $err = flash('error');
    if ($note) {
        echo '<p class="note">' . e($note) . '</p>';
    }
    if ($err) {
        echo '<p class="error">' . e($err) . '</p>';
    }
    echo $body;
    echo '</section></div>';
    page_end();
}

function dashboard_links(): array
{
    return [
        ['/dashboard', 'Overview'],
        ['/dashboard/campaigns', 'Campaigns'],
        ['/dashboard/reports', 'Reports'],
        ['/dashboard/songs', 'Songs'],
        ['/dashboard/submit', 'Submit a song'],
        ['/dashboard/marketplace', 'Marketplace'],
        ['/dashboard/messages', 'Messages'],
        ['/dashboard/payments', 'Payments'],
        ['/dashboard/profile', 'Profile'],
        ['/dashboard/settings', 'Settings'],
    ];
}

function admin_links(): array
{
    return [
        ['/admin', 'Overview'],
        ['/admin/campaigns', 'Campaigns'],
        ['/admin/artists', 'Artists'],
        ['/admin/songs', 'Songs'],
        ['/admin/partners', 'Partners'],
        ['/admin/payments', 'Payments'],
        ['/admin/messages', 'Messages'],
        ['/admin/redirects', 'Redirects'],
        ['/admin/reports', 'Reports'],
        ['/admin/settings', 'Settings'],
        ['/admin/directory/playlist', 'Playlists'],
        ['/admin/directory/dj', 'DJs'],
        ['/admin/directory/radio', 'Radio'],
        ['/admin/directory/creator', 'Creators'],
        ['/admin/directory/blog', 'Blogs'],
    ];
}

function metric_list(array $channels): string
{
    $html = '<div class="metric-grid">';
    foreach ($channels as $channel) {
        $html .= '<article><h3>' . e($channel['name']) . '</h3><ul>';
        foreach ($channel['metrics'] as $metric) {
            $class = !empty($metric['awaiting']) ? 'dim' : '';
            $html .= '<li><span>' . e($metric['label']) . '</span><span class="' . $class . '">' . e($metric['value']) . '</span></li>';
        }
        $html .= '</ul></article>';
    }
    return $html . '</div>';
}

function user_campaigns(array $user): array
{
    $rows = [];
    foreach (db()['campaigns'] as $campaign) {
        if ($campaign['artistId'] === $user['id'] || ($user['role'] !== 'ARTIST' && !empty($campaign['demo']))) {
            $rows[] = $campaign;
        }
    }
    return $rows;
}
