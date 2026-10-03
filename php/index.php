<?php

require __DIR__ . '/app/bootstrap.php';

$path = request_path();

if ($path === '/robots.txt') {
    header('Content-Type: text/plain; charset=utf-8');
    echo "User-agent: *\nAllow: /\nSitemap: https://" . SITE_DOMAIN . "/sitemap.xml\n";
    exit;
}

if ($path === '/sitemap.xml') {
    header('Content-Type: application/xml; charset=utf-8');
    echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    $urls = ['/', '/promotion', '/pricing', '/about', '/faq', '/network', '/partners', '/marketplace', '/academy', '/media', '/pitch', '/privacy', '/terms'];
    foreach (seo_pages() as $page) {
        $urls[] = '/' . $page['slug'];
    }
    foreach (articles() as $article) {
        $urls[] = '/' . $article['kind'] . '/' . $article['slug'];
    }
    foreach ($urls as $item) {
        echo '<url><loc>https://' . SITE_DOMAIN . htmlspecialchars($item, ENT_XML1) . '</loc></url>';
    }
    echo '</urlset>';
    exit;
}

foreach (db()['redirects'] as $rule) {
    if (($rule['status'] ?? '') === 'active' && ($rule['oldUrl'] ?? '') === $path) {
        redirect($rule['newUrl'], (int) ($rule['type'] ?? 301));
    }
}

if ($path === '/logout') {
    logout_user();
    redirect('/');
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    handle_post($path);
}

render_page($path);
