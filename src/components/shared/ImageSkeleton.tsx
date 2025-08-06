export const ImageSkeleton = () => {
    return (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                    <div>
                            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 flex items-start gap-6">
                                <div className="flex w-full items-stretch gap-6">
                                    {/* Скелетон для зображення */}
                                    <div className="flex-shrink-0 w-32 overflow-hidden rounded-lg bg-gray-200 animate-pulse h-32" />

                                    <div className="flex-1 flex flex-col justify-center space-y-3">
                                        {/* Скелетони для тексту */}
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                                    </div>

                                    <div className="flex flex-col gap-3 justify-center">
                                        {/* Скелетони для кнопок */}
                                        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
                                        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};