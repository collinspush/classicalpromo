<?php

const SITE_NAME = 'ClassicalPromo';
const SITE_DOMAIN = 'classicalpromo.com.ng';
const SITE_EMAIL = 'hello@classicalpromo.com.ng';
const SITE_TAGLINE = 'One Song. Every Opportunity.';
const DEMO_PASSWORD = 'PitchDemo2026!';

session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 7,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
]);
session_start();

require __DIR__ . '/helpers.php';
require __DIR__ . '/content.php';
require __DIR__ . '/db.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/render.php';
require __DIR__ . '/actions.php';
require __DIR__ . '/pages.php';
