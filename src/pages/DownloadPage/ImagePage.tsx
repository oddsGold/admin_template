import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {useDeleteImage, useGetImages, useUploadImage} from "../../queries/download";
import {UseCrudPageLogic} from "../../hooks/useCrudPageLogic";
import PaginationInfo from "../../components/generics/PaginationInfo";
import PagePagination from "../../components/generics/PagePagination";
import PaginationSelector from "../../components/generics/PaginationSelector";
import DeleteConfirmDialog from "../../components/generics/DeleteConfirmDialog";
import {Loading} from "../../components/loadingBar/Loading";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import FileList from "../../components/download/FileList";
import {ImageSkeleton} from "../../components/shared/ImageSkeleton";

export default function ImagePage() {
    const imageAccept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp', '.svg+xml'],
    };

    const {
        size,
        openDialog,
        itemToDelete,
        data,
        isLoading,
        handleChange,
        handleOpenDialog,
        handleCloseDialog,
        handleDelete,
        meta,
        page,
        setPage,
        isFetching
    } = UseCrudPageLogic(useGetImages, useDeleteImage);

    const { mutateAsync: uploadImage, isPending } = useUploadImage();

    const isLoadingData = isPending || isLoading;

    const onSubmit = async (data: FormData) => {
        try {
            await uploadImage(data);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <>
            <PageMeta title="Image page" description="Image page"/>
            <PageBreadcrumb
                breadcrumbs={[{title: 'Images'}]}
            />

            <div className="space-y-6">
                    {isLoadingData ? (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <DropzoneComponent accept={imageAccept} handleSubmit={onSubmit} />
                            <div className="relative">
                                {isFetching
                                ?[...Array(5)].map((_, index) => <ImageSkeleton key={index} />)
                                : <FileList data={data} handleDelete={handleOpenDialog}/>}
                            </div>

                            <div className="rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                                    <PaginationInfo data={data} meta={meta}/>
                                    <PagePagination page={page} setPage={setPage} meta={meta}/>
                                </div>
                            </div>

                            <div
                                className="flex flex-col justify-end gap-2 px-4 py-4 rounded-t-xl sm:flex-row sm:items-center">
                                <PaginationSelector size={size} handleChange={handleChange}/>
                            </div>

                            <DeleteConfirmDialog
                                openDialog={openDialog}
                                title="image"
                                handleDelete={handleDelete}
                                handleCloseDialog={handleCloseDialog}
                                itemToDelete={itemToDelete}
                            />
                        </>
                    )}
            </div>
        </>
    )
}