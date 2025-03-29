"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Formfield from "./FormField"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"






const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}


const AuthForm = ({ type }: { type: FormType }) => {


const router = useRouter()

  const formSchema = authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })



  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        toast.success('Account created sucessfully.');
        router.push("/login")
      }
      if (type === 'sign-in') {
        toast.success("Log In Sucessfull.");
        router.push("/")
      }

    }
    catch (error) {
      console.log(error)
      toast.error(`There was an errror: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Interview AI</h2>

        </div>
        <h3>Practice Job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {/* <Formfield /> */}
            {!isSignIn &&
              <Formfield
                name="name"
                control={form.control}
                label="Name"
                placeholder="Your Name"
              />
            }
            <Formfield
              name="email"
              control={form.control}
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <Formfield
              name="password"
              control={form.control}
              label="Password"
              placeholder="Your password"
              type="password"
            />
            <Button className="btn" type="submit">{isSignIn ? "Sign in" : "Create an account"}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No Account Yet?" :
            "Have an Account Already.."}
          <Link href={!isSignIn ? '/login' : '/sign-up'} className="font-bold text-user-primary ml-1">
            {!isSignIn ? "Log in" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>

  )
}

export default AuthForm