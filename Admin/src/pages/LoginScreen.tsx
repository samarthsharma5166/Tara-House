import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { signIn } from '@/redux/user/userSlice'
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading } = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate login process
        dispatch(signIn({ email, password })).then((res) => {
            if(res.payload.success){
                navigate('/');
            } 
        })
        

        console.log('Login attempt:', { email, password });
        
    };

    return (
        <div className='w-full h-full min-h-screen  flex justify-center items-center'>
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 mt-2">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-black">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-10 h-12 border-2 border-black focus:border-black focus:ring-0 bg-white text-black"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-black">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 h-12 border-2 border-black focus:border-black focus:ring-0 bg-white text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    {/* <div className="mt-6 text-center">
                        <p className="text-sm text-black">
                            Don't have an account?{' '}
                            <a href="#" className="text-black hover:underline font-medium">
                                Sign up
                            </a>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
