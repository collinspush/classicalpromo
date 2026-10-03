<?php

function seo(string $slug, string $title, string $description, string $eyebrow, string $heading, string $lede, array $sections): array
{
    return compact('slug', 'title', 'description', 'eyebrow', 'heading', 'lede', 'sections');
}

return [
    seo('music-promotion', 'Music promotion for independent artists', 'How ClassicalPromo plans, runs and reports a music promotion campaign across playlists, creators, radio, DJs, blogs and press.', 'Promotion', 'Music promotion, scoped as work.', 'A campaign is a set of introductions, servicing tasks and reports. It is not a promise that a song will travel on its own.', [
        ['What the work actually is', ['ClassicalPromo helps artists, managers and labels take a finished song to the people who might play it, post it, programme it or write about it. That includes independent playlist curators, TikTok and Instagram creators, YouTube channels, radio stations, DJs, music blogs and press.', 'Each channel is chosen because it fits the record and the market. The brief is written down before the work starts: services, countries, duration, budget and the report you will receive.']],
        ['Activity and outcomes', ['We report campaign activity: who was contacted, what was published, which stations were serviced, which replies came back. Streams, followers, views and airplay are outcomes controlled by audiences and third parties.', 'If a figure is not available, the report says so. Estimating a result to fill a dashboard is not part of the service.']],
        ['Who it is for', ['Independent artists use ClassicalPromo to run a first serious release push. Managers and labels use it to keep several artists and several channels in one place.', 'You can pitch a song without pretending the campaign is already won.']],
    ]),
    seo('music-promotion-nigeria', 'Music promotion in Nigeria', 'How to promote a song in Nigeria across Lagos, Abuja, Port Harcourt and the diaspora.', 'Nigeria', 'Promotion built around Nigerian release reality.', 'Nigeria is not one audience. A useful campaign names the cities, the format and the people who can actually use the song.', [
        ['Start with a city and a format', ['Lagos club DJs, Abuja radio, Port Harcourt stations and diaspora listeners in London can all matter. They do not require the same assets or the same week.', 'Afrobeats, Afropop, Amapiano, Hip-Hop, R&B, Gospel, Highlife, Fuji and Alternative records each have their own desks.']],
        ['Channels that usually belong in a Nigerian plan', ['DJs and radio still move records that people hear in public. Independent playlist curators help streaming discovery, but they are not a platform’s editorial team. Creators can carry a hook. Blogs and press carry the story.', 'Audiomack, YouTube, Instagram and TikTok may all be relevant. None of them is a guarantee of an audience.']],
        ['A budget that finishes', ['Prices are shown in naira. A starter push can cover a tight outreach list. A larger release can add radio, DJs, creators and press under one timeline.', 'We do not sell artificial streams to decorate a Nigerian campaign.']],
    ]),
    seo('spotify-playlist-promotion', 'Independent playlist pitching', 'What independent playlist promotion is, and why ClassicalPromo does not promise Spotify editorial placement.', 'Playlists', 'Pitch the song to curators who already have a playlist.', 'Independent playlist promotion is a pitching service. It is not access to a streaming service’s editorial team.', [
        ['Two different doors', ['Editorial playlists are programmed by the streaming service. Independent playlists are programmed by curators. ClassicalPromo pitches relevant independent curators. We do not claim official editorial access, and we do not guarantee placement on any playlist.']],
        ['What you receive', ['You receive a record of curators contacted, responses, and placements they report. Streams that may follow a placement show up in your own distributor. They are not a number we attach to the invoice in advance.']],
        ['How to prepare the pitch', ['Send one song, a working link, accurate credits, and two records that sit beside it. Private links that expire on the morning of the pitch waste the curator’s time and your budget.']],
    ]),
    seo('tiktok-music-promotion', 'TikTok music promotion', 'How ClassicalPromo runs TikTok creator outreach for a song without promising virality or view counts.', 'TikTok', 'Creator outreach for a song, not a viral promise.', 'TikTok promotion connects a release with relevant creators and audiences. It does not guarantee a viral video.', [
        ['Fit before volume', ['The useful question is which creators already talk to the people who might like this record. Creators decide whether to post. A campaign can count contacts and published posts. It cannot count posts that were never made.']],
        ['Views only when they exist', ['If a creator or an advertising account provides view and engagement figures, they can appear in the report. If they do not, the line reads awaiting campaign data. Paid amplification is scoped as advertising with its own spend.']],
        ['What to send', ['Clear audio, permission to use it, a vertical clip if you have one, and a single hook. If the sound does not travel, that is information for the next release.']],
    ]),
    seo('instagram-music-promotion', 'Instagram music promotion', 'Instagram creator and audience campaigns for releases, reported as activity rather than guaranteed reach.', 'Instagram', 'Instagram campaigns built around the people who would care.', 'Connect the release with relevant creators and audiences. Reach is observed when it is measured, not promised in the proposal.', [
        ['Posts, stories and paid support', ['An Instagram campaign can include creator posts, stories and, separately, ads. We look for creators and editors whose existing posts already sit near your genre.']],
        ['Reporting without theatre', ['The report lists accounts contacted and posts that published. Interactions are included when they are available. Follower growth is not a deliverable. ClassicalPromo does not buy fake likes, comments or followers.']],
        ['Use it with the rest of the release', ['Instagram works better when the profile, the bio link and the press photos agree with the campaign. Pair the posts with playlist, DJ or radio work if those channels match the song.']],
    ]),
    seo('radio-promotion', 'Radio promotion for new music', 'How radio servicing works: stations, presenters, confirmations and verified spins, without guaranteed airplay.', 'Radio', 'Radio servicing, with confirmations kept honest.', 'We contact stations and presenters who can play the record. Airplay is their decision.', [
        ['A servicing pack, not a blast', ['Radio promotion means a shortlist, a pack, and follow-up. The pack carries the song, credits, a short biography and the cities you care about. A nationwide claim with no station list is not a radio campaign.']],
        ['Confirmations are not spins', ['A confirmation means a person at the station said they would support the record. A spin is counted when it is verified. Unconfirmed airplay is not upgraded into a number. Declines belong in the log.']],
        ['Where this fits', ['Radio still matters for records that people hear away from their own headphones. It is often paired with DJ servicing. International artists can service African stations when the record and the story make sense for that audience.']],
    ]),
    seo('dj-promotion', 'DJ promotion for releases', 'How DJ servicing works for clubs, mixes and selectors, and what a DJ campaign report includes.', 'DJs', 'Get the song to selectors who might actually play it.', 'DJ promotion is servicing and follow-up. It is not a receipt for a fixed number of club plays.', [
        ['City, genre, night', ['A DJ in Lagos, Accra, Johannesburg, Nairobi or London is not interchangeable. DJs receive the song with a plain note: feel, language, and where it sits in a night. One lead record. A working link.']],
        ['What the report shows', ['You see DJs serviced and responses. Reported support is included when a DJ says they played it or will play it. Silence is silence. Partner contact details stay off the public directory.']],
        ['After the campaign', ['The DJs who reply are the useful asset. Keep them. Read the Academy guide on pitching DJs before you upload a folder of unfinished edits.']],
    ]),
    seo('afrobeats-promotion', 'Afrobeats promotion', 'How to promote Afrobeats and Afropop records in Nigeria and across diaspora audiences without generic campaign promises.', 'Afrobeats', 'Afrobeats promotion with a specific audience.', 'The genre is global. A good campaign is still local enough to name a city, a selector and a listener.', [
        ['Do not brief “Afrobeats worldwide” and stop', ['A campaign should say whether the lead market is Nigeria, Ghana, the UK, the US, or a combination. Language, feature list and tempo change the desks.']],
        ['A channel mix that respects the song', ['Club-led records need DJs. Story-led records need press, blogs and a clear video plan. ClassicalPromo will not dress an Afrobeats campaign in guaranteed editorial placements or guaranteed streams.']],
        ['The wider catalogue', ['The same desk also works on Amapiano, Highlife, Fuji, Hip-Hop, R&B, Gospel, Dancehall, Pop and Alternative. If the song sits between genres, say so in the pitch.']],
    ]),
    seo('music-blog-promotion', 'Music blog promotion', 'How music blog pitching works, what gets published, and how ClassicalPromo reports coverage.', 'Blogs', 'Pitch a story a blog can actually publish.', 'Blog promotion is editor outreach. Publication is the editor’s decision.', [
        ['A reason to write', ['“New song out” is a caption, not a pitch. Bloggers need a reason: a scene, a producer, a city, a first, a collaboration, a video, a return. The shortlist follows the markets you chose.']],
        ['Proof of publication', ['The report shows pitches, replies and published articles with links. A pitch that received no answer is still part of the work. It is not described as coverage. Sponsored placements should be identifiable as such.']],
        ['Send a complete kit', ['Artwork, a working link, credits and a short biography should be in the first email. Blog coverage pairs well with press outreach when the story is strong enough for both.']],
    ]),
    seo('artist-promotion', 'Artist promotion and branding', 'Artist promotion for independents, managers and labels: branding, press, release campaigns and reporting without inflated claims.', 'Artists', 'Promote the artist and the song as one brief.', 'Artist promotion is the story, the assets and the channels around a release — held to the same reporting standard as the campaign.', [
        ['Brand is not a filter', ['Artist branding means the public facts: name, biography, photos, links, genre and the way the campaign describes the music. We do not invent awards, fake press logos or “as seen on” lines. A verified badge means the account was reviewed. It does not mean a chart position.']],
        ['Press, without theatre', ['Press and PR start with an angle and a list of relevant journalists, editors and producers. You receive the outreach log and links to anything that runs. An interview is not guaranteed because it was requested.']],
        ['A profile that can be sent', ['Public artist profiles collect the biography, latest release and links. Sample profiles on this site are labelled. If you are ready, pitch the song.']],
    ]),
];
