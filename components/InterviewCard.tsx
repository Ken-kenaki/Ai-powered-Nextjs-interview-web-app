import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";



const InterviewCard = ({ userId, interviewId, role, type, techstack, createdAt }: InterviewCardProps) => {

  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback ?.createdAt ||createdAt || Date.now()).format('MMM D, YYYY')
  return (
    <div className="card-border max-sm:w-full w-[360px] min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 bg-light-600 rounded-bl-lg">
            <p className="badge-text">
              {normalizedType}

            </p>
          </div>
          <Image src={getRandomInterviewCover()} alt="Cover Image" width={90} height={90} className="rounded-full object-fit size-[90px]" />
          <h3 className="mt-5 capitalize">
            {role} Interview
          </h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image src="/calendar.svg" alt="Calendar" width={22} height={22}/>
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <p>
                {feedback?.totalScore || '---'}/100
              </p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5 ">
            {feedback?.finalAssessment || "You haven't taken the interview yet, Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p>
            <DisplayTechIcons techStack={techstack}/>
          </p>
          <Button className="btn-primary">
            <Link href={feedback ? `interview/${interviewId}/feedback`:
              `/interview/${interviewId}`
            }>
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>

          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard