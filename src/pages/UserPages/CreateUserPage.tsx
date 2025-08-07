import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePassword from '../../utils/generatePassword';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { CopyIcon, PasswordIcon } from '../../icons/index';
import UserForm from '../../components/form/page-forms/UserForm';
import { useCreateUser } from '../../queries/user';
import { UserRequest } from '../../types/users';
import { UseCrudPageLogic } from '../../hooks/useCrudPageLogic';
import { useGetRoles } from '../../queries/role';
import { Loading } from '../../components/loadingBar/Loading.tsx';

interface UserFormRef {
  setPassword: (password: string) => void;
}

export default function CreateUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<UserFormRef>(null);
  const [password, setPassword] = useState<string>('');

  const { mutateAsync: createUser, isPending } = useCreateUser();
  const { data } = UseCrudPageLogic(useGetRoles);

  const previousPath = location.state?.from?.pathname ?? '/admin/users';

  const handleGenerate = () => {
    const newPassword = generatePassword(10);
    setPassword(newPassword);
    formRef.current?.setPassword(newPassword);
  };

  const handleCopy = async () => {
    if (!password) return;

    await copyToClipboard(password, {
      successMessage: 'Password copied to clipboard',
      errorMessage: 'Failed to copy password',
    });
  };

  const onSubmit = async (data: UserRequest) => {
    try {
      const valuesToSend = {
        ...data,
        tfa: data.tfa ? 1 : 0,
      };

      await createUser(valuesToSend);
      navigate('/admin/users');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  if (isPending) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Create new user" description="Create new user" />
      <PageBreadcrumb
        breadcrumbs={[
          { title: 'Home', to: '/admin/dashboard' },
          { title: 'Users', to: '/admin/users' },
          { title: 'Create new user' },
        ]}
      />

      <div className="space-y-6">
        <ComponentCard title="Create user">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 "
          >
            <span className="flex items-center">
              <PasswordIcon className="text-lg" />
            </span>
            Generate password
          </button>
          {password && (
            <p
              onClick={handleCopy}
              className="flex w-fit text-base font-medium text-gray-800 dark:text-white/90"
            >
              <span className="pr-[5px]">{password}</span>
              <CopyIcon className="text-xs cursor-pointer" />
            </p>
          )}

          <UserForm
            ref={formRef}
            defaultCurrent={{
              login: '',
              email: '',
              role: '',
              password: '',
              password_confirmation: '',
              tfa: 1,
            }}
            password={true}
            handleSubmit={onSubmit}
            roles={data}
            backLinkPath={previousPath}
          />
        </ComponentCard>
      </div>
    </>
  );
}
