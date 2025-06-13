import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
    });

    const renderDiagram = async () => {
      if (diagramRef.current) {
        try {
          const { svg } = await mermaid.render('mermaid-diagram', chart);
          diagramRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render Mermaid diagram:', error);
          diagramRef.current.innerHTML = '<div class="text-red-500 text-center p-4">Failed to load diagram. Please try refreshing the page.</div>';
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className="flex justify-center">
      <div 
        ref={diagramRef}
        className="w-full max-w-7xl overflow-x-auto"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default MermaidDiagram; 