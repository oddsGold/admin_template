import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface GroupButtonsProps {
    backLinkPath: string;
    isSubmitting?: boolean;
}

const GroupButtons: React.FC<GroupButtonsProps> = ({ backLinkPath, isSubmitting = false }) => {
    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-start">
                <Link
                    to={backLinkPath}
                    className="inline-flex w-40 items-center justify-center gap-2 rounded-lg px-4 py-2 transition bg-warning-500 text-white shadow-theme-xs hover:bg-warning-600 disabled:bg-warning-300"
                >
                    Back
                </Link>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="sm"
                    variant="success"
                    className="w-40"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </div>
    );
};

export default GroupButtons;