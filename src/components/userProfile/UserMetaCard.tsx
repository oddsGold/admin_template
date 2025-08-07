import owner from '../../images/user/owner.png';
import { AccountData } from '../../types/account.ts';

interface UserProps {
  account: AccountData;
}

export default function UserMetaCard({ account }: UserProps) {
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src={owner} alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {account.login}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
