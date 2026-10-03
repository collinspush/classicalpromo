<?php

function render_page(string $path): void
{
    if ($path === '/') {
        page_home();
        return;
    }
    $routes = [
        '/promotion' => 'page_promotion',
        '/pricing' => 'page_pricing',
        '/about' => 'page_about',
        '/faq' => 'page_faq',
        '/network' => 'page_network',
        '/partners' => 'page_partners',
        '/marketplace' => 'page_marketplace',
        '/academy' => 'page_academy',
        '/media' => 'page_media',
        '/pitch' => 'page_pitch',
        '/login' => 'page_login',
        '/register' => 'page_register',
        '/forgot-password' => 'page_forgot',
        '/reset-password' => 'page_reset',
        '/privacy' => 'page_privacy',
        '/terms' => 'page_terms',
        '/checkout' => 'page_checkout',
        '/dashboard' => 'page_dashboard',
        '/dashboard/campaigns' => 'page_dash_campaigns',
        '/dashboard/reports' => 'page_dash_reports',
        '/dashboard/songs' => 'page_dash_songs',
        '/dashboard/submit' => 'page_dash_submit',
        '/dashboard/marketplace' => 'page_dash_market',
        '/dashboard/messages' => 'page_dash_messages',
        '/dashboard/payments' => 'page_dash_payments',
        '/dashboard/profile' => 'page_dash_profile',
        '/dashboard/settings' => 'page_dash_settings',
        '/admin' => 'page_admin',
        '/admin/campaigns' => 'page_admin_campaigns',
        '/admin/artists' => 'page_admin_artists',
        '/admin/songs' => 'page_admin_songs',
        '/admin/partners' => 'page_admin_partners',
        '/admin/payments' => 'page_admin_payments',
        '/admin/messages' => 'page_admin_messages',
        '/admin/redirects' => 'page_admin_redirects',
        '/admin/reports' => 'page_admin_reports',
        '/admin/settings' => 'page_admin_settings',
        '/partner' => 'page_partner',
    ];
    if (isset($routes[$path])) {
        $routes[$path]();
        return;
    }
    if (preg_match('#^/marketplace/([a-z0-9-]+)$#', $path, $m)) {
        page_listing($m[1]);
        return;
    }
    if (preg_match('#^/(academy|media)/([a-z0-9-]+)$#', $path, $m)) {
        page_article($m[1], $m[2]);
        return;
    }
    if (preg_match('#^/artists/([a-z0-9-]+)$#', $path, $m)) {
        page_artist($m[1]);
        return;
    }
    if (preg_match('#^/dashboard/campaigns/([a-z0-9_]+)$#', $path, $m)) {
        page_campaign($m[1], false);
        return;
    }
    if (preg_match('#^/dashboard/reports/([a-z0-9_]+)$#', $path, $m)) {
        page_campaign($m[1], true);
        return;
    }
    if (preg_match('#^/dashboard/payments/([a-z0-9_]+)$#', $path, $m)) {
        page_invoice($m[1]);
        return;
    }
    if (preg_match('#^/admin/directory/(playlist|dj|radio|creator|blog)$#', $path, $m)) {
        page_admin_directory($m[1]);
        return;
    }
    $seo = seo_by_slug(trim($path, '/'));
    if ($seo) {
        page_seo($seo);
        return;
    }
    http_response_code(404);
    layout('Page not found', page_header('404', 'This page is not on ClassicalPromo.', 'The address may have moved. Promotion stories now live on the media desk.') . '<div class="wrap section">' . button('/media', 'Open media') . '</div>');
}

function page_home(): void
{
    $channels = [['TikTok', 'Creators contacted'], ['Playlists', 'Independent curators'], ['Instagram', 'Audience introductions'], ['YouTube', 'Channel outreach'], ['Radio', 'Stations serviced'], ['DJs', 'Selectors briefed'], ['Blogs', 'Stories pitched'], ['PR', 'Desks contacted']];
    $html = '<section class="hero wrap"><div class="rise"><p class="kicker">ClassicalPromo · Lagos & beyond</p><h1 class="hero-title">One Song.<br>Every Opportunity.</h1></div><div class="hero-grid"><div><p class="lede">Take your music beyond the upload. Reach playlists, TikTok creators, Instagram audiences, DJs, radio, blogs, YouTube and music communities through one powerful promotion platform.</p><div class="row">' . button('/pitch', 'Pitch your song') . button('/promotion', 'Explore promotion', 'line') . '</div><ol class="steps">';
    foreach (['Artist', 'ClassicalPromo', 'Promotion network', 'Audience'] as $i => $step) {
        $html .= '<li><span>0' . ($i + 1) . '</span>' . e($step) . '</li>';
    }
    $html .= '</ol></div><aside class="board"><div class="board-top"><div><p class="kicker">Campaign</p><p>My New Song</p></div><span class="demo">Sample interface</span></div><div class="board-body"><div class="portrait" aria-hidden="true">A</div><div><p class="mist">Adaeze Okonkwo · Afrobeats · Breakout</p><div class="progress-label"><span>Campaign progress</span><span class="gold">78%</span></div><div class="meter"><span style="width:78%"></span></div><p class="dim">Illustrative progress for the product interface. Live campaigns show only recorded activity.</p></div></div><ul class="channels">';
    foreach ($channels as [$name, $detail]) {
        $html .= '<li><span>' . e($name) . '</span><span class="mist">' . e($detail) . '</span></li>';
    }
    $html .= '</ul></aside></div></section>';
    $html .= '<section class="wrap section"><p class="kicker">Who it is for</p><h2 class="display">Built for artists who are ready to move.</h2><ul class="pills">';
    foreach (['Independent Artists', 'Managers', 'Record Labels', 'DJs', 'Producers', 'Music Professionals'] as $item) {
        $html .= '<li>' . e($item) . '</li>';
    }
    $html .= '</ul><div class="cards four">';
    $points = [['Transparent campaigns.', 'You can see the services, dates, budget and status of the work.'], ['Real promotional activity.', 'Outreach, servicing, advertising and media work — not purchased numbers.'], ['Clear reporting.', 'Activity is written down. Missing figures stay marked as awaiting data.'], ['Artist-first strategy.', 'The plan starts from the song, the audience and the market you actually want.']];
    foreach ($points as $i => [$title, $copy]) {
        $html .= '<article><p class="gold">0' . ($i + 1) . '</p><h3>' . e($title) . '</h3><p class="mist">' . e($copy) . '</p></article>';
    }
    $html .= '</div><p class="dim">Testimonial placeholder — verified artist feedback will be published here when it is available. ClassicalPromo does not display invented reviews or client logos.</p></section>';
    $html .= '<section class="split"><div class="visual">Studio</div><div class="split-copy"><p class="kicker">The work</p><h2 class="display">Promotion should be as serious as the record.</h2><p class="mist">ClassicalPromo is a campaign desk: pitch, scope, payment, execution, updates and a report. The same standard for a first single and a label roster.</p><a class="gold" href="' . e(url('/about')) . '">Read the mission</a></div></section>';
    $html .= '<section class="wrap section" id="services"><p class="kicker">Services</p><h2 class="display">Promote your music everywhere that matters.</h2><div class="cards three">';
    foreach (services() as $service) {
        $html .= '<article class="panel"><h3>' . e($service['name']) . '</h3><p class="mist">' . e($service['summary']) . '</p><p class="links"><a href="' . e(url($service['href'])) . '">View service</a><a class="gold" href="' . e(url('/pitch')) . '">Start campaign</a></p></article>';
    }
    $html .= '</div></section><section class="band wrap"><div><p class="kicker">Pitch</p><h2 class="display xl">Got a song?</h2><p class="lede">Tell us about it. We will help you build the right promotion campaign.</p>' . button('/pitch', 'Pitch my song') . '</div><div class="visual tall">Microphone</div></section>';
    $html .= '<section class="wrap section"><div class="split-title"><div><p class="kicker">Packages</p><h2 class="display">Choose a scope.</h2></div><a class="gold" href="' . e(url('/pricing')) . '">View pricing</a></div><div class="cards four">';
    foreach (live_packages() as $item) {
        $html .= '<article class="panel' . ($item['featured'] ? ' featured' : '') . '"><h3 class="display sm">' . e($item['name']) . '</h3><p class="mist">' . e($item['audience']) . '</p><p class="price">' . e($item['priceNgn'] ? naira((int) $item['priceNgn']) : $item['priceLabel']) . '</p><p class="dim">' . e($item['duration']) . '</p><ul>';
        foreach (array_slice($item['services'], 0, 4) as $service) {
            $html .= '<li>' . e($service) . '</li>';
        }
        $html .= '</ul>' . button('/pitch?package=' . $item['id'], 'Start a campaign', $item['featured'] ? 'gold' : 'line') . '</article>';
    }
    $html .= '</div></section><section class="wrap section media-home"><div><p class="kicker">Media</p><h2 class="display">Discover new music</h2><p class="mist">Editorial formats from the ClassicalPromo desk. Sample stories are marked inside the article.</p>' . button('/media', 'Open the desk', 'line') . '</div><div class="stack">';
    foreach (array_slice(array_filter(articles(), static fn ($a) => $a['kind'] === 'media'), 0, 3) as $story) {
        $html .= '<a class="story" href="' . e(url('/media/' . $story['slug'])) . '"><span class="swatch"></span><span><span class="kicker">' . e($story['category']) . '</span><strong>' . e($story['title']) . '</strong><span class="mist">' . e($story['excerpt']) . '</span></span></a>';
    }
    $html .= '</div></section><section class="wrap section"><h2 class="display">Questions, answered plainly.</h2><div class="faq">';
    foreach (array_slice(faqs(), 0, 4) as $faq) {
        $html .= '<details><summary>' . e($faq['q']) . '</summary><p>' . e($faq['a']) . '</p></details>';
    }
    $html .= '</div><p class="section-link"><a class="gold" href="' . e(url('/faq')) . '">All questions</a></p></section>';
    layout('', $html);
}

function page_promotion(): void
{
    $html = page_header('Explore promotion', 'Promote your music everywhere that matters.', 'Twelve ways to put a record in front of the people who might use it. Every service describes the work, not a promised outcome.');
    $html .= '<div class="wrap list">';
    foreach (services() as $i => $service) {
        $html .= '<article id="' . e($service['id']) . '"><p class="gold">0' . ($i + 1) . '</p><div><h2 class="display sm">' . e($service['name']) . '</h2><p>' . e($service['summary']) . '</p><p class="mist">' . e($service['detail']) . '</p></div><div class="stack-btns">' . button($service['href'], 'View service', 'line') . '<a class="gold" href="' . e(url('/pitch')) . '">Start campaign</a></div></article>';
    }
    $html .= '</div>';
    layout('Promotion', $html, 'Playlist, creator, radio, DJ, blog, press and release campaigns. Activity is reported. Results are not guaranteed.');
}

function page_pricing(): void
{
    $html = page_header('Pricing', 'A price for the work, not for a result.', 'Packages are starting scopes in naira. Custom work is written down before it begins. Nothing here is a promise of streams, placement or airplay.');
    $html .= '<div class="wrap cards four section">';
    foreach (live_packages() as $item) {
        $html .= '<article class="panel' . ($item['featured'] ? ' featured' : '') . '"><h2>' . e($item['name']) . '</h2><p class="price">' . e($item['priceNgn'] ? naira((int) $item['priceNgn']) : $item['priceLabel']) . '</p><p class="dim">' . e($item['duration']) . '</p><p class="mist">' . e($item['audience']) . '</p><ul>';
        foreach ($item['deliverables'] as $line) {
            $html .= '<li>' . e($line) . '</li>';
        }
        $html .= '</ul><p class="dim">' . e($item['reporting']) . '</p>' . button('/pitch?package=' . $item['id'], 'Start a campaign', $item['featured'] ? 'gold' : 'line') . '</article>';
    }
    $html .= '</div><div class="wrap section"><h2 class="display sm">Services, from</h2><div class="table-wrap"><table><thead><tr><th>Service</th><th>From</th><th>Window</th><th>Not included</th></tr></thead><tbody>';
    foreach (service_prices() as $row) {
        $html .= '<tr><td>' . e($row['name']) . '</td><td>' . e(naira($row['fromNgn'])) . '</td><td>' . e($row['duration']) . '</td><td>' . e($row['not']) . '</td></tr>';
    }
    $html .= '</tbody></table></div></div>';
    layout('Pricing', $html, 'ClassicalPromo campaign packages and service prices in naira. Results are not guaranteed.');
}

function page_about(): void
{
    $values = [
        ['Mission', 'To make professional music promotion more accessible to independent artists and music professionals, while connecting artists with legitimate promotional channels across Africa and the world.'],
        ['Vision', 'A promotion infrastructure that artists, managers and labels can trust at scale — with the same clarity whether the roster is one song or a hundred.'],
        ['Transparency', 'Services, prices, statuses and reports are written in plain language. Missing data stays missing.'],
        ['Artist-first', 'The song, the audience and the artist’s own accounts come before a channel template.'],
        ['Technology', 'Campaigns, payments, messages and reports live in one system so the work can be audited.'],
        ['African music', 'Nigeria and the continent are the centre of the product, not an afterthought on a global template. International artists are welcome when the brief is real.'],
    ];
    $html = page_header('About', 'We help music move.', 'ClassicalPromo is a promotion platform and a media desk. The work is outreach, servicing, advertising and reporting — not manufactured attention.');
    $html .= '<div class="wrap cards two section">';
    foreach ($values as [$title, $copy]) {
        $html .= '<article><h2 class="display sm">' . e($title) . '</h2><p class="mist">' . e($copy) . '</p></article>';
    }
    $html .= '</div><div class="wrap section">' . button('/pitch', 'Pitch your song') . '</div>';
    layout('About', $html, 'ClassicalPromo helps independent artists and music professionals reach legitimate promotional channels across Africa and the world.');
}

function page_faq(): void
{
    $html = page_header('FAQ', 'Questions, answered plainly.');
    $html .= '<div class="wrap faq section">';
    foreach (faqs() as $faq) {
        $html .= '<details><summary>' . e($faq['q']) . '</summary><p>' . e($faq['a']) . '</p></details>';
    }
    $html .= '</div>';
    layout('FAQ', $html, 'How ClassicalPromo campaigns, reports, radio, DJs, playlists and partnerships work.');
}

function page_network(): void
{
    $html = page_header('Network', 'Verified partners, listed without their private contacts.', 'DJs, curators, stations, creators and writers appear here after review. Phone numbers and emails stay with the desk.');
    $kind = $_GET['kind'] ?? '';
    $q = strtolower(trim((string) ($_GET['q'] ?? '')));
    $html .= '<form class="wrap filters" method="get" action="' . e(url('/network')) . '"><input name="q" value="' . e($q) . '" placeholder="Search name, city or genre"><select name="kind"><option value="">All categories</option>';
    foreach (partner_types() as $type) {
        $html .= '<option ' . ($kind === $type ? 'selected' : '') . '>' . e($type) . '</option>';
    }
    $html .= '</select><button class="btn" type="submit">Filter</button></form><div class="wrap cards three section">';
    foreach (db()['partners'] as $partner) {
        if ($partner['status'] !== 'VERIFIED') {
            continue;
        }
        $blob = strtolower($partner['name'] . ' ' . $partner['city'] . ' ' . implode(' ', $partner['genres']));
        if ($q !== '' && !str_contains($blob, $q)) {
            continue;
        }
        if ($kind !== '' && !in_array($kind, $partner['categories'], true)) {
            continue;
        }
        $html .= '<article class="panel"><p class="kicker">' . e(implode(', ', $partner['categories'])) . '</p><h2>' . e($partner['name']) . '</h2><p>' . e($partner['city'] . ', ' . $partner['country']) . '</p><p class="mist">' . e($partner['description']) . '</p><p class="dim">' . e(implode(' · ', $partner['genres'])) . '</p><p class="demo">Sample profile</p></article>';
    }
    $html .= '</div>';
    layout('Network', $html, 'The ClassicalPromo promotion network of reviewed DJs, curators, radio, creators and writers.');
}

function page_partners(): void
{
    $html = page_header('Join the network', 'Apply as a partner. Verification comes after review.', 'Pending and under-review applications are not shown publicly. A verified badge means the desk checked the profile.');
    if ($ok = flash('ok')) {
        $html .= '<p class="wrap note">' . e($ok) . '</p>';
    }
    if ($err = flash('error')) {
        $html .= '<p class="wrap error">' . e($err) . '</p>';
    }
    $html .= '<form class="wrap form" method="post" action="' . e(url('/partners')) . '">' . csrf_field();
    $html .= field('name', 'Name', 'text', '', true) . field('email', 'Email', 'email', '', true) . field('phone', 'Phone') . field('city', 'City') . field('platform', 'Platform') . field('profileUrl', 'Public profile URL', 'url') . field('audience', 'Audience you actually reach');
    $html .= '<label class="field"><span>Country</span><select name="country">';
    foreach (countries_list() as $country) {
        $html .= '<option>' . e($country) . '</option>';
    }
    $html .= '</select></label><fieldset><legend>Categories</legend><div class="checks">';
    foreach (partner_types() as $type) {
        $html .= '<label><input type="checkbox" name="categories[]" value="' . e($type) . '"> ' . e($type) . '</label>';
    }
    $html .= '</div></fieldset><fieldset><legend>Genres</legend><div class="checks">';
    foreach (genres_list() as $genre) {
        $html .= '<label><input type="checkbox" name="genres[]" value="' . e($genre) . '"> ' . e($genre) . '</label>';
    }
    $html .= '</div></fieldset><label class="field"><span>Description</span><textarea name="description" required></textarea></label>';
    $html .= field('proofNote', 'How can we confirm this is yours?');
    $html .= '<p class="dim">Do not offer guaranteed streams, followers, views or editorial placement. Those applications are declined.</p><button class="btn" type="submit">Submit application</button></form>';
    layout('Partners', $html, 'Apply to join the ClassicalPromo partner network.');
}

function page_marketplace(): void
{
    $html = page_header('Marketplace', 'Scoped promotion you can brief.', 'Each listing describes deliverables and a duration. Placement, airplay and reach are not for sale.');
    $html .= '<div class="wrap cards three section">';
    foreach (db()['listings'] as $listing) {
        if (empty($listing['active'])) {
            continue;
        }
        $html .= '<article class="panel"><p class="kicker">' . e($listing['category']) . ' · ' . e($listing['country']) . '</p><h2>' . e($listing['service']) . '</h2><p class="price">' . e(naira((int) $listing['priceNgn'])) . '</p><p class="dim">' . e($listing['duration']) . ' · ' . e($listing['genre']) . '</p><p class="mist">' . e($listing['audience']) . '</p><a class="gold" href="' . e(url('/marketplace/' . $listing['slug'])) . '">View listing</a></article>';
    }
    $html .= '</div>';
    layout('Marketplace', $html, 'ClassicalPromo marketplace for playlist, DJ, radio, creator, blog and press campaigns.');
}

function page_listing(string $slug): void
{
    foreach (db()['listings'] as $listing) {
        if ($listing['slug'] === $slug && !empty($listing['active'])) {
            $html = page_header($listing['category'], $listing['service'], $listing['audience'] . ' · ' . $listing['country'] . ' · ' . $listing['genre']);
            $html .= '<div class="wrap section narrow"><p class="price">' . e(naira((int) $listing['priceNgn'])) . '</p><p class="dim">' . e($listing['duration']) . '</p><ul>';
            foreach ($listing['deliverables'] as $item) {
                $html .= '<li>' . e($item) . '</li>';
            }
            $html .= '</ul><p class="dim">This listing does not guarantee streams, followers, views, airplay or editorial placement.</p>' . button('/pitch', 'Pitch a song for this scope') . '</div>';
            layout($listing['service'], $html);
            return;
        }
    }
    http_response_code(404);
    layout('Listing not found', page_header('Marketplace', 'That listing is not active.'));
}

function page_academy(): void
{
    page_collection('academy', 'Academy', 'Learn the work before you buy it.', 'Practical notes on releases, playlists, creators, radio, DJs, press and the music business.');
}

function page_media(): void
{
    page_collection('media', 'Media', 'Discover new music', 'Sample stories are formats. Real coverage will name the artist, the date and the source.');
}

function page_collection(string $kind, string $title, string $heading, string $lede): void
{
    $html = page_header($title, $heading, $lede);
    $html .= '<div class="wrap cards two section">';
    foreach (articles() as $article) {
        if ($article['kind'] !== $kind) {
            continue;
        }
        $html .= '<a class="panel story-card" href="' . e(url('/' . $kind . '/' . $article['slug'])) . '"><p class="kicker">' . e($article['category']) . '</p><h2>' . e($article['title']) . '</h2><p class="mist">' . e($article['excerpt']) . '</p><p class="dim">' . e($article['date']) . '</p></a>';
    }
    $html .= '</div>';
    layout($title, $html);
}

function page_article(string $kind, string $slug): void
{
    $article = article_by_slug($slug);
    if (!$article || $article['kind'] !== $kind) {
        http_response_code(404);
        layout('Not found', page_header('Missing', 'That story is not on the desk.'));
        return;
    }
    $html = page_header($article['category'], $article['title'], $article['excerpt']);
    $html .= '<article class="wrap prose">';
    if ($article['artist'] !== '') {
        $html .= '<p class="demo">Sample · ' . e($article['artist']) . ' is a fictional profile used to show the format.</p>';
    }
    $html .= '<p class="dim">' . e($article['author']) . ' · ' . e($article['date']) . '</p>';
    foreach ($article['body'] as $paragraph) {
        $html .= '<p>' . e($paragraph) . '</p>';
    }
    $html .= '</article>';
    layout($article['title'], $html, $article['excerpt']);
}

function page_artist(string $slug): void
{
    foreach (db()['users'] as $user) {
        if (($user['profile']['slug'] ?? '') !== $slug) {
            continue;
        }
        $profile = $user['profile'];
        $html = page_header($profile['city'] . ', ' . $profile['country'], $profile['stageName'], $profile['bio']);
        if (!empty($user['demo'])) {
            $html .= '<p class="wrap demo">Sample artist. Not a client.</p>';
        }
        $html .= '<div class="wrap section"><p>' . e(implode(' · ', $profile['genres'] ?? [])) . '</p><ul class="links-list">';
        foreach (['website' => 'Website', 'instagram' => 'Instagram', 'tiktok' => 'TikTok', 'youtube' => 'YouTube', 'spotify' => 'Spotify', 'appleMusic' => 'Apple Music', 'audiomack' => 'Audiomack'] as $key => $label) {
            if (!empty($profile[$key])) {
                $html .= '<li><a href="' . e($profile[$key]) . '">' . e($label) . '</a></li>';
            }
        }
        $html .= '</ul><h2 class="display sm">Campaigns</h2><ul>';
        foreach (db()['campaigns'] as $campaign) {
            if ($campaign['artistId'] === $user['id']) {
                $html .= '<li>' . e($campaign['songTitle']) . ' · ' . e($campaign['packageName']) . ' · ' . e(status_label($campaign['status'])) . ($campaign['demo'] ? ' · Sample' : '') . '</li>';
            }
        }
        $html .= '</ul></div>';
        layout($profile['stageName'], $html, $profile['bio']);
        return;
    }
    http_response_code(404);
    layout('Artist not found', page_header('Artists', 'That profile is not public.'));
}

function page_seo(array $page): void
{
    $html = page_header($page['eyebrow'], $page['heading'], $page['lede']);
    $html .= '<div class="wrap prose">';
    foreach ($page['sections'] as [$heading, $paragraphs]) {
        $html .= '<h2>' . e($heading) . '</h2>';
        foreach ($paragraphs as $paragraph) {
            $html .= '<p>' . e($paragraph) . '</p>';
        }
    }
    $html .= button('/pitch', 'Pitch your song') . '</div>';
    layout($page['title'], $html, $page['description']);
}

function page_pitch(): void
{
    $step = max(0, min(5, (int) ($_GET['step'] ?? 0)));
    $preset = (string) ($_GET['package'] ?? '');
    $draft = $_SESSION['pitch'] ?? ['country' => 'Nigeria', 'genre' => 'Afrobeats', 'releaseGenre' => 'Afrobeats', 'budget' => '50000', 'goals' => [], 'markets' => [], 'audienceGenres' => []];
    if ($preset && package_by_id($preset)) {
        $draft['budget'] = match ($preset) {
            'starter' => '50000',
            'growth' => '100000',
            'breakout' => '250000',
            default => 'custom',
        };
    }
    $steps = ['Artist', 'Release', 'Goals', 'Audience', 'Budget', 'Recommendation'];
    $html = page_header('Pitch your song', 'Tell us about the record.', 'Six steps. Nothing is charged until you choose to start a campaign.');
    $html .= '<ol class="wrap pitch-steps">';
    foreach ($steps as $i => $label) {
        $html .= '<li class="' . ($i === $step ? 'on' : '') . '">0' . ($i + 1) . ' ' . e($label) . '</li>';
    }
    $html .= '</ol>';
    if ($err = flash('error')) {
        $html .= '<p class="wrap error">' . e($err) . '</p>';
    }
    if ($step < 5) {
        $html .= '<form class="wrap form" method="post" action="' . e(url('/pitch')) . '">' . csrf_field() . '<input type="hidden" name="step" value="' . $step . '">';
        $html .= match ($step) {
            0 => field('artistName', 'Artist name', 'text', $draft['artistName'] ?? '', true) . field('email', 'Email', 'email', $draft['email'] ?? '', true) . field('phone', 'Phone', 'text', $draft['phone'] ?? '', true) . field('city', 'City', 'text', $draft['city'] ?? '', true) . select_field('country', 'Country', countries_list(), $draft['country'] ?? 'Nigeria') . select_field('genre', 'Primary genre', genres_list(), $draft['genre'] ?? 'Afrobeats') . field('website', 'Website', 'url', $draft['website'] ?? '') . field('instagram', 'Instagram', 'url', $draft['instagram'] ?? '') . field('spotify', 'Spotify', 'url', $draft['spotify'] ?? '') . field('audiomack', 'Audiomack', 'url', $draft['audiomack'] ?? ''),
            1 => field('songTitle', 'Song title', 'text', $draft['songTitle'] ?? '', true) . field('songArtist', 'Artist on the release', 'text', $draft['songArtist'] ?? '', true) . field('featured', 'Featured artists', 'text', $draft['featured'] ?? '') . select_field('releaseGenre', 'Genre', genres_list(), $draft['releaseGenre'] ?? 'Afrobeats') . field('releaseDate', 'Release date', 'date', $draft['releaseDate'] ?? '') . field('isrc', 'ISRC, if you have one', 'text', $draft['isrc'] ?? '') . field('songLink', 'Song link', 'url', $draft['songLink'] ?? '', true) . field('videoLink', 'Video link', 'url', $draft['videoLink'] ?? '') . '<label class="field"><span>Lyrics or notes</span><textarea name="lyrics">' . e($draft['lyrics'] ?? '') . '</textarea></label>',
            2 => checks('goals', 'Campaign goals', goals_list(), $draft['goals'] ?? []),
            3 => checks('markets', 'Countries', markets_list(), $draft['markets'] ?? []) . checks('audienceGenres', 'Audience genres', genres_list(), $draft['audienceGenres'] ?? []),
            default => budget_fields($draft),
        };
        $html .= '<div class="row">';
        if ($step > 0) {
            $html .= '<button class="btn line" name="back" value="1" type="submit">Back</button>';
        }
        $html .= '<button class="btn" type="submit">' . ($step === 4 ? 'See recommendation' : 'Continue') . '</button></div></form>';
    } else {
        $id = (string) ($_GET['submission'] ?? ($_SESSION['submission_id'] ?? ''));
        $packageId = $draft['packageId'] ?? recommend_package($draft['goals'] ?? [], $draft['budget'] ?? '50000');
        $pack = package_by_id($packageId);
        $services = services_for_goals($draft['goals'] ?? [], $packageId);
        $html .= '<div class="wrap panel section"><p class="kicker">Recommended scope</p><h2 class="display sm">' . e($pack['name'] ?? '') . '</h2><p>' . e($pack['audience'] ?? '') . '</p><p class="price">' . e($pack['priceLabel'] ?? '') . '</p><ul>';
        foreach ($services as $service) {
            $html .= '<li>' . e($service) . '</li>';
        }
        $html .= '</ul><p class="dim">' . e($pack['reporting'] ?? '') . '</p><div class="row">' . button('/checkout?submission=' . rawurlencode($id), 'Start this campaign') . button('/pitch?step=0', 'Edit the pitch', 'line') . '</div></div>';
    }
    layout('Pitch your song', $html, 'Pitch a song to ClassicalPromo and receive a campaign recommendation.');
}

function select_field(string $name, string $label, array $options, string $current): string
{
    $html = '<label class="field"><span>' . e($label) . '</span><select name="' . e($name) . '">';
    foreach ($options as $option) {
        $html .= '<option' . ($option === $current ? ' selected' : '') . '>' . e($option) . '</option>';
    }
    return $html . '</select></label>';
}

function checks(string $name, string $legend, array $options, array $selected): string
{
    $html = '<fieldset><legend>' . e($legend) . '</legend><div class="checks">';
    foreach ($options as $option) {
        $html .= '<label><input type="checkbox" name="' . e($name) . '[]" value="' . e($option) . '"' . (in_array($option, $selected, true) ? ' checked' : '') . '> ' . e($option) . '</label>';
    }
    return $html . '</div></fieldset>';
}

function budget_fields(array $draft): string
{
    $html = '<fieldset><legend>Budget</legend><div class="checks">';
    foreach (budget_options() as $option) {
        $html .= '<label><input type="radio" name="budget" value="' . e($option['id']) . '"' . (($draft['budget'] ?? '') === $option['id'] ? ' checked' : '') . '> ' . e($option['label']) . '</label>';
    }
    $html .= '</div></fieldset>' . field('customBudget', 'Custom amount in naira', 'text', $draft['customBudget'] ?? '');
    return $html;
}

function auth_page(string $title, string $lede, string $body): void
{
    layout($title, page_header('Account', $title, $lede) . '<div class="wrap form">' . $body . '</div>');
}

function page_login(): void
{
    $next = (string) ($_GET['next'] ?? '');
    $err = flash('error');
    $html = ($err ? '<p class="error">' . e($err) . '</p>' : '') . '<form method="post" action="' . e(url('/login')) . '">' . csrf_field() . '<input type="hidden" name="next" value="' . e($next) . '">' . field('email', 'Email', 'email', '', true) . field('password', 'Password', 'password', '', true) . '<button class="btn" type="submit">Log in</button></form>';
    $html .= '<p class="mist"><a class="gold" href="' . e(url('/forgot-password')) . '">Forgot password</a> · <a href="' . e(url('/register')) . '">Create artist account</a></p>';
    $html .= '<div class="demo-box"><p class="kicker">Sample accounts</p><p>Password for every sample account: ' . e(DEMO_PASSWORD) . '</p><ul><li>artist@classicalpromo.com.ng</li><li>manager@classicalpromo.com.ng</li><li>label@classicalpromo.com.ng</li><li>partner@classicalpromo.com.ng</li><li>admin@classicalpromo.com.ng</li></ul></div>';
    auth_page('Log in', 'Artists, managers, labels, partners and admins use the same door.', $html);
}

function page_register(): void
{
    $err = flash('error');
    $html = ($err ? '<p class="error">' . e($err) . '</p>' : '') . '<form method="post" action="' . e(url('/register')) . '">' . csrf_field() . field('name', 'Name', 'text', '', true) . field('email', 'Email', 'email', '', true) . field('password', 'Password', 'password', '', true);
    $html .= '<label class="field"><span>Role</span><select name="role"><option value="ARTIST">Artist</option><option value="MANAGER">Manager</option><option value="LABEL">Label</option></select></label>' . field('company', 'Company, if you are a manager or label');
    $html .= '<p class="dim">Password: at least 10 characters, with a letter and a number. Partners apply separately and wait for approval.</p><button class="btn" type="submit">Create artist account</button></form>';
    auth_page('Create artist account', 'The account holds your songs, campaigns and reports.', $html);
}

function page_forgot(): void
{
    $html = '';
    if ($ok = flash('ok')) {
        $html .= '<p class="note">' . e($ok) . '</p>';
    }
    if (!empty($_SESSION['reset_link'])) {
        $html .= '<p><a class="gold" href="' . e($_SESSION['reset_link']) . '">Open reset link</a></p>';
        unset($_SESSION['reset_link']);
    }
    $html .= '<form method="post" action="' . e(url('/forgot-password')) . '">' . csrf_field() . field('email', 'Email', 'email', '', true) . '<button class="btn" type="submit">Send reset link</button></form>';
    auth_page('Forgot password', 'We will prepare a one-hour reset link for that email.', $html);
}

function page_reset(): void
{
    $token = (string) ($_GET['token'] ?? '');
    $html = '<form method="post" action="' . e(url('/reset-password')) . '">' . csrf_field() . '<input type="hidden" name="token" value="' . e($token) . '">' . field('password', 'New password', 'password', '', true) . '<button class="btn" type="submit">Update password</button></form>';
    auth_page('Reset password', 'Choose a new password of at least 10 characters.', $html);
}

function page_privacy(): void
{
    $html = page_header('Privacy', 'What we keep, and what we do not publish.', 'Account details, pitches and partner applications are used to run campaigns. Private contact details are not placed on public profiles.');
    $html .= '<div class="wrap prose"><p>We store the information you submit: name, email, phone, location, release details, campaign goals and files you upload. Passwords are hashed. Payment card numbers are never taken by this application.</p><p>Partner phone numbers and email addresses are visible to admins so the desk can work. They are omitted from the public network.</p><p>You can ask for a correction or deletion of a pitch by writing to ' . e(SITE_EMAIL) . '. Campaign records that have already been paid may be retained as invoices.</p><p>Demo accounts on this installation are sample data. Do not put a real unreleased master into a demo workspace.</p></div>';
    layout('Privacy', $html);
}

function page_terms(): void
{
    $html = page_header('Terms', 'The work is the deliverable.', 'By starting a campaign you are buying described promotional activity and a report. You are not buying streams, followers, views, airplay or editorial placement.');
    $html .= '<div class="wrap prose"><p>ClassicalPromo may decline a pitch that asks for artificial streams, fake engagement, or guaranteed platform outcomes. Partners who offer those things can be rejected or suspended.</p><p>Campaign timing, channels and price are confirmed before payment. Custom work does not begin until the scope is accepted. Invoices remain pending until a transfer is confirmed.</p><p>You confirm that you control the recording, artwork and any creator permissions you submit. ClassicalPromo is not responsible for uncleared samples or credits you omit.</p><p>These terms are a working draft for the platform foundation and should be reviewed by counsel before commercial launch.</p></div>';
    layout('Terms', $html);
}

function page_checkout(): void
{
    $user = current_user();
    $id = (string) ($_GET['submission'] ?? '');
    $submission = null;
    foreach (db()['submissions'] as $row) {
        if ($row['id'] === $id) {
            $submission = $row;
        }
    }
    if (!$submission) {
        layout('Checkout', page_header('Checkout', 'Pitch a song before checkout.') . '<div class="wrap section">' . button('/pitch', 'Pitch your song') . '</div>');
        return;
    }
    if (!$user) {
        layout('Checkout', page_header('Checkout', 'Sign in to start the campaign.', 'The pitch is saved. Create an artist account or log in, then return to payment.') . '<div class="wrap row">' . button('/login?next=' . rawurlencode('/checkout?submission=' . $id), 'Log in') . button('/register', 'Create artist account', 'line') . '</div>');
        return;
    }
    $packageId = $submission['payload']['packageId'] ?? 'starter';
    $pack = package_by_id($packageId);
    $amount = budget_amount($submission['payload'], $pack);
    $settings = db()['settings'];
    $html = page_header('Checkout', $pack['name'] . ' · ' . $submission['payload']['songTitle'], 'Amount due ' . naira($amount) . '. Card providers are not connected on this server. Bank transfer creates a pending invoice.');
    $html .= '<form class="wrap form" method="post" action="' . e(url('/checkout')) . '">' . csrf_field() . '<input type="hidden" name="submission" value="' . e($id) . '">';
    $html .= '<fieldset><legend>Payment</legend><div class="checks"><label><input type="radio" name="provider" value="bank_transfer" checked> Bank transfer</label><label><input type="radio" name="provider" value="demo"> Demo confirmation (marks the campaign as sample data)</label></div></fieldset>';
    $html .= '<article class="panel"><p class="kicker">Transfer details</p><p>' . e($settings['bankName']) . '</p><p>' . e($settings['accountName']) . '</p><p>' . e($settings['accountNumber']) . '</p></article><button class="btn" type="submit">Create invoice</button></form>';
    layout('Checkout', $html);
}

function page_dashboard(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $campaigns = user_campaigns($user);
    $songs = array_values(array_filter(db()['songs'], static fn ($song) => $song['artistId'] === $user['id'] || ($user['role'] !== 'ARTIST' && $song['artistId'] === 'usr_artist')));
    $spend = 0;
    foreach (db()['payments'] as $payment) {
        if ($payment['userId'] === $user['id'] && $payment['status'] === 'SUCCESSFUL') {
            $spend += (int) $payment['amount'];
        }
    }
    $active = count(array_filter($campaigns, static fn ($c) => in_array($c['status'], ['IN_PROGRESS', 'QUEUED'], true)));
    $done = count(array_filter($campaigns, static fn ($c) => $c['status'] === 'COMPLETED'));
    $current = null;
    foreach ($campaigns as $campaign) {
        if ($campaign['status'] === 'IN_PROGRESS') {
            $current = $campaign;
            break;
        }
    }
    $current = $current ?? ($campaigns[0] ?? null);
    $body = '<p class="mist">Artist workspace</p><h1 class="display">Welcome back, ' . e($user['name']) . '</h1><div class="cards four">';
    foreach ([['Active campaigns', (string) $active], ['Completed campaigns', (string) $done], ['Songs', (string) count($songs)], ['Total campaign spend', naira($spend)]] as [$label, $value]) {
        $body .= '<article class="panel"><p class="kicker">' . e($label) . '</p><p class="price">' . e($value) . '</p></article>';
    }
    $body .= '</div>';
    if ($current) {
        $body .= '<section class="panel"><div class="split-title"><h2 class="kicker">Current campaign</h2>' . (!empty($current['demo']) ? '<span class="demo">Sample</span>' : '') . '</div>';
        $body .= '<p>' . e($current['songTitle']) . ' · ' . e($current['packageName']) . ' · ' . e(status_label($current['status'])) . ' · ' . (int) $current['progress'] . '%</p>';
        $body .= '<div class="meter"><span style="width:' . (int) $current['progress'] . '%"></span></div>';
        $body .= metric_list($current['channels']);
        $body .= '<a class="gold" href="' . e(url('/dashboard/campaigns/' . $current['id'])) . '">View campaign</a></section>';
    } else {
        $body .= '<p class="mist">No campaigns yet. Pitch a song to start.</p>';
    }
    workspace_shell($user, 'Dashboard', dashboard_links(), $body);
}

function page_dash_campaigns(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Campaigns</h1><div class="stack">';
    foreach (user_campaigns($user) as $campaign) {
        $body .= '<a class="panel" href="' . e(url('/dashboard/campaigns/' . $campaign['id'])) . '"><strong>' . e($campaign['songTitle']) . '</strong><span>' . e($campaign['packageName']) . ' · ' . e(status_label($campaign['status'])) . '</span></a>';
    }
    $body .= '</div>';
    workspace_shell($user, 'Campaigns', dashboard_links(), $body);
}

function page_dash_reports(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Reports</h1><p class="mist">Figures that were not recorded stay marked awaiting campaign data.</p><div class="stack">';
    foreach (user_campaigns($user) as $campaign) {
        $body .= '<a class="panel" href="' . e(url('/dashboard/reports/' . $campaign['id'])) . '"><strong>' . e($campaign['songTitle']) . '</strong><span>Open report</span></a>';
    }
    $body .= '</div>';
    workspace_shell($user, 'Reports', dashboard_links(), $body);
}

function page_campaign(string $id, bool $report): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $campaign = null;
    foreach (user_campaigns($user) as $row) {
        if ($row['id'] === $id) {
            $campaign = $row;
        }
    }
    if (!$campaign) {
        http_response_code(404);
        workspace_shell($user, 'Campaign', dashboard_links(), '<p>That campaign is not on this account.</p>');
        return;
    }
    $body = '<h1 class="display sm">' . e($campaign['songTitle']) . '</h1>';
    if (!empty($campaign['demo'])) {
        $body .= '<p class="demo">Sample campaign data.</p>';
    }
    $body .= '<p>' . e($campaign['packageName']) . ' · ' . e(status_label($campaign['status'])) . ' · ' . e(naira((int) $campaign['budgetNgn'])) . '</p>';
    $body .= '<p class="dim">' . e($campaign['startDate'] ?: 'Start date not set') . ' — ' . e($campaign['endDate'] ?: 'End date not set') . '</p>';
    $body .= '<div class="meter"><span style="width:' . (int) $campaign['progress'] . '%"></span></div>';
    $body .= metric_list($campaign['channels']);
    if ($report) {
        $body .= '<button class="btn line" type="button" onclick="window.print()">Print report</button>';
    }
    workspace_shell($user, $campaign['songTitle'], dashboard_links(), $body);
}

function page_dash_songs(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Songs</h1><ul>';
    foreach (db()['songs'] as $song) {
        if ($song['artistId'] === $user['id'] || ($user['role'] !== 'ARTIST' && $song['artistId'] === 'usr_artist')) {
            $body .= '<li><strong>' . e($song['title']) . '</strong> · ' . e($song['artistName']) . ' · ' . e($song['genre']) . '</li>';
        }
    }
    $body .= '</ul>' . button('/dashboard/submit', 'Add a song', 'line');
    workspace_shell($user, 'Songs', dashboard_links(), $body);
}

function page_dash_submit(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Submit a song</h1><form method="post" action="' . e(url('/dashboard/submit')) . '">' . csrf_field() . field('title', 'Title', 'text', '', true) . field('artistName', 'Artist', 'text', $user['name']) . select_field('genre', 'Genre', genres_list(), 'Afrobeats') . field('songLink', 'Song link', 'url', '', true) . field('releaseDate', 'Release date', 'date') . '<button class="btn" type="submit">Save song</button></form>';
    workspace_shell($user, 'Submit a song', dashboard_links(), $body);
}

function page_dash_market(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Marketplace</h1><div class="cards two">';
    foreach (db()['listings'] as $listing) {
        if (!empty($listing['active'])) {
            $body .= '<a class="panel" href="' . e(url('/marketplace/' . $listing['slug'])) . '"><strong>' . e($listing['service']) . '</strong><span>' . e(naira((int) $listing['priceNgn'])) . '</span></a>';
        }
    }
    $body .= '</div>';
    workspace_shell($user, 'Marketplace', dashboard_links(), $body);
}

function page_dash_messages(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Messages</h1><div class="thread">';
    foreach (db()['messages'] as $message) {
        if (!in_array($user['id'], $message['participantIds'], true) && $user['role'] !== 'ADMIN') {
            continue;
        }
        $body .= '<article><p class="kicker">' . e($message['senderName']) . '</p><p>' . e($message['body']) . '</p></article>';
    }
    $body .= '</div><form method="post" action="' . e(url('/dashboard/messages')) . '">' . csrf_field() . '<label class="field"><span>Reply</span><textarea name="body" required></textarea></label><button class="btn" type="submit">Send</button></form>';
    workspace_shell($user, 'Messages', dashboard_links(), $body);
}

function page_dash_payments(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Payments</h1><ul>';
    foreach (db()['payments'] as $payment) {
        if ($payment['userId'] === $user['id']) {
            $body .= '<li><a href="' . e(url('/dashboard/payments/' . $payment['id'])) . '">' . e($payment['invoiceNumber']) . '</a> · ' . e(naira((int) $payment['amount'])) . ' · ' . e(status_label($payment['status'])) . '</li>';
        }
    }
    $body .= '</ul>';
    workspace_shell($user, 'Payments', dashboard_links(), $body);
}

function page_invoice(string $id): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    foreach (db()['payments'] as $payment) {
        if ($payment['id'] === $id && $payment['userId'] === $user['id']) {
            $settings = db()['settings'];
            $body = '<h1 class="display sm">' . e($payment['invoiceNumber']) . '</h1><p>' . e($payment['description']) . '</p><p class="price">' . e(naira((int) $payment['amount'])) . '</p><p>' . e(status_label($payment['status'])) . ' · ' . e($payment['reference']) . '</p>';
            if ($payment['status'] === 'PENDING') {
                $body .= '<article class="panel"><p>Pay to ' . e($settings['accountName']) . ', ' . e($settings['bankName']) . ', ' . e($settings['accountNumber']) . '.</p><p class="dim">Use the reference so the desk can match the transfer. The campaign stays awaiting payment until it is confirmed.</p></article>';
            }
            workspace_shell($user, 'Invoice', dashboard_links(), $body);
            return;
        }
    }
    http_response_code(404);
    workspace_shell($user, 'Invoice', dashboard_links(), '<p>Invoice not found.</p>');
}

function page_dash_profile(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $profile = $user['profile'] ?? [];
    $body = '<h1 class="display sm">Public profile</h1><form method="post" action="' . e(url('/dashboard/profile')) . '">' . csrf_field();
    $body .= field('name', 'Account name', 'text', $user['name']) . field('stageName', 'Stage name', 'text', $profile['stageName'] ?? $user['name']) . field('slug', 'Public slug', 'text', $profile['slug'] ?? '') . field('phone', 'Phone', 'text', $user['phone']) . field('city', 'City', 'text', $user['city']) . field('country', 'Country', 'text', $user['country']);
    $body .= '<label class="field"><span>Biography</span><textarea name="bio">' . e($profile['bio'] ?? '') . '</textarea></label>';
    $body .= checks('genres', 'Genres', genres_list(), $profile['genres'] ?? []);
    $body .= field('website', 'Website', 'url', $profile['website'] ?? '') . field('instagram', 'Instagram', 'url', $profile['instagram'] ?? '') . field('spotify', 'Spotify', 'url', $profile['spotify'] ?? '') . field('audiomack', 'Audiomack', 'url', $profile['audiomack'] ?? '');
    $body .= '<button class="btn" type="submit">Save profile</button></form>';
    workspace_shell($user, 'Profile', dashboard_links(), $body);
}

function page_dash_settings(): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    $body = '<h1 class="display sm">Settings</h1><form method="post" action="' . e(url('/dashboard/settings')) . '">' . csrf_field();
    $body .= '<label><input type="checkbox" name="notifyEmail" ' . (!empty($user['notifyEmail']) ? 'checked' : '') . '> Email me campaign updates</label>';
    $body .= field('password', 'New password, optional', 'password');
    $body .= '<button class="btn" type="submit">Save settings</button></form>';
    workspace_shell($user, 'Settings', dashboard_links(), $body);
}

function page_admin(): void
{
    $user = require_role(['ADMIN']);
    $live = 0;
    foreach (db()['payments'] as $payment) {
        $demo = false;
        foreach (db()['campaigns'] as $campaign) {
            if ($campaign['id'] === $payment['campaignId'] && !empty($campaign['demo'])) {
                $demo = true;
            }
        }
        if ($payment['status'] === 'SUCCESSFUL' && $payment['provider'] !== 'demo' && !$demo) {
            $live += (int) $payment['amount'];
        }
    }
    $cards = [
        ['Total artists', count(array_filter(db()['users'], static fn ($u) => $u['role'] === 'ARTIST'))],
        ['Active campaigns', count(array_filter(db()['campaigns'], static fn ($c) => in_array($c['status'], ['IN_PROGRESS', 'QUEUED'], true)))],
        ['Live revenue', naira($live)],
        ['Pending applications', count(array_filter(db()['partners'], static fn ($p) => in_array($p['status'], ['PENDING', 'UNDER_REVIEW'], true)))],
        ['Active partners', count(array_filter(db()['partners'], static fn ($p) => $p['status'] === 'VERIFIED'))],
        ['Songs submitted', count(db()['songs'])],
    ];
    $body = '<h1 class="display sm">Overview</h1><p class="mist">Sample figures come from the demonstration workspace. Live revenue excludes demo campaigns and simulated payments.</p><div class="cards three">';
    foreach ($cards as [$label, $value]) {
        $body .= '<article class="panel"><p class="kicker">' . e($label) . '</p><p class="price">' . e((string) $value) . '</p></article>';
    }
    $body .= '</div>';
    workspace_shell($user, 'Admin', admin_links(), $body);
}

function page_admin_campaigns(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Campaigns</h1>';
    foreach (db()['campaigns'] as $campaign) {
        $body .= '<form class="panel" method="post" action="' . e(url('/admin/campaigns')) . '">' . csrf_field() . '<input type="hidden" name="id" value="' . e($campaign['id']) . '"><p><strong>' . e($campaign['songTitle']) . '</strong> · ' . e($campaign['artistName']) . ($campaign['demo'] ? ' · Sample' : '') . '</p>';
        $body .= '<label class="field"><span>Status</span><select name="status">';
        foreach (['DRAFT', 'AWAITING_PAYMENT', 'QUEUED', 'IN_PROGRESS', 'AWAITING_PARTNER', 'COMPLETED', 'CANCELLED'] as $status) {
            $body .= '<option' . ($campaign['status'] === $status ? ' selected' : '') . '>' . e($status) . '</option>';
        }
        $body .= '</select></label>' . field('progress', 'Progress', 'number', (string) $campaign['progress']) . field('assignee', 'Assignee', 'text', $campaign['assignee']) . '<button class="btn" type="submit">Save</button></form>';
    }
    workspace_shell($user, 'Campaigns', admin_links(), $body);
}

function page_admin_artists(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Artists</h1><ul>';
    foreach (db()['users'] as $row) {
        if (in_array($row['role'], ['ARTIST', 'MANAGER', 'LABEL'], true)) {
            $body .= '<li>' . e($row['name']) . ' · ' . e($row['email']) . ' · ' . e($row['role']) . (!empty($row['demo']) ? ' · Sample' : '') . '</li>';
        }
    }
    $body .= '</ul>';
    workspace_shell($user, 'Artists', admin_links(), $body);
}

function page_admin_songs(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Songs</h1><ul>';
    foreach (db()['songs'] as $song) {
        $body .= '<li>' . e($song['title']) . ' · ' . e($song['artistName']) . ' · ' . e($song['genre']) . '</li>';
    }
    $body .= '</ul>';
    workspace_shell($user, 'Songs', admin_links(), $body);
}

function page_admin_partners(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Partners</h1>';
    foreach (db()['partners'] as $partner) {
        $body .= '<form class="panel" method="post" action="' . e(url('/admin/partners')) . '">' . csrf_field() . '<input type="hidden" name="id" value="' . e($partner['id']) . '"><p><strong>' . e($partner['name']) . '</strong> · ' . e($partner['email']) . ' · ' . e($partner['phone']) . '</p><p class="mist">' . e($partner['description']) . '</p><label class="field"><span>Status</span><select name="status">';
        foreach (['PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED'] as $status) {
            $body .= '<option' . ($partner['status'] === $status ? ' selected' : '') . '>' . e($status) . '</option>';
        }
        $body .= '</select></label><button class="btn" type="submit">Update status</button></form>';
    }
    workspace_shell($user, 'Partners', admin_links(), $body);
}

function page_admin_payments(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Payments</h1>';
    foreach (db()['payments'] as $payment) {
        $body .= '<article class="panel"><p>' . e($payment['invoiceNumber']) . ' · ' . e(naira((int) $payment['amount'])) . ' · ' . e(status_label($payment['status'])) . ' · ' . e($payment['provider']) . '</p>';
        if ($payment['status'] !== 'SUCCESSFUL') {
            $body .= '<form method="post" action="' . e(url('/admin/payments')) . '">' . csrf_field() . '<input type="hidden" name="id" value="' . e($payment['id']) . '"><button class="btn" type="submit">Mark transfer received</button></form>';
        }
        $body .= '</article>';
    }
    workspace_shell($user, 'Payments', admin_links(), $body);
}

function page_admin_messages(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Messages</h1><div class="thread">';
    foreach (db()['messages'] as $message) {
        $body .= '<article><p class="kicker">' . e($message['senderName']) . ' · ' . e($message['threadId']) . '</p><p>' . e($message['body']) . '</p></article>';
    }
    $body .= '</div><form method="post" action="' . e(url('/admin/messages')) . '">' . csrf_field() . field('thread', 'Thread id', 'text', 'thr_campaign') . '<label class="field"><span>Reply</span><textarea name="body" required></textarea></label><button class="btn" type="submit">Send</button></form>';
    workspace_shell($user, 'Messages', admin_links(), $body);
}

function page_admin_redirects(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Redirects</h1><ul>';
    foreach (db()['redirects'] as $redirect) {
        $body .= '<li>' . e($redirect['oldUrl']) . ' → ' . e($redirect['newUrl']) . ' · ' . (int) $redirect['type'] . '</li>';
    }
    $body .= '</ul><form method="post" action="' . e(url('/admin/redirects')) . '">' . csrf_field() . field('oldUrl', 'Old path', 'text', '/old-page') . field('newUrl', 'New path', 'text', '/media') . '<button class="btn" type="submit">Add 301 redirect</button></form>';
    workspace_shell($user, 'Redirects', admin_links(), $body);
}

function page_admin_reports(): void
{
    $user = require_role(['ADMIN']);
    $body = '<h1 class="display sm">Reports</h1><ul>';
    foreach (db()['campaigns'] as $campaign) {
        $body .= '<li>' . e($campaign['songTitle']) . ' · ' . e($campaign['artistName']) . ' · ' . (int) $campaign['progress'] . '% · ' . e(status_label($campaign['status'])) . '</li>';
    }
    $body .= '</ul>';
    workspace_shell($user, 'Reports', admin_links(), $body);
}

function page_admin_settings(): void
{
    $user = require_role(['ADMIN']);
    $settings = db()['settings'];
    $body = '<h1 class="display sm">Settings</h1><form method="post" action="' . e(url('/admin/settings')) . '">' . csrf_field();
    $body .= field('bankName', 'Bank', 'text', $settings['bankName']) . field('accountName', 'Account name', 'text', $settings['accountName']) . field('accountNumber', 'Account number', 'text', $settings['accountNumber']);
    foreach (packages() as $package) {
        if ($package['priceNgn']) {
            $current = $settings['packagePrices'][$package['id']] ?? $package['priceNgn'];
            $body .= field('price_' . $package['id'], $package['name'] . ' price in naira', 'number', (string) $current);
        }
    }
    $body .= '<button class="btn" type="submit">Save settings</button></form><h2>Recent audit</h2><ul>';
    foreach (array_slice(array_reverse(db()['audit']), 0, 8) as $entry) {
        $body .= '<li>' . e($entry['action']) . ' · ' . e($entry['meta']) . '</li>';
    }
    $body .= '</ul>';
    workspace_shell($user, 'Settings', admin_links(), $body);
}

function page_admin_directory(string $kind): void
{
    $user = require_role(['ADMIN']);
    $map = ['playlist' => 'Playlist Curator', 'dj' => 'DJ', 'radio' => 'Radio', 'creator' => 'TikTok Creator', 'blog' => 'Blogger'];
    $body = '<h1 class="display sm">' . e(ucfirst($kind)) . '</h1><ul>';
    foreach (db()['partners'] as $partner) {
        $hit = false;
        foreach ($partner['categories'] as $category) {
            if ($kind === 'radio' && str_contains($category, 'Radio')) {
                $hit = true;
            }
            if ($kind === 'creator' && str_contains($category, 'Creator')) {
                $hit = true;
            }
            if (($map[$kind] ?? '') === $category) {
                $hit = true;
            }
        }
        if ($hit) {
            $body .= '<li>' . e($partner['name']) . ' · ' . e($partner['city']) . ' · ' . e(status_label($partner['status'])) . '</li>';
        }
    }
    $body .= '</ul>';
    workspace_shell($user, ucfirst($kind), admin_links(), $body);
}

function page_partner(): void
{
    $user = require_role(['PARTNER']);
    $partner = null;
    foreach (db()['partners'] as $row) {
        if ($row['userId'] === $user['id']) {
            $partner = $row;
        }
    }
    $body = '<h1 class="display sm">Partner desk</h1>';
    if ($partner) {
        $body .= '<p>' . e($partner['name']) . ' · ' . e(status_label($partner['status'])) . '</p><p class="mist">' . e($partner['description']) . '</p>';
    }
    $body .= '<div class="thread">';
    foreach (db()['messages'] as $message) {
        if (in_array($user['id'], $message['participantIds'], true)) {
            $body .= '<article><p class="kicker">' . e($message['senderName']) . '</p><p>' . e($message['body']) . '</p></article>';
        }
    }
    $body .= '</div><form method="post" action="' . e(url('/partner')) . '">' . csrf_field() . '<label class="field"><span>Reply to the desk</span><textarea name="body" required></textarea></label><button class="btn" type="submit">Send</button></form>';
    workspace_shell($user, 'Partner', [['/partner', 'Desk'], ['/logout', 'Log out']], $body);
}
