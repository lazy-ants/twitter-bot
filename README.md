# Twitter bot

This bot automatically add posts to the favourites list

## Setup

- For the first you need to create [twitter app](https://apps.twitter.com/app/new)
- Next you need to fill `config.js` file with your credentials

## How it works

Simply send post request on http://localhost:3000/tweets/favorites/create with the next parameters list

```
{
    q: '#twitter',
    count: '10',
    result_type: 'recent',
    lang: 'en'
}
```

`q` is the search query

`count` the number of tweets

`result_type: recent` returns only recent tweets

`lang: en` — returns only English tweets
