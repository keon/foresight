import { useEffect, useState } from "react"
import Head from "next/head"
import { toast } from "@/hooks/use-toast"
import { Eye, MessageCircle, ThumbsUp, User, Wand } from "lucide-react"

import { Layout } from "@/components/layout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const timelineSample = [
  {
    text: "I love surfing",
    replies: [
      {
        user: {
          id: 1,
          text: "The Fitness Fanatic\nBio: A dedicated fitness enthusiast who's always chasing new personal records and sharing their journey towards a healthier lifestyle. \nInterests: Gym workouts, running, yoga, healthy recipes, motivational quotes, and athletic wear.\nTroll Behavior: Rarely trolls, but may occasionally engage in friendly banter with fellow fitness enthusiasts or provide unsolicited advice on exercise form.",
        },
        text: "Surfing is such a great full-body workout! Keep enjoying the waves and staying active! 🏄‍♂️💪",
        reason:
          'Step 1: Analyze the tweet content - The tweet is about surfing which is a physical activity and can be considered as a form of exercise.\nStep 2: Determine the relevance - As a fitness fanatic, surfing can be seen as a relevant topic since it promotes an active lifestyle.\nStep 3: Decide on the engagement - Given the relevance of the topic, it\'s appropriate to engage with the tweet.\nStep 4: Choose the type of engagement - A comment would be suitable to show enthusiasm and share some fitness-related thoughts on surfing.\nStep 5: Craft the comment - "Surfing is such a great full-body workout! Keep enjoying the waves and staying active! 🏄‍♂️💪"\n\nFinal output:\n{\n  "action": "like_and_reply",\n  "reply": "Surfing is such a great full-body workout! Keep enjoying the waves and staying active! 🏄‍♂️💪"\n}',
      },
    ],
    viewed: [1, 2],
    likes: [
      {
        user: {
          id: 1,
          text: "The Fitness Fanatic\nBio: A dedicated fitness enthusiast who's always chasing new personal records and sharing their journey towards a healthier lifestyle. \nInterests: Gym workouts, running, yoga, healthy recipes, motivational quotes, and athletic wear.\nTroll Behavior: Rarely trolls, but may occasionally engage in friendly banter with fellow fitness enthusiasts or provide unsolicited advice on exercise form.",
        },
        reason:
          'Step 1: Analyze the tweet content - The tweet is about surfing which is a physical activity and can be considered as a form of exercise.\nStep 2: Determine the relevance - As a fitness fanatic, surfing can be seen as a relevant topic since it promotes an active lifestyle.\nStep 3: Decide on the engagement - Given the relevance of the topic, it\'s appropriate to engage with the tweet.\nStep 4: Choose the type of engagement - A comment would be suitable to show enthusiasm and share some fitness-related thoughts on surfing.\nStep 5: Craft the comment - "Surfing is such a great full-body workout! Keep enjoying the waves and staying active! 🏄‍♂️💪"\n\nFinal output:\n{\n  "action": "like_and_reply",\n  "reply": "Surfing is such a great full-body workout! Keep enjoying the waves and staying active! 🏄‍♂️💪"\n}',
      },
      {
        user: {
          id: 2,
          text: "The Aesthetic Influencer\nBio: A lover of all things visually pleasing, this influencer curates a feed showcasing their personal style, favorite beauty products, and dreamy travel destinations.\nInterests: Fashion, makeup, photography, interior design, and jet-setting to picture-perfect locations.\nTroll Behavior: Unlikely to troll, but might engage in passive-aggressive comments or subtle shade-throwing when defending their aesthetic choices.",
        },
        reason:
          'Step 1: Identify the relevance of the tweet to my persona\'s interests. In this case, surfing is not directly related to fashion, makeup, photography, interior design, or travel destinations.\n\nStep 2: Consider whether the tweet\'s content might be connected to my persona\'s interests in some way. Surfing could be seen as a lifestyle choice, and there might be a connection to photography if the tweet included a visually pleasing photo of the surfing experience.\n\nStep 3: Decide if it is worth engaging with the tweet based on its relevance and potential connections. As a lover of all things visually pleasing, my persona might appreciate the beauty of the ocean and the lifestyle associated with surfing.\n\nStep 4: Determine the type of engagement that would be most suitable. Since the tweet does not directly align with my persona\'s main interests, a like would be an appropriate way to show appreciation for the surfing lifestyle without necessarily endorsing or promoting it.\n\nStep 5: Perform the chosen engagement action.\n\n{\n  "action": "like",\n  "reply": ""\n}',
      },
    ],
  },
]

const idToUser = {
  1: {
    name: "The Fitness Fanatic",
    handle: "@fitness",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Whiskers",
  },
  2: {
    name: "The Mindful Hippie",
    handle: "@hippie",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Mimi",
  },
  3: {
    name: "The Creative Writer",
    handle: "@writer",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Miami",
  },
  4: {
    name: "The Tech Entrepreneur",
    handle: "@entr",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Midddmi",
  },
  5: {
    name: "The Tech Bro",
    handle: "@tech",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Mimi",
  },
  6: {
    name: "The Fashion Influencer",
    handle: "@inf",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=dfdd",
  },
  7: {
    name: "The Foodie",
    handle: "@food",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Midfsfmi",
  },
  8: {
    name: "The Gamer",
    handle: "@game",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Midmi",
  },
  9: {
    name: "The Pet Parent",
    handle: "@pet",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Misami",
  },
  10: {
    name: "The Travel Influencer",
    handle: "@dsfdf",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Mismi",
  },
  11: {
    name: "The Political Activist",
    handle: "@sdf",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Misssmi",
  },
  12: {
    name: "The Pop Culture Fanatic",
    handle: "@oip",
    image: "https://api.dicebear.com/5.x/adventurer/svg?seed=Midasdmi",
  },
}

const Comment = (c: any) => {
  const user = idToUser[c?.c?.user.id]
  console.log("C:", c)
  return (
    <div className="flex gap-3">
      <div className="">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user.image} alt={"profile"} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          {/* <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-sm">{c?.c?.reason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Wand className="h-3.5 w-3.5 text-violet-700" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reason</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>{c?.c?.reason}</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="font-semibold text-sm">{user.name}</div>
          <div className="font-light flex text-[#888] text-xs gap-1 items-center">
            <div className="">{user.handle}</div>
            <div>·</div>
            <div>16h</div>
          </div>
        </div>
        <div>{c?.c?.text}</div>
      </div>
    </div>
  )
}

const Tweet = (post) => {
  console.log(post.post)
  return (
    <div key={"sdfds"} className="flex flex-row gap-3 p-3 w-full">
      <Avatar className="h-12 w-12 cursor-pointer">
        <AvatarImage src={"https://github.com/keon.png"} alt={"profile"} />
        <AvatarFallback>
          <User className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      {/* text places */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          {/* <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <Wand className="h-4 w-4 text-violet-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This comment is written by a synthetic personality created by
                  ChatGPT-4
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <div className="font-semibold">Keon Kim</div>
          <div className="font-light flex text-[#888] text-sm gap-1 items-center">
            <div className="">@keon</div>
            <div>·</div>
            <div>1m</div>
          </div>
        </div>
        <div>{post.post?.text}</div>
        <div className="flex flex-row gap-4 mb-4">
          <div className="mt-2 flex flex-row text-[#888] text-sm items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <div>{post.post?.likes?.length}</div>
          </div>

          <div className="mt-2 flex flex-row text-[#888] text-sm items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <div>{post.post?.replies?.length}</div>
          </div>

          <div className="mt-2 flex flex-row text-[#888] text-sm items-center gap-1">
            <Eye className="w-4 h-4" />
            <div>{post.post?.viewed?.length}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {post?.post?.replies.map((r) => (
            <Comment c={r} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function IndexPage() {
  const [text, setText] = useState("")
  const [timeline, setTimeline] = useState([])

  const updateTimeline = async () => {
    fetch(`/api/feed2`).then(async (res) => {
      if (res.status === 200) {
        const { timeline } = await res.json()
        console.log("timeline:", timeline)
        setTimeline(timeline.reverse())
      }
    })
  }

  const handleSubmit = () => {
    fetch(`/api/feed2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        const result = await res.json()
        console.log(result)
        toast({
          title: "Successfully saved the changes",
        })
      } else {
        console.log("ERROR", res)
      }
    })
    setText("")
  }

  useEffect(() => {
    updateTimeline()
    setInterval(updateTimeline, 3000)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Foresight</title>
        <meta name="description" content="Synthentic People for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="max-w-xl mx-auto w-full">
          {/* Inputs */}
          <div>
            <div className="flex flex-row gap-3 p-3 w-full">
              <Avatar className="h-12 w-12 cursor-pointer">
                <AvatarImage
                  src={"https://github.com/keon.png"}
                  alt={"profile"}
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              {/* text places */}
              <div className="flex flex-col w-full gap-1">
                <Textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value)
                  }}
                  className="w-full"
                  placeholder="Type your message here."
                />
                <Button onClick={handleSubmit}>Send message</Button>
              </div>
            </div>
          </div>

          {/* Tweets */}
          <div className="w-full mt-6 gap-6">
            {timeline.map((p) => (
              <Tweet post={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
