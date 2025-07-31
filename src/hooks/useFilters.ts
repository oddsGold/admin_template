import { useState, useEffect } from 'react';
import { MultiOption } from "../types/crud";

interface SelectedFilters {
    selectedValues: string[];
    selectedOptions: MultiOption[];
}

interface UseFiltersProps {
    initialFilters?: SelectedFilters;
    setFilters: (filters: { status: string[] }) => void;
    setPage: (page: number) => void;
    storageKey?: string;
}

export function useFilters({
                               initialFilters = { selectedValues: [], selectedOptions: [] },
                               setFilters,
                               setPage,
                               storageKey = 'selectedFilters'
                           }: UseFiltersProps) {
    const [selectedStatuses, setSelectedStatuses] = useState<SelectedFilters>(() => {
        if (typeof window !== 'undefined' && storageKey) {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                setFilters({ status: parsed.selectedValues });
                return parsed;
            }
        }
        return initialFilters;
    });

    useEffect(() => {
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(selectedStatuses));
        }
    }, [selectedStatuses, storageKey]);

    const removeFilter = (value: string) => {
        const newSelectedValues = selectedStatuses.selectedValues.filter(item => item !== value);
        const newSelectedOptions = selectedStatuses.selectedOptions.filter(
            option => option.value !== value
        );

        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify({
                selectedValues: newSelectedValues,
                selectedOptions: newSelectedOptions
            }));
        }

        setSelectedStatuses({
            selectedValues: newSelectedValues,
            selectedOptions: newSelectedOptions
        });

        setFilters({ status: newSelectedValues });
        setPage(1);
    };

    const clearFilters = () => {
        setSelectedStatuses(initialFilters);
        setFilters({ status: [] });
        setPage(1);
        if (storageKey) {
            localStorage.removeItem(storageKey);
        }
    };

    return {
        selectedStatuses,
        setSelectedStatuses,
        removeFilter,
        clearFilters,
    };
}