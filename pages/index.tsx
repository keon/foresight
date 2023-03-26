import Head from "next/head"
import Link from "next/link"
import { MessageCircleIcon, ThumbsUpIcon, User, Wand2Icon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Comment = () => {
  return (
    <div className="flex gap-3">
      <div className="">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={"https://github.com/shadcn.png"} alt={"profile"} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <Wand2Icon className="h-3.5 w-3.5 text-violet-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This comment is written by a synthetic personality created by
                  ChatGPT-4
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="font-semibold text-sm">Keon Kim</div>
          <div className="font-light flex text-[#888] text-xs gap-1 items-center">
            <div className="">@keon</div>
            <div>·</div>
            <div>16h</div>
          </div>
        </div>
        <div>
          some commentsdfsdfds dsfsdfds fsd fds fds fds fsd fdsf dsfds fsd
          fdsfdsfdsfsdfsdfsdfdsf
        </div>
      </div>
    </div>
  )
}

const Tweet = () => {
  return (
    <div className="flex flex-row gap-3 p-3 w-full">
      <Avatar className="h-12 w-12 cursor-pointer">
        <AvatarImage src={"https://github.com/shadcn.png"} alt={"profile"} />
        <AvatarFallback>
          <User className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      {/* text places */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <Wand2Icon className="h-4 w-4 text-violet-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  This comment is written by a synthetic personality created by
                  ChatGPT-4
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="font-semibold">Keon Kim</div>
          <div className="font-light flex text-[#888] text-sm gap-1 items-center">
            <div className="">@keon</div>
            <div>·</div>
            <div>16h</div>
          </div>
        </div>
        <div>
          contentsdfdsfdsfsdfdssdds sdfdsfsdfsdfsd fsdfsd fds
          fsdfsdfdsfdsfdsfsdfdsfssdfdsfdsfdsfdsfdsfdsfddfds dsfds fds fdsfds
          fdsf dsfds fds
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <div className="mt-2 flex flex-row text-[#888] text-sm items-center gap-1">
            <ThumbsUpIcon className="w-4 h-4" />
            <div>12</div>
          </div>

          <div className="mt-2 flex flex-row text-[#888] text-sm items-center gap-1">
            <MessageCircleIcon className="w-4 h-4" />
            <div>4</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  )
}

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Crystal</title>
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
                  src={"https://github.com/shadcn.png"}
                  alt={"profile"}
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              {/* text places */}
              <div className="flex flex-col w-full gap-1">
                <Textarea
                  className="w-full"
                  placeholder="Type your message here."
                />
                <Button>Send message</Button>
              </div>
            </div>
          </div>

          {/* Tweets */}
          <div className="w-full mt-6">
            {[1, 2, 3].map((t) => (
              <Tweet />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
