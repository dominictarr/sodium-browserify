# sodium-browserify

A polyfil between the apis of [node-sodium](https://github.com/paixaop/node-sodium/)
and [libsodium-wrappers](https://github.com/jedisct1/libsodium.js), heir to [crypto-browserify](https://github.com/crypto-browserify/crypto-browserify)

Mainly, this wraps libsodium-wrappers to make it work with buffers,
and pass the same tests as it does in node, and in the browser.

WORK IN PROGRESS
so far have wrapped: `crypto_*`
* sign_keypair
* sign_seed_keypair
* sign
* sign_open
* sign_detached
* sign_verify_detached
* sign_ed25519_pk_to_curve25519
* sign_ed25519_sk_to_curve25519
* box_keypair
* box_easy
* box_open_easy
* scalarmult

If you need something more urgently, please make a pull request

## License

MIT
