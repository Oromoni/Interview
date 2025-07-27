import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   <section className="card-cta">
    <div className="flex flex-col gap-6 max-w-lg">
      <h2>Get interview-Ready with AI powered Practice & Feedback</h2>
      <p className="text-lg">Practice on real interview question & get instant feedback</p>
      <Button asChild className="btn-primary max-sm:w-full">
        <Link href={""}>Start an Interview</Link>
      </Button>
    </div>
    <Image className="max-sm:hidden" src={"/robot.png"} alt={"robo-dude"} width={400} height={400}/>
   </section>
   <section className="flex flex-col gap-6 mt-8">
    <h2>Your Interviews</h2>
    <div className="interviews-section">
      {dummyInterviews.map((interview,index)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))}
    </div>
   </section>

   <section className="flex flex-col gap-6 mt-8">
    <h2>Take an Interview</h2>
    <div className="interviews-section">
       {dummyInterviews.map((interview,index)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))}
      {/* <p>There are no interviews available</p> */}
    </div>
   </section>

    </>
  );
}
