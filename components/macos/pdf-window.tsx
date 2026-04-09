"use client";

import { useState, useCallback, useEffect } from "react";
import { Window } from "./window";

interface PdfWindowProps {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClose?: () => void;
}

export function PdfWindow({
  src,
  title,
  className,
  style,
  isOpen = true,
  onClose,
}: PdfWindowProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [PdfComponents, setPdfComponents] = useState<{
    Document: React.ComponentType<any>;
    Page: React.ComponentType<any>;
  } | null>(null);

  useEffect(() => {
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfComponents({ Document: mod.Document, Page: mod.Page });
    });
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: n }: { numPages: number }) => {
      setNumPages(n);
    },
    []
  );

  return (
    <Window
      title={title}
      className={className}
      style={style}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col">
        {/* macOS Preview: gray background, centered page with shadow */}
        <div className="max-h-[620px] overflow-y-auto bg-[#929292] p-6 macos-scrollbar">
          <div className="flex justify-center">
            <div className="shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
              {PdfComponents ? (
                <PdfComponents.Document
                  file={src}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex h-[780px] w-[620px] items-center justify-center bg-white">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black/60" />
                    </div>
                  }
                >
                  <PdfComponents.Page
                    pageNumber={currentPage}
                    width={620}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </PdfComponents.Document>
              ) : (
                <div className="flex h-[780px] w-[620px] items-center justify-center bg-white">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black/60" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-center gap-3 border-t border-black/10 bg-[#e8e5e0] px-4 py-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="rounded p-0.5 text-foreground/60 transition-colors hover:bg-black/5 disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-[11px] text-foreground/60">
            {numPages > 0 ? `${currentPage} / ${numPages}` : "..."}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
            disabled={currentPage >= numPages}
            className="rounded p-0.5 text-foreground/60 transition-colors hover:bg-black/5 disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </Window>
  );
}
