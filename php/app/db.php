<?php

function db_file(): string
{
    return dirname(__DIR__) . '/data/db.json';
}

function db(): array
{
    if (!isset($GLOBALS['cp_db'])) {
        $GLOBALS['cp_db'] = db_load();
    }
    return $GLOBALS['cp_db'];
}

function db_load(): array
{
    $file = db_file();
    if (!is_file($file)) {
        $data = create_seed(password_hash(DEMO_PASSWORD, PASSWORD_DEFAULT));
        db_save($data);
        return $data;
    }
    $decoded = json_decode((string) file_get_contents($file), true);
    if (!is_array($decoded) || !isset($decoded['users'])) {
        $data = create_seed(password_hash(DEMO_PASSWORD, PASSWORD_DEFAULT));
        db_save($data);
        return $data;
    }
    return $decoded;
}

function db_save(array $data): void
{
    $file = db_file();
    $dir = dirname($file);
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        throw new RuntimeException('The data folder is not writable. On cPanel, set data/ to 755 or 775.');
    }
    $fp = fopen($file, 'c+');
    if ($fp === false) {
        throw new RuntimeException('Could not open the database file.');
    }
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    $GLOBALS['cp_db'] = $data;
}

function db_update(callable $mutator)
{
    $data = db();
    $result = $mutator($data);
    db_save($data);
    return $result;
}

function create_seed(string $passwordHash): array
{
    $now = '2026-09-20T10:00:00+00:00';
    $user = static function (string $id, string $email, string $name, string $role, array $extra = []) use ($passwordHash, $now): array {
        return array_merge([
            'id' => $id,
            'email' => $email,
            'passwordHash' => $passwordHash,
            'name' => $name,
            'role' => $role,
            'emailVerified' => true,
            'phone' => '',
            'tokenVersion' => 0,
            'demo' => true,
            'country' => 'Nigeria',
            'city' => 'Lagos',
            'company' => '',
            'notifyEmail' => true,
            'createdAt' => $now,
            'profile' => null,
        ], $extra);
    };

    return [
        'users' => [
            $user('usr_artist', 'artist@classicalpromo.com.ng', 'Adaeze Okonkwo', 'ARTIST', [
                'phone' => '+2348000000001',
                'profile' => [
                    'slug' => 'adaeze-okonkwo',
                    'stageName' => 'Adaeze Okonkwo',
                    'bio' => 'Sample artist profile. Adaeze is a fictional Afrobeats artist used to show how a ClassicalPromo profile, campaign and report fit together. She is not a client.',
                    'country' => 'Nigeria',
                    'city' => 'Lagos',
                    'genres' => ['Afrobeats', 'R&B'],
                    'website' => 'https://classicalpromo.com.ng/artists/adaeze-okonkwo',
                    'instagram' => 'https://instagram.com',
                    'tiktok' => 'https://www.tiktok.com',
                    'youtube' => 'https://youtube.com',
                    'spotify' => 'https://open.spotify.com',
                    'appleMusic' => 'https://music.apple.com',
                    'audiomack' => 'https://audiomack.com',
                    'verified' => true,
                ],
            ]),
            $user('usr_manager', 'manager@classicalpromo.com.ng', 'Tunde Bakare', 'MANAGER', ['phone' => '+2348000000002', 'company' => 'Bakare Artist Management']),
            $user('usr_label', 'label@classicalpromo.com.ng', 'Northline Records', 'LABEL', ['phone' => '+2348000000003', 'city' => 'Abuja', 'company' => 'Northline Records']),
            $user('usr_partner', 'partner@classicalpromo.com.ng', 'DJ Reef', 'PARTNER'),
            $user('usr_admin', 'admin@classicalpromo.com.ng', 'Amaka Diala', 'ADMIN', ['company' => 'ClassicalPromo']),
        ],
        'songs' => [[
            'id' => 'song_demo', 'artistId' => 'usr_artist', 'title' => 'My New Song', 'artistName' => 'Adaeze Okonkwo',
            'featured' => '', 'genre' => 'Afrobeats', 'releaseDate' => '2026-09-12', 'isrc' => '',
            'songLink' => 'https://classicalpromo.com.ng/artists/adaeze-okonkwo', 'lyrics' => '', 'videoLink' => '', 'createdAt' => '2026-09-01T09:00:00+00:00',
        ]],
        'campaigns' => [
            [
                'id' => 'cmp_breakout_demo', 'artistId' => 'usr_artist', 'artistName' => 'Adaeze Okonkwo', 'songId' => 'song_demo',
                'songTitle' => 'My New Song', 'packageId' => 'breakout', 'packageName' => 'BREAKOUT', 'status' => 'IN_PROGRESS',
                'budgetNgn' => 350000, 'currency' => 'NGN', 'goals' => ['Playlist discovery', 'TikTok', 'Instagram', 'Radio', 'DJs', 'Blogs'],
                'markets' => ['Nigeria', 'UK'], 'genres' => ['Afrobeats'],
                'services' => ['Playlist Outreach', 'TikTok Creator Campaign', 'Instagram Promotion', 'Radio Servicing', 'DJ Promotion', 'Music Blog Promotion'],
                'progress' => 78, 'demo' => true, 'assignee' => 'Amaka Diala', 'startDate' => '2026-09-08', 'endDate' => '2026-10-08',
                'createdAt' => '2026-09-08T08:00:00+00:00',
                'channels' => [
                    ['name' => 'TikTok', 'metrics' => [['label' => 'Creators contacted', 'value' => '25', 'awaiting' => false], ['label' => 'Content pieces published', 'value' => '8', 'awaiting' => false], ['label' => 'Views', 'value' => 'Awaiting campaign data', 'awaiting' => true], ['label' => 'Engagement', 'value' => 'Awaiting campaign data', 'awaiting' => true]]],
                    ['name' => 'Playlist Outreach', 'metrics' => [['label' => 'Curators contacted', 'value' => '40', 'awaiting' => false], ['label' => 'Responses', 'value' => 'Awaiting campaign data', 'awaiting' => true], ['label' => 'Placements reported', 'value' => '7', 'awaiting' => false]]],
                    ['name' => 'Instagram', 'metrics' => [['label' => 'Creators contacted', 'value' => 'Awaiting campaign data', 'awaiting' => true], ['label' => 'Posts published', 'value' => 'Awaiting campaign data', 'awaiting' => true]]],
                    ['name' => 'Radio', 'metrics' => [['label' => 'Stations serviced', 'value' => '35', 'awaiting' => false], ['label' => 'Responses', 'value' => 'Awaiting campaign data', 'awaiting' => true], ['label' => 'Confirmations', 'value' => '12', 'awaiting' => false], ['label' => 'Confirmed spins', 'value' => 'Awaiting campaign data', 'awaiting' => true]]],
                    ['name' => 'DJ Campaign', 'metrics' => [['label' => 'DJs serviced', 'value' => '50', 'awaiting' => false], ['label' => 'Responses', 'value' => '18', 'awaiting' => false]]],
                    ['name' => 'Blogs', 'metrics' => [['label' => 'Outlets pitched', 'value' => '20', 'awaiting' => false], ['label' => 'Published articles', 'value' => '7', 'awaiting' => false]]],
                    ['name' => 'YouTube', 'metrics' => [['label' => 'Channel performance', 'value' => 'Awaiting campaign data', 'awaiting' => true]]],
                ],
            ],
            [
                'id' => 'cmp_done_demo', 'artistId' => 'usr_artist', 'artistName' => 'Adaeze Okonkwo', 'songId' => 'song_demo',
                'songTitle' => 'Golden Hour Draft', 'packageId' => 'starter', 'packageName' => 'STARTER', 'status' => 'COMPLETED',
                'budgetNgn' => 50000, 'currency' => 'NGN', 'goals' => ['Blogs'], 'markets' => ['Nigeria'], 'genres' => ['Afrobeats'],
                'services' => ['Music blog pitches'], 'progress' => 100, 'demo' => true, 'assignee' => 'Amaka Diala',
                'startDate' => '2026-07-01', 'endDate' => '2026-07-15', 'createdAt' => '2026-07-01T08:00:00+00:00',
                'channels' => [['name' => 'Blogs', 'metrics' => [['label' => 'Pitches', 'value' => '12', 'awaiting' => false], ['label' => 'Published articles', 'value' => '3', 'awaiting' => false]]]],
            ],
        ],
        'submissions' => [],
        'partners' => [
            ['id' => 'prt_reef', 'userId' => 'usr_partner', 'name' => 'DJ Reef', 'email' => 'partner@classicalpromo.com.ng', 'phone' => '+2348000000004', 'country' => 'Nigeria', 'city' => 'Lagos', 'categories' => ['DJ'], 'platform' => 'Instagram', 'profileUrl' => 'https://instagram.com', 'audience' => 'Club audiences in Lagos', 'genres' => ['Afrobeats', 'Amapiano'], 'description' => 'Sample partner profile for a Lagos DJ. Contact details are visible to ClassicalPromo admins only.', 'status' => 'VERIFIED', 'proofNote' => 'Sample verification record.', 'createdAt' => $now],
            ['id' => 'prt_curator', 'userId' => null, 'name' => 'Palm House Playlists', 'email' => 'curator.sample@classicalpromo.com.ng', 'phone' => '', 'country' => 'United Kingdom', 'city' => 'London', 'categories' => ['Playlist Curator'], 'platform' => 'Streaming', 'profileUrl' => 'https://open.spotify.com', 'audience' => 'Independent Afrobeats listeners', 'genres' => ['Afrobeats', 'Afropop'], 'description' => 'Sample independent playlist brand. This is not an official platform partnership.', 'status' => 'VERIFIED', 'proofNote' => 'Sample.', 'createdAt' => $now],
            ['id' => 'prt_radio', 'userId' => null, 'name' => 'Coast FM Sample', 'email' => 'radio.sample@classicalpromo.com.ng', 'phone' => '', 'country' => 'Nigeria', 'city' => 'Port Harcourt', 'categories' => ['Radio Station'], 'platform' => 'Radio', 'profileUrl' => '', 'audience' => 'South-south Nigeria', 'genres' => ['Afrobeats', 'Highlife', 'Hip-Hop'], 'description' => 'Sample station record used to demonstrate radio servicing. Not a confirmed live partner.', 'status' => 'VERIFIED', 'proofNote' => 'Sample.', 'createdAt' => $now],
            ['id' => 'prt_tiktok', 'userId' => null, 'name' => 'Nia Creates', 'email' => 'creator.sample@classicalpromo.com.ng', 'phone' => '', 'country' => 'Nigeria', 'city' => 'Abuja', 'categories' => ['TikTok Creator'], 'platform' => 'TikTok', 'profileUrl' => 'https://www.tiktok.com', 'audience' => 'Music discovery audience', 'genres' => ['Afrobeats', 'Pop'], 'description' => 'Sample creator profile for campaign matching.', 'status' => 'VERIFIED', 'proofNote' => 'Sample.', 'createdAt' => $now],
            ['id' => 'prt_blog', 'userId' => null, 'name' => 'The Sunday Selector', 'email' => 'blog.sample@classicalpromo.com.ng', 'phone' => '', 'country' => 'Ghana', 'city' => 'Accra', 'categories' => ['Blogger'], 'platform' => 'Blog', 'profileUrl' => '', 'audience' => 'West African music readers', 'genres' => ['Afrobeats', 'Highlife', 'Alternative'], 'description' => 'Sample music blog used in the directory.', 'status' => 'VERIFIED', 'proofNote' => 'Sample.', 'createdAt' => $now],
            ['id' => 'prt_pending', 'userId' => null, 'name' => 'Kofi Air', 'email' => 'pending.sample@classicalpromo.com.ng', 'phone' => '+233000000000', 'country' => 'Ghana', 'city' => 'Accra', 'categories' => ['Radio Presenter'], 'platform' => 'Radio', 'profileUrl' => '', 'audience' => 'Drive-time show', 'genres' => ['Afrobeats', 'Hip-Hop'], 'description' => 'Sample application waiting for review.', 'status' => 'UNDER_REVIEW', 'proofNote' => 'Awaiting proof of show ownership.', 'createdAt' => $now],
        ],
        'listings' => [
            ['id' => 'lst_playlist', 'slug' => 'independent-afrobeats-playlist-outreach', 'service' => 'Playlist campaign', 'category' => 'Playlist', 'audience' => 'Independent playlist listeners', 'country' => 'Nigeria', 'genre' => 'Afrobeats', 'priceNgn' => 25000, 'deliverables' => ['Curator shortlist', 'Pitch log', 'Reported placements'], 'duration' => '14 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_dj', 'slug' => 'lagos-dj-servicing', 'service' => 'DJ campaign', 'category' => 'DJ', 'audience' => 'Club DJs', 'country' => 'Nigeria', 'genre' => 'Afrobeats', 'priceNgn' => 35000, 'deliverables' => ['DJ servicing', 'Response log'], 'duration' => '14 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_radio', 'slug' => 'south-south-radio-servicing', 'service' => 'Radio campaign', 'category' => 'Radio', 'audience' => 'Regional radio listeners', 'country' => 'Nigeria', 'genre' => 'Afrobeats', 'priceNgn' => 50000, 'deliverables' => ['Station servicing pack', 'Response log', 'Verified spins only'], 'duration' => '21 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_tiktok', 'slug' => 'tiktok-creator-introductions', 'service' => 'TikTok campaign', 'category' => 'TikTok', 'audience' => 'Music creators', 'country' => 'Nigeria', 'genre' => 'Afropop', 'priceNgn' => 40000, 'deliverables' => ['Creator outreach', 'Posts published', 'Figures only when supplied'], 'duration' => '21 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_instagram', 'slug' => 'instagram-creator-campaign', 'service' => 'Instagram campaign', 'category' => 'Instagram', 'audience' => 'Music and culture audiences', 'country' => 'Worldwide', 'genre' => 'R&B', 'priceNgn' => 40000, 'deliverables' => ['Account outreach', 'Publish log'], 'duration' => '21 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_youtube', 'slug' => 'youtube-music-features', 'service' => 'YouTube campaign', 'category' => 'YouTube', 'audience' => 'Music video viewers', 'country' => 'UK', 'genre' => 'Afrobeats', 'priceNgn' => 45000, 'deliverables' => ['Channel outreach', 'Feature log'], 'duration' => '21 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_blog', 'slug' => 'west-africa-blog-pitches', 'service' => 'Blog campaign', 'category' => 'Blogs', 'audience' => 'Music readers', 'country' => 'Ghana', 'genre' => 'Highlife', 'priceNgn' => 30000, 'deliverables' => ['Pitches', 'Published links when a story runs'], 'duration' => '21 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_pr', 'slug' => 'release-press-outreach', 'service' => 'PR campaign', 'category' => 'PR', 'audience' => 'Music press', 'country' => 'Nigeria', 'genre' => 'Afrobeats', 'priceNgn' => 80000, 'deliverables' => ['Press note', 'Journalist outreach', 'Coverage links'], 'duration' => '30 days', 'verified' => true, 'active' => true],
            ['id' => 'lst_creator', 'slug' => 'creator-seeding-campaign', 'service' => 'Creator campaign', 'category' => 'Creators', 'audience' => 'Short-form music audiences', 'country' => 'Worldwide', 'genre' => 'Pop', 'priceNgn' => 60000, 'deliverables' => ['Creator shortlist', 'Outreach record', 'Posts that actually publish'], 'duration' => '21 days', 'verified' => true, 'active' => true],
        ],
        'messages' => [
            ['id' => 'msg_1', 'threadId' => 'thr_campaign', 'campaignId' => 'cmp_breakout_demo', 'senderId' => 'usr_admin', 'senderName' => 'ClassicalPromo desk', 'senderRole' => 'ADMIN', 'body' => 'Your BREAKOUT campaign for My New Song is in progress. This thread is the place to ask about activity, assets and timing. Partner phone numbers are not shared here.', 'createdAt' => '2026-09-09T11:00:00+00:00', 'participantIds' => ['usr_artist', 'usr_admin']],
            ['id' => 'msg_2', 'threadId' => 'thr_campaign', 'campaignId' => 'cmp_breakout_demo', 'senderId' => 'usr_artist', 'senderName' => 'Adaeze Okonkwo', 'senderRole' => 'ARTIST', 'body' => 'Thank you. Please prioritise Lagos radio and UK playlist curators this week.', 'createdAt' => '2026-09-09T15:30:00+00:00', 'participantIds' => ['usr_artist', 'usr_admin']],
            ['id' => 'msg_3', 'threadId' => 'thr_partner', 'campaignId' => 'cmp_breakout_demo', 'senderId' => 'usr_admin', 'senderName' => 'ClassicalPromo desk', 'senderRole' => 'ADMIN', 'body' => 'DJ Reef, a demo campaign has been assigned for servicing. Reply with what you played or whether the record is not a fit. Do not promise spins.', 'createdAt' => '2026-09-10T09:00:00+00:00', 'participantIds' => ['usr_partner', 'usr_admin']],
        ],
        'notifications' => [
            ['id' => 'ntf_1', 'userId' => 'usr_artist', 'type' => 'campaign_update', 'title' => 'Campaign update', 'body' => 'BREAKOUT for My New Song is active. Figures in the dashboard are demonstration data.', 'read' => false, 'createdAt' => '2026-09-18T09:00:00+00:00'],
            ['id' => 'ntf_2', 'userId' => 'usr_partner', 'type' => 'partner_application', 'title' => 'Partner status', 'body' => 'Your sample partner profile is verified.', 'read' => false, 'createdAt' => '2026-09-12T09:00:00+00:00'],
        ],
        'payments' => [[
            'id' => 'pay_demo', 'userId' => 'usr_artist', 'campaignId' => 'cmp_breakout_demo', 'provider' => 'bank_transfer',
            'reference' => 'CP-DEMO-1001', 'amount' => 350000, 'currency' => 'NGN', 'status' => 'SUCCESSFUL',
            'invoiceNumber' => 'INV-2026-1001', 'billTo' => 'Adaeze Okonkwo', 'description' => 'BREAKOUT campaign for My New Song',
            'createdAt' => '2026-09-08T08:05:00+00:00',
        ]],
        'redirects' => [
            ['id' => 'red_blog', 'oldUrl' => '/blog', 'newUrl' => '/media', 'type' => 301, 'status' => 'active', 'createdAt' => $now],
            ['id' => 'red_contact', 'oldUrl' => '/contact-us', 'newUrl' => '/about', 'type' => 301, 'status' => 'active', 'createdAt' => $now],
        ],
        'tokens' => [],
        'audit' => [['id' => 'aud_1', 'userId' => 'usr_admin', 'action' => 'seed', 'target' => 'database', 'meta' => 'Demonstration workspace created', 'createdAt' => $now]],
        'settings' => [
            'bankName' => 'Add your bank in admin settings',
            'accountName' => 'ClassicalPromo',
            'accountNumber' => 'Not configured',
            'packagePrices' => [],
        ],
    ];
}
