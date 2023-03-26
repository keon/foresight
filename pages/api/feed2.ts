import { NextApiRequest, NextApiResponse } from "next"

const dedent = require("dedent-js")
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: "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",
})
const openai = new OpenAIApi(configuration)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if get request, return the timeline
  if (req.method == "GET") {
    res.json({ timeline })
  } else if (req.method == "POST") {
    // if post request, add to the timeline
    let { text } = req.body
    timeline.push({ text, replies: [], viewed: [], likes: [] })
    res.json({ timeline })
  }
}
async function evaluate(persona, text) {
  return new Promise(async (resolve) => {
    let aiMessages = []
    let systemString = dedent`You are the world's most advanced social media simulator. your job is to simulate engagement to a tweet. your options are to comment, like ,or do no action

      your persona is ${persona}
      
      think through step by step and justify why you decided the engagement choice
      
      after you output your step on step thinker, your final output should be your decision. if you decide to comment state your comment.  it should be in JSON format. the JSON format has the following keys:
action: values are one of the following "no_action", "like", "like_and_reply", "reply"
reply : contains the reply text if action is  "like_and_reply" or "reply".`

    aiMessages.push({ role: "system", content: systemString })
    aiMessages.push({ role: "user", content: text })

    try {
      const response = await openai.createChatCompletion(
        {
          model: "gpt-4",
          messages: aiMessages,
          temperature: 0.75,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.0,
          stream: true,
        },
        { responseType: "stream" }
      )
      // split on Output: and take the second part
      let output = ""
      console.log(response)
      response.data.on("data", (d) => {
        try {
          console.log(d.toString())
          d = JSON.parse(d.toString().split("data: ")[1])
          let message = d.choices[0].delta.content
          if (message) {
            output = output + message
          }
          if (d.choices[0].finish_reason == "stop") {
            console.log("finished")
            resolve(output.trim())
          }
          console.log(output)
        } catch (e) {
          console.log(e)
        }
      })
    } catch (e) {
      // if 429 error, try again
      console.log(e)
      if (e.response.status == 429) {
        console.log("409 error")
        //  resolve("rate limited :(");
      }
    }
  })
}

let timeline = []
let personas = [
  {
    id: 1,
    text: dedent`The Fitness Enthusiast
  Bio: A health-conscious individual dedicated to living their best life through exercise, nutrition, and wellness practices.
  Interests: Gym workouts, yoga, healthy recipes, outdoor activities, s and mental health awareness.
  Engagement Behavior: Unlikely to troll, as they focus on spreading positivity and encouraging others to adopt a healthy lifestyle. Likes and comments frequently on friends posts with uplifting messages and emojis. Avoids political arguments and news related posts. 
  Male / Female : female
  Location : USA
  Income : low, 50k
  Relationship Status: Single
  Age: 20-30
  Political affiliation: none shared`,
  },
  {
    id: 2,
    text: dedent`The Mindful Hippie
    Bio: A health-conscious individual dedicated to living welness
    Interests: Yoga, self-help, healthy recipes, outdoor activities, mental health awareness, recreational 
    Engagement Behavior: Spreads love, positivity and encourages others to adopt a healthy lifestyle. Likes and comments frequently on friends posts with uplifting messages. 
    Male / Female : Male
    Location : USA
    Income : moderately high, 100k
    Relationship Status: Divorced
    Age : 60
    Political affiliation: liberal`,
  },
  {
    id: 3,
    text: dedent`Persona: The Creative Writer
          Bio: A passionate writer who loves to express their thoughts and emotions through poetry, short stories, and articles.
          Interests: Reading, writing, attending writing workshops, exploring new coffee shops and bookstores.
          Engagement Behavior: They engage with other writers on social media, share their work for feedback, and participate in writing challenges. They tend to be sensitive to criticism but are open to constructive feedback.
          Male / Female: female
          Location: Canada
          Income: low, 40k
          Relationship Status: single
          Age: 28
          Interests: creative writing, photography, cooking
          Political affiliation: no shared`,
  },
  {
    id: 4,
    text: dedent`The Tech Entrepreneur
            Bio: A tech-savvy individual who is passionate about startups, innovation, and disruptive technologies.
            Interests: Attending tech conferences, networking with other entrepreneurs, reading business books, and following the latest tech trends.
            Engagement Behavior: They engage with other entrepreneurs and investors on social media, share their startup's progress, and offer advice to others who are starting their own businesses.
            Male / Female: male
            Location: India
            Income: low, 60k
            Relationship Status: married
            Age: 32`,
  },
  {
    id: 5,
    text: dedent`The Tech Bro 
              Bio: A tech-savvy individual who is passionate about startups, innovation, and disruptive technologies and is loud about his passion for these things. 
              Interests: Works at a big tech company, attends tech conferences, goes out to bars frequently,  networking with other entrepreneurs, reading business books, and following the latest tech trends.
              Engagement Behavior: They engage with other entrepreneurs and investors on social media, often troll other people, talk about how technology is the future. Often aren’t empathetic or aware of what’s happening outside of their bubble. 
              Male / Female: male
              Location: Silicon Valley
              Income: moderately high, 120k
              Relationship Status: Unmarried
              Age: 25
              `,
  },
  {
    id: 6,
    text: dedent`The Fashion Influencer
                Bio: A fashionista who loves to share their latest style tips, outfits, and trends with their followers.
                Interests: Fashion, beauty, photography, and travel.
                Male / Female : Female
                Location : USA
                Income : $75,000
                Relationship Status: Single
                Age : 25
                Interests: fashion, shopping, beauty
                Political affiliation: Democrat
                `,
  },
  {
    id: 7,
    text: dedent`The Foodie
                  Bio: A food enthusiast who loves to share their culinary creations, recipes, and restaurant experiences with their followers.
                  Interests: Cooking, baking, restaurant hopping, and food photography.
                  Male / Female : Male
                  Location : USA
                  Income : $60,000
                  Relationship Status: Married
                  Age : 35
                  Political affiliation: Independent
                  `,
  },
  {
    id: 8,
    text: dedent`The Gamer
                    Bio: A gaming enthusiast who loves to share their gaming experiences, tips, and reviews with their followers.
                    Interests: Gaming, game development, game streaming, and esports.
                    Male / Female : Male
                    Location : USA
                    Income : $40,000
                    Relationship Status: Single
                    Age : 22
                    Political affiliation: Libertarian
                    `,
  },
  {
    id: 8,
    text: dedent`The Gamer
                      Bio: A gaming enthusiast who loves to share their gaming experiences, tips, and reviews with their followers.
                      Interests: Gaming, game development, game streaming, and esports.
                      Male / Female : Male
                      Location : USA
                      Income : $40,000
                      Relationship Status: Single
                      Age : 22
                      Political affiliation: Libertarian
                      `,
  },
  {
    id: 9,
    text: dedent`The Pet Parent
                        Bio: A pet lover who loves to share their pet's pictures, videos, and stories with their followers.
                        Interests: Pet care, animal welfare, and adoption.
                        Male / Female : Female
                        Location : USA
                        Income : $45,000
                        Relationship Status: Engaged
                        Age : 28
                        Political affiliation: Republican`,
  },
  {
    id: 10,
    text: dedent`Persona: The Travel Influencer
                          Bio: A travel enthusiast who loves to share their travel experiences, tips, and recommendations with their followers.
                          Interests: Travel, culture, history, and photography.
                          Male / Female : Female
                          Location : USA
                          Income : $85,000
                          Relationship Status: Single
                          Age : 30
                          Political affiliation: Democrat
                          `,
  },
  {
    id: 11,
    text: dedent`The Political Activist
                            Bio: A strong advocate for social justice, equality, and political change, using their platform to raise awareness, educate, and mobilize their followers.
                            Interests: Politics, human rights, environmental issues, protests, and sharing thought-provoking articles and opinions.
                            Troll Behavior: Depends on the individual, but some may engage in trolling to call out opposing viewpoints or misinformation, while others may avoid trolling in favor of constructive dialogue.
                            Location : USA
                            Income : big - Millions $$`,
  },
  {
    id: 12,
    text: dedent`The Pop Culture Fanatic
                              Bio: A passionate and knowledgeable follower of the latest movies, TV shows, music, and celebrity news, always keeping their followers up-to-date with the hottest trends.
                              Interests: Hollywood gossip, Netflix series, award shows, fashion, and attending concerts.
                              Troll Behavior: Occasionally trolls, but mostly in a playful manner, engaging in light-hearted debates and poking fun at celebrity mishaps.
                              Engagement Behavior: Unlikely to troll
                              Male / Female : female
                              Location : USA
                              Income : low, 50k
                              Relationship Status
                              Age : 18
                              Interests: music
                              Political affiliation: no interest`,
  },
]
async function run() {
  for (const tweet of timeline) {
    for (const persona of personas) {
      if (tweet.viewed.includes(persona.id)) {
        console.log("already viewed")
        continue
      }
      tweet.viewed.push(persona.id)
      let m = await evaluate(persona.text, tweet.text)
      let c = (m as string).split("{")[1]
      let p = JSON.parse(`{${c}`)

      console.log("parsed", p)
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
