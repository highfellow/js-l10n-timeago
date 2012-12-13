js-l10n-timeago
===============

A version of the Smart Time Ago javascript library, rewritten to work with [js-l10n](https://github.com/highfellow/js-l10n) localisation and [requirejs](http://requirejs.org/). Should also work under nodejs.

Usage
=====

Usage is mostly the same as [Smart Time Ago](http://pragmaticly.github.com/smart-time-ago/), with the following changes:

Loading
-------

This version is written as a requirejs module: the example directory and the requirejs [documentation](http://requirejs.org/docs/api.html) give more information about how to include it in your program.

Configuration
-------------

The option l10nBase (default value `timeAgo`) is a base prefix for generating string tokens to be passed to js-l10n. E.g. the default token for 'now' is `timeAgoNow`, and the default token for hours is `timeAgoHours`. These tokens are then looked up in the strings file for the language you have set in the calling code.

You can pass different values of l10nBase on separate invocations of timeago - for example if you want some strings to be in the form '10 minutes ago', but others in the form '10 minutes'.

The strings in the strings file are in this format:

```
timeAgoNow = just now

timeAgoMinutes = {[ plural(n) ]}
timeAgoMinutes[zero] = 0 minutes ago
timeAgoMinutes[one] = 1 minute ago
timeAgoMinutes[other] = {{n}} minutes ago
```

For the format of the plural strings in the strings file, see the example directory and the documentation for (webL10n)[https://github.com/fabi1cazenave/webL10n].

For other configuration information, see the (original documentaion)[http://pragmaticly.github.com/smart-time-ago/].
