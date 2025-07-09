
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange
}: PaginationComponentProps) {
    // Generate visible page numbers
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Always show first page
        range.push(1);

        // Calculate start and end of middle range
        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        // Add ellipsis after first page if needed
        if (start > 2) {
            rangeWithDots.push(1);
            if (start > 3) {
                rangeWithDots.push('...');
            }
        } else if (totalPages > 1) {
            rangeWithDots.push(1);
        }

        // Add middle range
        for (let i = start; i <= end; i++) {
            if (i !== 1 && i !== totalPages) {
                rangeWithDots.push(i);
            }
        }

        // Add ellipsis before last page if needed
        if (end < totalPages - 1) {
            if (end < totalPages - 2) {
                rangeWithDots.push('...');
            }
            if (totalPages > 1) {
                rangeWithDots.push(totalPages);
            }
        } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number') {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevious}
                        className={`cursor-pointer ${currentPage === 1
                                ? 'pointer-events-none opacity-50'
                                : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                    />
                </PaginationItem>

                {visiblePages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                onClick={() => handlePageClick(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={`cursor-pointer ${currentPage === totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
