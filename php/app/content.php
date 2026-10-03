<?php

function packages(): array
{
    return [
        ['id' => 'starter', 'name' => 'STARTER', 'audience' => 'For emerging artists preparing a first serious release push.', 'priceNgn' => 50000, 'priceLabel' => '₦ 50,000', 'duration' => '14 days', 'featured' => false, 'services' => ['Playlist outreach', 'Music blog pitches', 'Campaign setup'], 'deliverables' => ['Curator outreach on relevant independent playlists', 'Blog pitch log', 'One campaign summary'], 'reporting' => 'Activity report at the end of the campaign.'],
        ['id' => 'growth', 'name' => 'GROWTH', 'audience' => 'For artists launching a focused release with more than one channel.', 'priceNgn' => 150000, 'priceLabel' => '₦ 150,000', 'duration' => '21 days', 'featured' => true, 'services' => ['Playlist outreach', 'TikTok creator campaign', 'Instagram promotion', 'DJ promotion', 'Radio servicing'], 'deliverables' => ['Channel-by-channel activity log', 'Creator and curator outreach records', 'DJ and radio servicing notes'], 'reporting' => 'Mid-campaign update and a closing report.'],
        ['id' => 'breakout', 'name' => 'BREAKOUT', 'audience' => 'For artists seeking coordinated exposure across several audiences.', 'priceNgn' => 350000, 'priceLabel' => '₦ 350,000', 'duration' => '30 days', 'featured' => false, 'services' => ['Playlist outreach', 'TikTok creator campaign', 'Instagram promotion', 'YouTube promotion', 'Radio servicing', 'DJ promotion', 'Blog and press outreach'], 'deliverables' => ['Multi-channel campaign desk', 'Weekly activity updates', 'Placement and response log where partners report them'], 'reporting' => 'Weekly notes and a full closing report.'],
        ['id' => 'custom', 'name' => 'CUSTOM', 'audience' => 'For labels, managers and established artists with a specific brief.', 'priceNgn' => null, 'priceLabel' => 'Scoped', 'duration' => 'Agreed per brief', 'featured' => false, 'services' => ['Strategy', 'Channel mix', 'Team assignment', 'Reporting plan'], 'deliverables' => ['Written campaign scope before work begins', 'Named services and markets', 'Reporting schedule agreed in advance'], 'reporting' => 'Defined in the scope. Activity is reported; results are not guaranteed.'],
    ];
}

function package_by_id(string $id): ?array
{
    foreach (packages() as $package) {
        if ($package['id'] === $id) {
            return $package;
        }
    }
    return null;
}

function live_packages(): array
{
    $overrides = db()['settings']['packagePrices'] ?? [];
    $items = packages();
    foreach ($items as &$item) {
        if (!array_key_exists($item['id'], $overrides)) {
            continue;
        }
        $price = $overrides[$item['id']];
        if ($price === null || $price === '') {
            $item['priceNgn'] = null;
            $item['priceLabel'] = 'Scoped';
        } else {
            $item['priceNgn'] = (int) $price;
            $item['priceLabel'] = naira((int) $price);
        }
    }
    return $items;
}

function services(): array
{
    return [
        ['id' => 'playlist', 'name' => 'Playlist Promotion', 'summary' => 'Pitch your music to relevant independent playlist curators.', 'detail' => 'We match the record to curators who already programme your genre and territory. You receive an outreach log and any placements they report. This is not Spotify editorial pitching and it is not a promise of placement.', 'href' => '/spotify-playlist-promotion'],
        ['id' => 'tiktok', 'name' => 'TikTok Promotion', 'summary' => 'Connect your release with relevant creators and audiences.', 'detail' => 'Creator outreach is planned around sound, lyric and audience fit. Posts that go live are recorded. Views are included only when a creator or ad account actually provides them.', 'href' => '/tiktok-music-promotion'],
        ['id' => 'instagram', 'name' => 'Instagram Promotion', 'summary' => 'Introduce the release to creators, editors and audiences on Instagram.', 'detail' => 'Campaigns can include creator posts, stories and, when scoped, paid distribution. We report activity. We do not promise reach or follower growth.', 'href' => '/instagram-music-promotion'],
        ['id' => 'youtube', 'name' => 'YouTube Promotion', 'summary' => 'Pitch the song or video to channels and audiences that already watch your genre.', 'detail' => 'Outreach, premieres and optional advertising are scoped separately. View counts are reported only from available data.', 'href' => '/music-promotion'],
        ['id' => 'radio', 'name' => 'Radio Promotion', 'summary' => 'Service the record to stations and presenters who can actually play it.', 'detail' => 'A radio campaign is a servicing and follow-up process. Confirmations are logged. Spins are counted only when a station verifies them.', 'href' => '/radio-promotion'],
        ['id' => 'dj', 'name' => 'DJ Promotion', 'summary' => 'Put the song in front of DJs in the cities and scenes that matter for the release.', 'detail' => 'DJs receive the record with context. Responses and reported support are logged. Club play is never guaranteed.', 'href' => '/dj-promotion'],
        ['id' => 'blogs', 'name' => 'Music Blog Promotion', 'summary' => 'Pitch the story to music blogs and online magazines with a real reason to cover it.', 'detail' => 'You get the pitch list, the replies, and links to pieces that publish. Coverage depends on editors, not a package promise.', 'href' => '/music-blog-promotion'],
        ['id' => 'pr', 'name' => 'Press & PR', 'summary' => 'Shape a clear story and take it to journalists, editors and producers.', 'detail' => 'PR starts with an angle, a press note and the right desks. Interviews and reviews are opportunities, not deliverables that can be bought.', 'href' => '/artist-promotion'],
        ['id' => 'creators', 'name' => 'Influencer / Creator Campaigns', 'summary' => 'Work with creators whose audiences already care about the kind of music you make.', 'detail' => 'We introduce the song. Creators choose whether to post. ClassicalPromo does not sell fake engagement.', 'href' => '/tiktok-music-promotion'],
        ['id' => 'ads', 'name' => 'Digital Advertising', 'summary' => 'Run clearly scoped ads where paid reach is the right tool.', 'detail' => 'Spend, audiences and creative are agreed first. Reporting uses the ad account. Ads are distribution, not a promise of fans.', 'href' => '/music-promotion'],
        ['id' => 'brand', 'name' => 'Artist Branding', 'summary' => 'Clarify the story, visuals and assets around the release.', 'detail' => 'Branding work covers biography, press photos, links and the way the campaign is described. It supports promotion. It does not invent a career.', 'href' => '/artist-promotion'],
        ['id' => 'release', 'name' => 'Release Campaign Management', 'summary' => 'One desk for the plan, the partners, the updates and the report.', 'detail' => 'Campaign management keeps playlist, social, radio, DJ, blog and press work in one timeline so you can see what moved and what is still open.', 'href' => '/music-promotion'],
    ];
}

function service_prices(): array
{
    return [
        ['name' => 'Playlist outreach', 'fromNgn' => 25000, 'duration' => '10–21 days', 'reporting' => 'Outreach log in the campaign report.', 'not' => 'Spotify editorial playlist placement, a set number of streams, or a specific playlist.'],
        ['name' => 'TikTok', 'fromNgn' => 40000, 'duration' => '14–30 days', 'reporting' => 'Creator activity log. Missing figures are marked awaiting data.', 'not' => 'Viral reach, a set number of views, or follower growth.'],
        ['name' => 'Instagram', 'fromNgn' => 40000, 'duration' => '14–30 days', 'reporting' => 'Activity report. Reach is not estimated when it was not measured.', 'not' => 'Viral Reels, follower counts, or saves.'],
        ['name' => 'Radio', 'fromNgn' => 50000, 'duration' => '14–28 days', 'reporting' => 'Servicing log. Unconfirmed airplay is not counted as a spin.', 'not' => 'Airplay, a number of spins, or national rotation.'],
        ['name' => 'DJ', 'fromNgn' => 35000, 'duration' => '14–21 days', 'reporting' => 'DJ servicing log.', 'not' => 'Club play or a number of DJ drops.'],
        ['name' => 'YouTube', 'fromNgn' => 40000, 'duration' => '14–30 days', 'reporting' => 'Outreach and publish log.', 'not' => 'Views, watch time, or trending placement.'],
        ['name' => 'Blogs', 'fromNgn' => 30000, 'duration' => '14–28 days', 'reporting' => 'Pitch and publication log with links when a story goes live.', 'not' => 'Coverage or a specific outlet.'],
        ['name' => 'Press & PR', 'fromNgn' => 80000, 'duration' => '21–45 days', 'reporting' => 'Media log and links to published work.', 'not' => 'Press coverage or a feature in a named title.'],
    ];
}

function faqs(): array
{
    return [
        ['q' => 'How does ClassicalPromo work?', 'a' => 'You pitch a song, tell us the audience and goals, and we recommend a campaign built from legitimate promotion: curator outreach, creators, radio and DJ servicing, blogs, PR, and advertising where it is scoped. After payment, the campaign is queued, worked, updated in your dashboard, and closed with a report of activity. Results such as streams, spins and posts depend on third parties and are not sold as guarantees.'],
        ['q' => 'How do I submit my song?', 'a' => 'Use Pitch your song. The form asks for artist details, the release, campaign goals, target countries and genres, and a budget. You can create an artist account before or after the pitch. A campaign recommendation appears at the end. Nothing is charged until you choose to start and pay.'],
        ['q' => 'How long does promotion take?', 'a' => 'Starter campaigns are planned for about 14 days, Growth for about 21 days, and Breakout for about 30 days. Press and custom work can run longer. The exact window is written on the campaign before it starts.'],
        ['q' => 'Do you guarantee playlist placement?', 'a' => 'No. Playlist promotion means pitching your music to relevant independent playlist curators. Curators decide what they add. ClassicalPromo does not sell Spotify editorial placement, and we will not promise a specific playlist.'],
        ['q' => 'Do you guarantee streams?', 'a' => 'No. We do not sell streams, and we do not use artificial streaming. A campaign can create legitimate opportunities for people to hear the song. How many people stream it is not something we guarantee.'],
        ['q' => 'Do you guarantee TikTok virality?', 'a' => 'No. TikTok work connects a release with relevant creators and, when agreed, paid distribution. Virality is not a deliverable. If view counts are not available, the report says awaiting campaign data.'],
        ['q' => 'How do radio campaigns work?', 'a' => 'We prepare a servicing pack, contact stations and presenters that fit the genre and city, and log replies. A confirmation means someone at the station said they would support the record. A spin is only counted when it is verified. Airplay is not guaranteed.'],
        ['q' => 'How do DJ campaigns work?', 'a' => 'DJs in the agreed cities and genres receive the song with context. We track who was serviced and who replied. Some DJs will play the record, some will pass, and some will not answer. The report shows that activity honestly.'],
        ['q' => 'Can international artists use ClassicalPromo?', 'a' => 'Yes. The platform is built with African and Nigerian artists at the centre, and it is open to managers, labels and artists releasing into Nigeria, Ghana, South Africa, Kenya, the UK, the US, Canada and other markets.'],
        ['q' => 'Can labels use ClassicalPromo?', 'a' => 'Yes. Label and manager accounts can hold more than one artist and brief custom campaigns. Custom work is scoped in writing before it begins.'],
        ['q' => 'How do I track my campaign?', 'a' => 'The artist dashboard shows campaign status, progress, channel activity and messages with the ClassicalPromo desk. Statuses move from draft and payment through queued, in progress, awaiting partner results, and completed.'],
        ['q' => 'How do I receive reports?', 'a' => 'Open Reports in the dashboard. Each report lists the campaign window, budget, services and channel activity. You can print it. Any figure we do not have is labelled awaiting campaign data rather than estimated.'],
        ['q' => 'How do I become a ClassicalPromo partner?', 'a' => 'Apply as a DJ, curator, station, presenter, creator, blogger, journalist, podcaster or influencer. Applications stay pending or under review until an admin checks the profile. Only verified partners appear in the public network.'],
    ];
}

function goals_list(): array
{
    return ['Streaming', 'Playlist discovery', 'TikTok', 'Instagram', 'YouTube', 'Radio', 'DJs', 'Blogs', 'Press', 'Brand awareness', 'International exposure'];
}

function markets_list(): array
{
    return ['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'UK', 'USA', 'Canada', 'Worldwide'];
}

function genres_list(): array
{
    return ['Afrobeats', 'Afropop', 'Amapiano', 'Hip-Hop', 'R&B', 'Gospel', 'Dancehall', 'Pop', 'Highlife', 'Fuji', 'Alternative', 'Other'];
}

function countries_list(): array
{
    return ['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'United Kingdom', 'United States', 'Canada', 'Benin', 'Togo', "Côte d'Ivoire", 'Senegal', 'Tanzania', 'Uganda', 'Rwanda', 'France', 'Germany', 'Netherlands', 'United Arab Emirates', 'Other'];
}

function partner_types(): array
{
    return ['DJ', 'Playlist Curator', 'Radio Station', 'Radio Presenter', 'TikTok Creator', 'Instagram Creator', 'YouTube Creator', 'Blogger', 'Journalist', 'Podcaster', 'Influencer'];
}

function budget_options(): array
{
    return [
        ['id' => '25000', 'label' => '₦ 25,000'],
        ['id' => '50000', 'label' => '₦ 50,000'],
        ['id' => '100000', 'label' => '₦ 100,000'],
        ['id' => '250000', 'label' => '₦ 250,000'],
        ['id' => '500000+', 'label' => '₦ 500,000+'],
        ['id' => 'custom', 'label' => 'Custom budget'],
    ];
}

function nav_items(): array
{
    return [
        ['/promotion', 'Promotion'],
        ['/network', 'Network'],
        ['/marketplace', 'Marketplace'],
        ['/academy', 'Academy'],
        ['/media', 'Media'],
        ['/pricing', 'Pricing'],
    ];
}

function articles(): array
{
    static $items;
    if ($items === null) {
        $items = require __DIR__ . '/articles.php';
    }
    return $items;
}

function article_by_slug(string $slug): ?array
{
    foreach (articles() as $article) {
        if ($article['slug'] === $slug) {
            return $article;
        }
    }
    return null;
}

function seo_pages(): array
{
    static $items;
    if ($items === null) {
        $items = require __DIR__ . '/seo.php';
    }
    return $items;
}

function seo_by_slug(string $slug): ?array
{
    foreach (seo_pages() as $page) {
        if ($page['slug'] === $slug) {
            return $page;
        }
    }
    return null;
}
