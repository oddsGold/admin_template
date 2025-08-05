import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import {useLogin} from "../../queries/auth.ts";

const loginSchema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your login and password to sign in!
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="login">
                  Login <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="login"
                    placeholder="Enter your login"
                    {...register('login')}
                    error={!!errors.login}
                    errorMessage={errors.login?.message}
                />
              </div>

              <div>
                <Label htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                      id="password"
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      error={!!errors.password}
                      errorMessage={errors.password?.message}
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};
