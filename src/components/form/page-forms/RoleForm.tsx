import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import GroupButtons from "../../ui/button/GroupButtons";
import {Resources, RoleRequest} from "../../../types/role";
import Input from "../input/InputField";
import MultiSelect from "../MultiSelect";
import MultiSelectWithSearch from "../MultiSelectWithSearch.tsx";

const createRoleSchema = () => z.object({
    label: z.string().min(3, "Label must be at least 3 characters"),
    resources: z.number()
        .array()
        .min(1, {message: 'Select at least one resource'})
        .nonempty({message: "Resources field is required"})
})

interface RoleFormProps {
    current?: RoleRequest;
    defaultCurrent: RoleRequest;
    handleSubmit: (data: RoleRequest) => Promise<void>;
    resources: Resources[];
    backLinkPath: string;
}

const tags = [
    { label: 'test', id: 1 },
    { label: 'tes2', id: 2 },
];

const RoleForm: React.FC<RoleFormProps> = (
    (
        {
            current,
            defaultCurrent,
            resources,
            handleSubmit: onSubmit,
            backLinkPath,
        }
    ) => {
        const schema = createRoleSchema();
        type RoleFormValues = z.infer<typeof schema>;

        const {
            watch,
            register,
            handleSubmit,
            setValue,
            formState: {errors, isSubmitting},
        } = useForm<RoleFormValues>({
            resolver: zodResolver(schema),
            defaultValues: current ? current : defaultCurrent
        });

        return (
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-6">
                        <div className="pb-3">
                            <Input
                                id="label"
                                label="Label"
                                value={watch('label') || ''}
                                {...register('label')}
                                error={!!errors.label}
                                errorMessage={errors.label?.message}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="pb-3">
                            <MultiSelect
                                label="Resources"
                                options={resources.map((resource) => ({
                                    label: resource.label,
                                    value: resource.id.toString(),
                                }))}
                                value={watch('resources')?.map(String) || []}
                                onChange={(selectedValues) => {
                                    setValue('resources', selectedValues.map(Number), {shouldValidate: true});
                                }}
                                hasError={!!errors.resources}
                                id="role-select"
                            />
                            {errors.resources && (
                                <p className="mt-1.5 text-xs text-destructive text-error-500">
                                    {errors.resources.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="pb-3">
                            <MultiSelectWithSearch
                                label="Tags"
                                options={
                                    tags
                                        ? tags.map((tag) => ({
                                            label: tag.label,
                                            value: tag.id.toString(),
                                        }))
                                        : []
                                }
                                // value={watch('tags')?.map(String) || []}
                                // onChange={(selectedValues) => {
                                //     setValue('tags', selectedValues.map(Number), {shouldValidate: true});
                                // }}
                                // hasError={!!errors.tags}
                                // id="role-select"
                            />
                        </div>
                    </div>
                </div>


                <GroupButtons backLinkPath={backLinkPath} isSubmitting={isSubmitting}/>
            </form>
        );
    }
);

export default RoleForm;