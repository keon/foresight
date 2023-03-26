import { NextApiRequest, NextApiResponse } from "next"
const dedent = require('dedent-js');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if get request, return the timeline
  if (req.method == "GET") {
    res.json({ timeline })
  } else if (req.method == "POST") {
    // if post request, add to the timeline
    let { text } = req.body;
    timeline.push({ text, replies: [], viewed: [], likes: [] })
    res.json({ timeline })
  }
}
async function evaluate(persona, text) {
  return new Promise(async (resolve) => {
    let aiMessages = [];
    let systemString = dedent`You are the world's most advanced social media simulator. your job is to simulate engagement to a tweet. your options are to comment, like ,or do no action

      your persona is ${persona}
      
      think through step by step and justify why you decided the engagement choice
      
      after you output your step on step thinker, your final output should be your decision. if you decide to comment state your comment.  it should be in JSON format. the JSON format has the following keys:
action: values are one of the following "no_action", "like", "like_and_reply", "reply"
reply : contains the reply text if action is  "like_and_reply" or "reply".`;



    aiMessages.push({ "role": "system", "content": systemString })
    aiMessages.push({ "role": "user", "content": text })

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: aiMessages,
        temperature: 0.75,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.0,
        stream: true,
      }, { responseType: 'stream' });
      // split on Output: and take the second part
      let output = "";
      console.log(response)
      response.data.on('data', d => {
        try {
          console.log(d.toString())
          d = JSON.parse(d.toString().split("data: ")[1]);
          let message = d.choices[0].delta.content;
          if (message) {
            output = output + message;
          }
          if (d.choices[0].finish_reason == "stop") {
            console.log("finished")
            resolve(output.trim());
          }
          console.log(output)
        } catch (e) {

          console.log(e)
        }
      }
      )
    } catch (e) {
      // if 429 error, try again
      console.log(e);
      if (e.response.status == 429) {
        console.log("409 error");
        //  resolve("rate limited :(");
      }
    }
  })
}

let timeline = [{ text: "I love surfing", replies: [], viewed: [], likes: [] }]
let personas = [{
  id: 1, text: dedent`The Fitness Fanatic
Bio: A dedicated fitness enthusiast who's always chasing new personal records and sharing their journey towards a healthier lifestyle. 
Interests: Gym workouts, running, yoga, healthy recipes, motivational quotes, and athletic wear.
Troll Behavior: Rarely trolls, but may occasionally engage in friendly banter with fellow fitness enthusiasts or provide unsolicited advice on exercise form.`},
{
  id: 2, text: dedent`The Aesthetic Influencer
   Bio: A lover of all things visually pleasing, this influencer curates a feed showcasing their personal style, favorite beauty products, and dreamy travel destinations.
   Interests: Fashion, makeup, photography, interior design, and jet-setting to picture-perfect locations.
   Troll Behavior: Unlikely to troll, but might engage in passive-aggressive comments or subtle shade-throwing when defending their aesthetic choices.`}]
async function run() {
  for (const tweet of timeline) {
    for (const persona of personas) {
      if (tweet.viewed.includes(persona.id)) {
        console.log("already viewed")
        continue;
      }
      tweet.viewed.push(persona.id)
      let m = await evaluate(persona.text, tweet.text)
      let c = (m as string).split('{')[1]
      let p = JSON.parse(`{${c}`)

      console.log('parsed',p)
      if (p.faction == "like" || p.action == "like_and_reply") {
        tweet.likes.push({ user: persona, reason: m })
      } 
     if (p.action == "reply" || p.action == "like_and_reply") {
        tweet.replies.push({ user: persona, text: p.reply, reason: m })
      }


      console.log(p)
    }

  }
  console.log(timeline)

}
setInterval(() => {
  run()
}, 3000)
export default handler
