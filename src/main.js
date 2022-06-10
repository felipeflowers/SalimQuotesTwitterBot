import "dotenv/config";
import axios from "axios";
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.AC_TOKEN,
  accessSecret: process.env.AC_TOKEN_SC
});

let { data }  = await axios.get("https://watasalim.vercel.app/api/quotes/random");
let tweet = await twitterClient.v1.tweet(data.quote.body)
await twitterClient.v1.reply(data.quote.url, tweet.id_str)

setInterval(async() => {
  let { data }  = await axios.get("https://watasalim.vercel.app/api/quotes/random");
  let tweet = await twitterClient.v1.tweet(data.quote.body)
  await twitterClient.v1.reply(data.quote.url, tweet.id_str)
}, 3600000)
