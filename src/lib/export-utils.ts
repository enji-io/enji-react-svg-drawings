'use client';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';

interface ExportOptions {
  containerRef: React.RefObject<HTMLDivElement>;
  width?: number;
  height?: number;
}

const hideNoPrintElements = (container: HTMLDivElement) => {
  const noPrintElements = container.getElementsByClassName('no-print');
  const originalDisplays = Array.from(noPrintElements).map((el) => {
    const originalDisplay = window.getComputedStyle(el).display;
    (el as HTMLElement).style.display = 'none';
    return originalDisplay;
  });
  return { noPrintElements, originalDisplays };
};

const restoreNoPrintElements = (noPrintElements: HTMLCollectionOf<Element>, originalDisplays: string[]) => {
  Array.from(noPrintElements).forEach((el, index) => {
    (el as HTMLElement).style.display = originalDisplays[index];
  });
};

export async function exportToPDF({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  width: number; // kept for interface compatibility
  height: number; // kept for interface compatibility
}) {
  if (!containerRef.current) return;

  // Create a new jsPDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Grab the first <svg> in the container
  const svgElement = containerRef.current.querySelector('svg');
  if (!svgElement) {
    throw new Error('No SVG element found in the container. Please ensure the drawing is rendered before exporting.');
  }

  // Clone the SVG to avoid modifying the displayed one
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;

  // Remove no-print elements from the clone
  const noPrintElements = clonedSvg.getElementsByClassName('no-print');
  while (noPrintElements.length > 0) {
    noPrintElements[0].remove();
  }

  try {
    // Convert the SVG into PDF instructions via svg2pdf
    await svg2pdf(clonedSvg, doc, {
      x: 20,
      y: 20,
      width: doc.internal.pageSize.getWidth() - 40,
      height: doc.internal.pageSize.getHeight() - 40,
    });

    // Save the resulting PDF
    doc.save('technical-drawing.pdf');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to export PDF: ${errorMessage}`);
  }
}

export const exportToSVG = ({ containerRef }: ExportOptions) => {
  if (!containerRef.current) {
    throw new Error('Container reference is not available. Please ensure the drawing is rendered before exporting.');
  }
  const svgElement = containerRef.current.querySelector('svg');
  if (!svgElement) {
    throw new Error('No SVG element found in the container. Please ensure the drawing is rendered before exporting.');
  }

  // Clone the SVG to avoid modifying the displayed one
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;

  // Remove no-print elements from the clone
  const noPrintElements = clonedSvg.getElementsByClassName('no-print');
  while (noPrintElements.length > 0) {
    noPrintElements[0].remove();
  }

  // Create a blob from the SVG string
  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });

  // Create download link and trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'technical-drawing.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPNG = async ({ containerRef }: ExportOptions) => {
  if (!containerRef.current) {
    throw new Error('Container reference is not available. Please ensure the drawing is rendered before exporting.');
  }

  const { noPrintElements, originalDisplays } = hideNoPrintElements(containerRef.current);

  try {
    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: null,
      scale: 2, // Increase quality
    });

    // Create download link
    const link = document.createElement('a');
    link.download = 'technical-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to export PNG: ${errorMessage}`);
  } finally {
    restoreNoPrintElements(noPrintElements, originalDisplays);
  }
};
