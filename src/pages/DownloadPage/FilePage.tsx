import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { useDeleteFile, useGetFile, useUploadFile } from '../../queries/download';
import { UseCrudPageLogic } from '../../hooks/useCrudPageLogic';
import PaginationInfo from '../../components/generics/PaginationInfo';
import PagePagination from '../../components/generics/PagePagination';
import PaginationSelector from '../../components/generics/PaginationSelector';
import DeleteConfirmDialog from '../../components/generics/DeleteConfirmDialog';
import { Loading } from '../../components/loadingBar/Loading';
import DropzoneComponent from '../../components/form/form-elements/DropZone';
import FileList from '../../components/download/FileList';
import { ImageSkeleton } from '../../components/shared/ImageSkeleton';

export default function FilePage() {
  const imageAccept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'application/vnd.ms-excel': ['.xls', '.xlsx'],
    'text/plain': ['.txt'],
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
    isFetching,
  } = UseCrudPageLogic(useGetFile, useDeleteFile);

  const { mutateAsync: uploadFile, isPending } = useUploadFile();

  const isLoadingData = isPending || isLoading;

  const onSubmit = async (data: FormData) => {
    try {
      await uploadFile(data);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <>
      <PageMeta title="File page" description="Image page" />
      <PageBreadcrumb breadcrumbs={[{ title: 'Files' }]} />

      <div className="space-y-6">
        {isLoadingData ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
            <Loading />
          </div>
        ) : (
          <>
            <DropzoneComponent accept={imageAccept} handleSubmit={onSubmit} />
            <div className="relative">
              {isFetching ? (
                [...Array(5)].map((_, index) => <ImageSkeleton key={index} />)
              ) : (
                <FileList data={data} handleDelete={handleOpenDialog} file={true} />
              )}
            </div>

            <div className="rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <PaginationInfo data={data} meta={meta} />
                <PagePagination page={page} setPage={setPage} meta={meta} />
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 px-4 py-4 rounded-t-xl sm:flex-row sm:items-center">
              <PaginationSelector size={size} handleChange={handleChange} />
            </div>

            <DeleteConfirmDialog
              openDialog={openDialog}
              title="file"
              handleDelete={handleDelete}
              handleCloseDialog={handleCloseDialog}
              itemToDelete={itemToDelete}
            />
          </>
        )}
      </div>
    </>
  );
}
