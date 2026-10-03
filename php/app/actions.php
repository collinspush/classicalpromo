<?php

function handle_post(string $path): void
{
    if (!csrf_ok()) {
        flash('error', 'The form expired. Submit it again.');
        redirect($path === '/logout' ? '/' : $path);
    }

    if ($path === '/login') {
        $next = post('next', 180);
        $dest = attempt_login(post('email', 180), (string) ($_POST['password'] ?? ''));
        if (!$dest) {
            flash('error', 'Those details do not match an account.');
            redirect('/login' . ($next !== '' ? '?next=' . rawurlencode($next) : ''));
        }
        if ($next !== '' && str_starts_with($next, '/') && !str_starts_with($next, '//')) {
            redirect($next);
        }
        redirect($dest);
    }

    if ($path === '/register') {
        $name = sanitize(post('name'));
        $email = strtolower(post('email', 180));
        $password = (string) ($_POST['password'] ?? '');
        $role = post('role', 20);
        if (!in_array($role, ['ARTIST', 'MANAGER', 'LABEL'], true)) {
            $role = 'ARTIST';
        }
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 10 || !preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
            flash('error', 'Use your name, a real email, and a password of at least 10 characters with a letter and a number.');
            redirect('/register');
        }
        foreach (db()['users'] as $user) {
            if (strtolower($user['email']) === $email) {
                flash('error', 'An account with that email already exists.');
                redirect('/register');
            }
        }
        $id = uid('usr');
        db_update(function (array &$db) use ($id, $email, $password, $name, $role) {
            $db['users'][] = [
                'id' => $id, 'email' => $email, 'passwordHash' => password_hash($password, PASSWORD_DEFAULT),
                'name' => $name, 'role' => $role, 'emailVerified' => true, 'phone' => post('phone', 40),
                'tokenVersion' => 0, 'demo' => false, 'country' => post('country', 80) ?: 'Nigeria',
                'city' => post('city', 80), 'company' => post('company', 120), 'notifyEmail' => true,
                'createdAt' => date('c'), 'profile' => null,
            ];
        });
        $_SESSION['user_id'] = $id;
        flash('ok', 'Account created. You can pitch a song from the workspace.');
        redirect('/dashboard');
    }

    if ($path === '/forgot-password') {
        $email = strtolower(post('email', 180));
        $user = null;
        foreach (db()['users'] as $row) {
            if (strtolower($row['email']) === $email) {
                $user = $row;
            }
        }
        flash('ok', 'If that email has an account, a reset link is ready below. On a live mailbox this would be emailed.');
        if ($user) {
            $token = bin2hex(random_bytes(16));
            db_update(function (array &$db) use ($user, $token) {
                $db['tokens'][] = [
                    'id' => uid('tok'), 'userId' => $user['id'], 'tokenHash' => hash('sha256', $token),
                    'purpose' => 'reset', 'expiresAt' => date('c', time() + 3600),
                ];
            });
            $_SESSION['reset_link'] = url('/reset-password?token=' . $token);
        }
        redirect('/forgot-password');
    }

    if ($path === '/reset-password') {
        $token = post('token', 80);
        $password = (string) ($_POST['password'] ?? '');
        $hash = hash('sha256', $token);
        $found = null;
        foreach (db()['tokens'] as $item) {
            if ($item['tokenHash'] === $hash && $item['purpose'] === 'reset' && strtotime($item['expiresAt']) > time()) {
                $found = $item;
            }
        }
        if (!$found || strlen($password) < 10) {
            flash('error', 'That reset link is invalid or expired, or the password is too short.');
            redirect('/forgot-password');
        }
        db_update(function (array &$db) use ($found, $password) {
            foreach ($db['users'] as &$user) {
                if ($user['id'] === $found['userId']) {
                    $user['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
                    $user['tokenVersion']++;
                }
            }
            $db['tokens'] = array_values(array_filter($db['tokens'], static fn ($item) => $item['id'] !== $found['id']));
        });
        flash('ok', 'Password updated. Log in with the new password.');
        redirect('/login');
    }

    if ($path === '/pitch') {
        pitch_post();
    }

    if ($path === '/partners') {
        partner_apply();
    }

    if ($path === '/checkout') {
        checkout_post();
    }

    if (str_starts_with($path, '/dashboard')) {
        dashboard_post($path);
    }

    if (str_starts_with($path, '/admin')) {
        admin_post($path);
    }

    if ($path === '/partner') {
        $user = require_role(['PARTNER']);
        send_message($user, 'thr_partner');
        redirect('/partner');
    }

    flash('error', 'That form could not be processed.');
    redirect($path);
}

function pitch_post(): void
{
    $step = (int) ($_POST['step'] ?? 0);
    $draft = $_SESSION['pitch'] ?? [
        'artistName' => '', 'email' => '', 'phone' => '', 'country' => 'Nigeria', 'city' => '', 'genre' => 'Afrobeats',
        'website' => '', 'instagram' => '', 'tiktok' => '', 'youtube' => '', 'spotify' => '', 'appleMusic' => '', 'audiomack' => '',
        'songTitle' => '', 'songArtist' => '', 'featured' => '', 'releaseGenre' => 'Afrobeats', 'releaseDate' => '', 'isrc' => '',
        'songLink' => '', 'lyrics' => '', 'videoLink' => '', 'goals' => [], 'markets' => [], 'audienceGenres' => [],
        'budget' => '50000', 'customBudget' => '',
    ];
    foreach (['artistName', 'email', 'phone', 'country', 'city', 'genre', 'website', 'instagram', 'tiktok', 'youtube', 'spotify', 'appleMusic', 'audiomack', 'songTitle', 'songArtist', 'featured', 'releaseGenre', 'releaseDate', 'isrc', 'songLink', 'lyrics', 'videoLink', 'budget', 'customBudget'] as $key) {
        if (isset($_POST[$key])) {
            $draft[$key] = sanitize((string) $_POST[$key]);
        }
    }
    if ($step === 2) {
        $draft['goals'] = post_list('goals');
    }
    if ($step === 3) {
        $draft['markets'] = post_list('markets');
        $draft['audienceGenres'] = post_list('audienceGenres');
    }
    $error = '';
    if ($step === 0 && ($draft['artistName'] === '' || !filter_var($draft['email'], FILTER_VALIDATE_EMAIL) || strlen($draft['phone']) < 7 || $draft['city'] === '')) {
        $error = 'Add the artist name, a real email, a phone number and a city.';
    }
    if ($step === 1 && ($draft['songTitle'] === '' || $draft['songArtist'] === '' || $draft['songLink'] === '')) {
        $error = 'Song title, artist and a song link are required. ISRC can wait.';
    }
    if ($step === 2 && $draft['goals'] === []) {
        $error = 'Choose at least one campaign goal.';
    }
    if ($step === 3 && ($draft['markets'] === [] || $draft['audienceGenres'] === [])) {
        $error = 'Choose at least one country and one genre.';
    }
    if ($step === 4 && $draft['budget'] === 'custom' && $draft['customBudget'] === '') {
        $error = 'Enter a custom budget, or pick a listed amount.';
    }
    $joined = implode(' ', array_filter($draft, 'is_string'));
    if ($issue = compliance_issue($joined)) {
        $error = $issue;
    }
    if ($error) {
        $_SESSION['pitch'] = $draft;
        flash('error', $error);
        redirect('/pitch?step=' . $step);
    }
    if (isset($_POST['back'])) {
        $_SESSION['pitch'] = $draft;
        redirect('/pitch?step=' . max(0, $step - 1));
    }
    if ($step < 4) {
        $_SESSION['pitch'] = $draft;
        redirect('/pitch?step=' . ($step + 1));
    }
    $packageId = recommend_package($draft['goals'], $draft['budget']);
    $draft['packageId'] = $packageId;
    $id = uid('sub');
    $user = current_user();
    db_update(function (array &$db) use ($id, $draft, $user) {
        $db['submissions'][] = [
            'id' => $id,
            'userId' => $user['id'] ?? null,
            'email' => strtolower($draft['email']),
            'payload' => $draft,
            'createdAt' => date('c'),
        ];
    });
    $_SESSION['pitch'] = $draft;
    $_SESSION['submission_id'] = $id;
    redirect('/pitch?step=5&submission=' . $id);
}

function partner_apply(): void
{
    $name = sanitize(post('name'));
    $email = strtolower(post('email', 180));
    $description = sanitize(post('description', 1000));
    $categories = post_list('categories');
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $categories === [] || $description === '') {
        flash('error', 'Name, email, at least one category, and a description are required.');
        redirect('/partners');
    }
    if ($issue = compliance_issue($description)) {
        flash('error', $issue);
        redirect('/partners');
    }
    db_update(function (array &$db) use ($name, $email, $description, $categories) {
        $db['partners'][] = [
            'id' => uid('prt'), 'userId' => current_user()['id'] ?? null, 'name' => $name, 'email' => $email,
            'phone' => post('phone', 40), 'country' => post('country', 80), 'city' => post('city', 80),
            'categories' => $categories, 'platform' => post('platform', 80), 'profileUrl' => post('profileUrl', 200),
            'audience' => post('audience', 160), 'genres' => post_list('genres'), 'description' => $description,
            'status' => 'PENDING', 'proofNote' => post('proofNote', 300), 'createdAt' => date('c'),
        ];
    });
    flash('ok', 'Application received. It stays pending until an admin reviews it. Public listings show verified partners only.');
    redirect('/partners');
}

function checkout_post(): void
{
    $user = require_login();
    $submissionId = post('submission', 40);
    $provider = post('provider', 40);
    $submission = null;
    foreach (db()['submissions'] as $row) {
        if ($row['id'] === $submissionId) {
            $submission = $row;
        }
    }
    if (!$submission) {
        flash('error', 'That pitch could not be found.');
        redirect('/pitch');
    }
    $packageId = $submission['payload']['packageId'] ?? recommend_package($submission['payload']['goals'] ?? [], $submission['payload']['budget'] ?? '50000');
    $pack = package_by_id($packageId);
    $amount = budget_amount($submission['payload'], $pack);
    if ($amount < 1000) {
        flash('error', 'Add a valid budget before checkout.');
        redirect('/pitch');
    }
    if (!in_array($provider, ['bank_transfer', 'demo'], true)) {
        flash('error', 'Card payments are not connected yet. Use bank transfer or the demo confirmation.');
        redirect('/checkout?submission=' . $submissionId);
    }
    $campaignId = uid('cmp');
    $paymentId = uid('pay');
    $services = services_for_goals($submission['payload']['goals'] ?? [], $packageId);
    $simulated = $provider === 'demo';
    db_update(function (array &$db) use ($user, $submission, $pack, $amount, $campaignId, $paymentId, $services, $simulated, $provider) {
        $channels = [];
        foreach ($services as $name) {
            $channels[] = ['name' => $name, 'metrics' => [['label' => 'Activity', 'value' => 'Awaiting campaign data', 'awaiting' => true]]];
        }
        $db['campaigns'][] = [
            'id' => $campaignId, 'artistId' => $user['id'], 'artistName' => $user['name'], 'songId' => '',
            'songTitle' => $submission['payload']['songTitle'], 'packageId' => $pack['id'], 'packageName' => $pack['name'],
            'status' => $simulated ? 'QUEUED' : 'AWAITING_PAYMENT', 'budgetNgn' => $amount, 'currency' => 'NGN',
            'goals' => $submission['payload']['goals'], 'markets' => $submission['payload']['markets'],
            'genres' => $submission['payload']['audienceGenres'], 'services' => $services, 'progress' => $simulated ? 5 : 0,
            'demo' => !empty($user['demo']) || $simulated, 'assignee' => 'Unassigned', 'startDate' => '', 'endDate' => '',
            'channels' => $channels, 'createdAt' => date('c'),
        ];
        $db['songs'][] = [
            'id' => uid('song'), 'artistId' => $user['id'], 'title' => $submission['payload']['songTitle'],
            'artistName' => $submission['payload']['songArtist'], 'featured' => $submission['payload']['featured'] ?? '',
            'genre' => $submission['payload']['releaseGenre'] ?? '', 'releaseDate' => $submission['payload']['releaseDate'] ?? '',
            'isrc' => $submission['payload']['isrc'] ?? '', 'songLink' => $submission['payload']['songLink'] ?? '',
            'lyrics' => $submission['payload']['lyrics'] ?? '', 'videoLink' => $submission['payload']['videoLink'] ?? '',
            'createdAt' => date('c'),
        ];
        $db['payments'][] = [
            'id' => $paymentId, 'userId' => $user['id'], 'campaignId' => $campaignId, 'provider' => $provider,
            'reference' => 'CP-' . date('YmdHis'), 'amount' => $amount, 'currency' => 'NGN',
            'status' => $simulated ? 'SUCCESSFUL' : 'PENDING', 'invoiceNumber' => 'INV-' . date('Y') . '-' . random_int(1000, 9999),
            'billTo' => $user['name'], 'description' => $pack['name'] . ' campaign for ' . $submission['payload']['songTitle'],
            'createdAt' => date('c'),
        ];
        $db['notifications'][] = [
            'id' => uid('ntf'), 'userId' => $user['id'], 'type' => 'payment', 'title' => $simulated ? 'Campaign queued' : 'Invoice created',
            'body' => $simulated ? 'Demo confirmation queued the campaign. It is marked as demonstration data.' : 'Bank transfer is pending. The campaign starts after the desk confirms payment.',
            'read' => false, 'createdAt' => date('c'),
        ];
    });
    flash('ok', $simulated ? 'Demo confirmation recorded. The campaign is queued and labelled as demonstration data.' : 'Invoice created. Pay by transfer, then the desk will confirm it.');
    redirect('/dashboard/payments/' . $paymentId);
}

function send_message(array $user, string $threadId): void
{
    $body = sanitize(post('body', 2000));
    if ($body === '') {
        flash('error', 'Write a message first.');
        return;
    }
    if ($issue = compliance_issue($body)) {
        flash('error', $issue);
        return;
    }
    db_update(function (array &$db) use ($user, $threadId, $body) {
        $participants = [$user['id'], 'usr_admin'];
        $db['messages'][] = [
            'id' => uid('msg'), 'threadId' => $threadId, 'campaignId' => post('campaign', 40),
            'senderId' => $user['id'], 'senderName' => $user['name'], 'senderRole' => $user['role'],
            'body' => $body, 'createdAt' => date('c'), 'participantIds' => $participants,
        ];
    });
    flash('ok', 'Message sent to the desk.');
}

function dashboard_post(string $path): void
{
    $user = require_role(['ARTIST', 'MANAGER', 'LABEL']);
    if ($path === '/dashboard/messages') {
        send_message($user, 'thr_' . $user['id']);
        redirect('/dashboard/messages');
    }
    if ($path === '/dashboard/profile') {
        db_update(function (array &$db) use ($user) {
            foreach ($db['users'] as &$row) {
                if ($row['id'] !== $user['id']) {
                    continue;
                }
                $row['name'] = sanitize(post('name')) ?: $row['name'];
                $row['phone'] = post('phone', 40);
                $row['country'] = post('country', 80);
                $row['city'] = post('city', 80);
                $row['company'] = post('company', 120);
                $slug = trim(post('slug', 80), '-');
                $slug = preg_replace('/[^a-z0-9-]/', '', strtolower($slug)) ?: null;
                $row['profile'] = [
                    'slug' => $slug,
                    'stageName' => sanitize(post('stageName')) ?: $row['name'],
                    'bio' => sanitize(post('bio', 800)),
                    'country' => $row['country'],
                    'city' => $row['city'],
                    'genres' => post_list('genres'),
                    'website' => post('website', 200),
                    'instagram' => post('instagram', 200),
                    'tiktok' => post('tiktok', 200),
                    'youtube' => post('youtube', 200),
                    'spotify' => post('spotify', 200),
                    'appleMusic' => post('appleMusic', 200),
                    'audiomack' => post('audiomack', 200),
                    'verified' => false,
                ];
            }
        });
        flash('ok', 'Profile saved. A public page appears when the slug is set. Verification is reviewed by the desk.');
        redirect('/dashboard/profile');
    }
    if ($path === '/dashboard/settings') {
        $password = (string) ($_POST['password'] ?? '');
        db_update(function (array &$db) use ($user, $password) {
            foreach ($db['users'] as &$row) {
                if ($row['id'] !== $user['id']) {
                    continue;
                }
                $row['notifyEmail'] = isset($_POST['notifyEmail']);
                if ($password !== '') {
                    if (strlen($password) < 10) {
                        continue;
                    }
                    $row['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
                }
            }
        });
        flash('ok', 'Settings saved.');
        redirect('/dashboard/settings');
    }
    if ($path === '/dashboard/submit') {
        $title = sanitize(post('title'));
        $link = post('songLink', 300);
        if ($title === '' || $link === '') {
            flash('error', 'A song title and link are required.');
            redirect('/dashboard/submit');
        }
        db_update(function (array &$db) use ($user, $title, $link) {
            $db['songs'][] = [
                'id' => uid('song'), 'artistId' => $user['id'], 'title' => $title, 'artistName' => post('artistName') ?: $user['name'],
                'featured' => post('featured'), 'genre' => post('genre', 40), 'releaseDate' => post('releaseDate', 20),
                'isrc' => post('isrc', 20), 'songLink' => $link, 'lyrics' => post('lyrics', 2000), 'videoLink' => post('videoLink', 300),
                'createdAt' => date('c'),
            ];
        });
        flash('ok', 'Song saved to your workspace.');
        redirect('/dashboard/songs');
    }
    redirect('/dashboard');
}

function admin_post(string $path): void
{
    $admin = require_role(['ADMIN']);
    if ($path === '/admin/campaigns') {
        $id = post('id', 40);
        db_update(function (array &$db) use ($id) {
            foreach ($db['campaigns'] as &$campaign) {
                if ($campaign['id'] !== $id) {
                    continue;
                }
                $status = post('status', 40);
                if (in_array($status, ['DRAFT', 'AWAITING_PAYMENT', 'QUEUED', 'IN_PROGRESS', 'AWAITING_PARTNER', 'COMPLETED', 'CANCELLED'], true)) {
                    $campaign['status'] = $status;
                }
                $campaign['progress'] = max(0, min(100, (int) post('progress', 3)));
                $campaign['assignee'] = sanitize(post('assignee', 80));
            }
            $db['audit'][] = ['id' => uid('aud'), 'userId' => 'usr_admin', 'action' => 'campaign_update', 'target' => $id, 'meta' => post('status', 40), 'createdAt' => date('c')];
        });
        flash('ok', 'Campaign updated.');
        redirect('/admin/campaigns');
    }
    if ($path === '/admin/partners') {
        $id = post('id', 40);
        $status = post('status', 40);
        if (!in_array($status, ['PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED'], true)) {
            $status = 'UNDER_REVIEW';
        }
        db_update(function (array &$db) use ($id, $status, $admin) {
            foreach ($db['partners'] as &$partner) {
                if ($partner['id'] === $id) {
                    $partner['status'] = $status;
                }
            }
            $db['audit'][] = ['id' => uid('aud'), 'userId' => $admin['id'], 'action' => 'partner_status', 'target' => $id, 'meta' => $status, 'createdAt' => date('c')];
        });
        flash('ok', 'Partner status saved. Only verified partners appear in the public network.');
        redirect('/admin/partners');
    }
    if ($path === '/admin/payments') {
        $id = post('id', 40);
        db_update(function (array &$db) use ($id) {
            $campaignId = null;
            foreach ($db['payments'] as &$payment) {
                if ($payment['id'] === $id) {
                    $payment['status'] = 'SUCCESSFUL';
                    $campaignId = $payment['campaignId'];
                }
            }
            foreach ($db['campaigns'] as &$campaign) {
                if ($campaign['id'] === $campaignId && $campaign['status'] === 'AWAITING_PAYMENT') {
                    $campaign['status'] = 'QUEUED';
                }
            }
        });
        flash('ok', 'Payment marked successful and the campaign moved to queued.');
        redirect('/admin/payments');
    }
    if ($path === '/admin/redirects') {
        $old = '/' . trim(post('oldUrl', 180), '/');
        $new = '/' . trim(post('newUrl', 180), '/');
        if ($old === '/' || $new === '/') {
            flash('error', 'Add both the old path and the new path.');
            redirect('/admin/redirects');
        }
        db_update(function (array &$db) use ($old, $new, $admin) {
            $db['redirects'][] = ['id' => uid('red'), 'oldUrl' => $old, 'newUrl' => $new === '//' ? '/' : $new, 'type' => 301, 'status' => 'active', 'createdAt' => date('c')];
            $db['audit'][] = ['id' => uid('aud'), 'userId' => $admin['id'], 'action' => 'redirect', 'target' => $old, 'meta' => $new, 'createdAt' => date('c')];
        });
        flash('ok', 'Redirect saved.');
        redirect('/admin/redirects');
    }
    if ($path === '/admin/settings') {
        db_update(function (array &$db) {
            $db['settings']['bankName'] = sanitize(post('bankName', 80));
            $db['settings']['accountName'] = sanitize(post('accountName', 80));
            $db['settings']['accountNumber'] = sanitize(post('accountNumber', 40));
            $prices = [];
            foreach (['starter', 'growth', 'breakout'] as $id) {
                $raw = post('price_' . $id, 12);
                if ($raw !== '') {
                    $prices[$id] = (int) $raw;
                }
            }
            $db['settings']['packagePrices'] = $prices;
        });
        flash('ok', 'Settings saved.');
        redirect('/admin/settings');
    }
    if ($path === '/admin/messages') {
        send_message($admin, post('thread', 40) ?: 'thr_admin');
        redirect('/admin/messages');
    }
    redirect('/admin');
}
