import React, { useImperativeHandle, useState } from 'react';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Switch from "../switch/Switch";
import GroupButtons from "../../ui/button/GroupButtons";
import { Role } from "../../../types/role";
import Input from "../input/InputField";
import {User, UserRequest} from "../../../types/users";
import Select from "../Select.tsx";

const createUserSchema = (isPasswordRequired: boolean) => z.object({
    login: z.string().min(3, "Login must be at least 3 characters"),
    email: z.email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    password: z.string()
        .min(isPasswordRequired ? 8 : 0,
            isPasswordRequired ? "Password must be at least 8 characters" : "")
        .max(255, "Maximum 255 characters allowed"),
    password_confirmation: z.string()
        .min(isPasswordRequired ? 1 : 0,
            isPasswordRequired ? "Password confirmation is required" : ""),
    tfa: z.number()
}).refine(data => !isPasswordRequired || data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
})

interface UserFormRef {
    setPassword: (password: string) => void;
}

interface UserFormProps {
    current?: User;
    defaultCurrent: UserRequest;
    handleSubmit: (data: UserRequest) => Promise<void>;
    roles: Role[];
    backLinkPath: string;
    password?: boolean;
}

const UserForm = React.forwardRef<UserFormRef, UserFormProps>(
    (
        {
            current,
            defaultCurrent,
            handleSubmit: onSubmit,
            roles,
            backLinkPath,
            password = false,
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);
        const schema = createUserSchema(password);
        type UserFormValues = z.infer<typeof schema>;

        const {
            watch,
            register,
            handleSubmit,
            setValue,
            formState: { errors, isSubmitting },
        } = useForm<UserFormValues>({
            resolver: zodResolver(schema),
            defaultValues: current ? {
                ...current,
                role: current.role.id.toString(),
                tfa: current.tfa ? 1 : 0, //треба на бекенді змінити, щоб поле tfa повертало 1 або 0 (або навпаки треба зробити, щоб приймало true/false, а не 1/0)
            } : defaultCurrent
        });

        useImperativeHandle(ref, () => ({
            setPassword: (newPassword: string) => {
                setValue("password", newPassword, { shouldValidate: true });
                setValue("password_confirmation", newPassword, { shouldValidate: true });
            },
        }));

        return (
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div>
                        <Input
                            id="login"
                            label="Login"
                            value={watch('login') || ''}
                            {...register('login')}
                            error={!!errors.login}
                            errorMessage={errors.login?.message}
                        />
                    </div>

                    <div>
                        <Input
                            id="email"
                            label="Email"
                            value={watch('email') || ''}
                            {...register('email')}
                            error={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    label="Password"
                                    value={watch('password') || ''}
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    error={!!errors.password}
                                    errorMessage={errors.password?.message}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[22px] -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    label="Confirm password"
                                    value={watch('password_confirmation') || ''}
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password_confirmation')}
                                    error={!!errors.password_confirmation}
                                    errorMessage={errors.password_confirmation?.message}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[22px] -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                <div>
                    <Select
                        label="Role"
                        options={roles.map(role => ({
                            value: role.id.toString(),
                            label: role.name
                        }))}
                        value={watch('role') || ''}
                        onChange={(value) => {
                            setValue('role', value, { shouldValidate: true });
                        }}
                        hasError={!!errors.role}
                        id="role-select"
                    />
                    {errors.role && (
                        <p className="mt-1.5 text-xs text-destructive text-error-500">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Switch
                        {...register('tfa')}
                        label="Enable two-factor authentication"
                        defaultChecked={Boolean(current?.tfa)}
                        onChange={(checked) => setValue('tfa', checked ? 1 : 0, { shouldValidate: true })}
                    />
                </div>

                <GroupButtons backLinkPath={backLinkPath} isSubmitting={isSubmitting}/>
            </form>
        );
    }
);

export default UserForm;