import { Link } from 'react-router-dom';
import { Images } from '../../types/download';

interface FileListProps {
  data: Images[];
  handleDelete?: (item: Images) => void;
  file?: boolean;
  setFileData?: (item: Images) => void;
  removeFileData?: (item: null) => void;
}

export default function FileList({
  data,
  handleDelete,
  file = false,
  setFileData,
  removeFileData,
}: FileListProps) {
  return (
    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5">
          {data.map((item, index) => (
            <div key={index}>
              <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 flex items-start gap-6">
                <div className="flex w-full items-stretch gap-6">
                  <div className="flex-shrink-0 w-32 overflow-hidden rounded-lg">
                    {file ? (
                      <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-500 text-2xl font-semibold rounded-lg">
                        {item.origin.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <img
                        alt={item.origin}
                        src={item.url}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <b>Оригінальне ім'я:</b> {item.origin}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <b>Поточне ім'я:</b> {item.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <b>Дата завантаження:</b> {item.created_at}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 flex flex-col justify-center">
                    <Link
                      to={item.url}
                      target="_blank"
                      className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-600 shadow-theme-xs hover:bg-brand-500"
                      data-discover="true"
                    >
                      View
                    </Link>
                    {(setFileData || removeFileData) && (
                      <div
                        onClick={() => setFileData?.(item) ?? removeFileData?.(null)}
                        className={`inline-flex cursor-pointer items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg shadow-theme-xs ${
                          setFileData
                            ? 'bg-green-600 hover:bg-green-500'
                            : 'bg-red-600 hover:bg-red-500'
                        }`}
                      >
                        {setFileData ? 'Select' : 'Remove'}
                      </div>
                    )}
                    {handleDelete && (
                      <div
                        onClick={() => handleDelete(item)}
                        className="inline-flex cursor-pointer items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg bg-red-600 shadow-theme-xs hover:bg-red-500"
                      >
                        Delete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
