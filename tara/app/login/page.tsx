'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from "@/lib/hooks"
import { loginAccount } from "@/lib/slice/userSlice"
import { useEffect, useRef } from "react"
import { useRouter } from 'next/navigation';
interface userData {
  email: string;
  password: string;
};

export function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
    const userData = useRef<userData>({ email: "", password: "" });
  // Modify your handleFormSubmit function
  async function handleFormSubmit(e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await dispatch(loginAccount(userData.current));
      if (result.payload?.success) { // Adjust based on your actual response structure
        router.push("/admin");
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
    return (
      <div className="bg-amber-100 w-screen h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm z-20 bg-white shadow-md">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    onChange={(e) => {
                      userData.current.email = e.target.value
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <Input id="password" type="password" name="password" onChange={(e) => { userData.current.password = e.target.value }} required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-2" onClick={(e)=>handleFormSubmit(e)}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }


export default page;