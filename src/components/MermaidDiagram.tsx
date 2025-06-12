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
        // Clear the previous diagram
        diagramRef.current.innerHTML = '';
        
        try {
          const { svg } = await mermaid.render('mermaid-diagram', chart);
          diagramRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Failed to render Mermaid diagram:', error);
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className="flex justify-center my-8">
      <div 
        ref={diagramRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-x-auto"
      />
    </div>
  );
};

export default MermaidDiagram; 