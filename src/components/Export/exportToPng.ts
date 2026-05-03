import { toPng } from 'html-to-image';

export async function exportToPng(element: HTMLElement): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      backgroundColor: '#020617',
      pixelRatio: 2,
      filter: (node) => {
        if (node instanceof HTMLElement) {
          if (node.classList.contains('react-flow__minimap')) return false;
          if (node.classList.contains('react-flow__controls')) return false;
        }
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = 'struct-diagram.png';
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Export failed:', err);
  }
}
