import React, { useState } from 'react';

interface Finding {
  region: string;
  observation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface HorseSilhouetteProps {
  className?: string;
  findings: Finding[];
  onRegionClick?: (region: string) => void;
}

interface RegionConfig {
  id: string;
  label: string;
  path: string;
  transform: string;
  labelPosition: { x: number; y: number };
}

const regions: RegionConfig[] = [
  {
    id: 'head',
    label: 'Head',
    path: 'M0 0 C0.99 0.66 1.98 1.32 3 2 C2.73010995 13.62980774 -0.27486778 24.75113465 -3 36 C2.01068782 31.86620195 6.29719154 27.82315109 9.9375 22.4375 C10.34863037 21.84686768 10.75976074 21.25623535 11.18334961 20.64770508 C15.02577151 15.08122305 18.67597133 9.38754613 22.28515625 3.66796875 C24 1 24 1 25 0 C26.66617115 -0.04063832 28.33388095 -0.042721 30 0',
    transform: 'translate(1146,0)',
    labelPosition: { x: 1160, y: 20 }
  },
  {
    id: 'neck',
    label: 'Neck',
    path: 'M0 0 C0.33 0 0.66 0 1 0 C1.9342628 17.31119394 2.11059982 34.60508491 2.125 51.9375 C2.12749756 52.9762326 2.12999512 54.01496521 2.13256836 55.08517456 C2.15950075 68.75619126 1.8288923 82.35348718 1 96 C0.67 96 0.34 96 0 96 C0 64.32 0 32.64 0 0',
    transform: 'translate(798,647)',
    labelPosition: { x: 810, y: 680 }
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    path: 'M0 0 C0.33 0 0.66 0 1 0 C1.12249334 27.35370419 0.93560766 54.66084753 0 82 C-0.33 82 -0.66 82 -1 82 C-1.14978063 54.65005726 -0.75402902 27.33956804 0 0',
    transform: 'translate(115,536)',
    labelPosition: { x: 130, y: 570 }
  }
];

const HorseSilhouette: React.FC<HorseSilhouetteProps> = ({ className, findings = [], onRegionClick }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getRegionColor = (regionId: string) => {
    const finding = findings.find(f => f.region === regionId);
    if (!finding) return '#D8D8D8';
    
    switch (finding.riskLevel) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#6BCB77';
      default:
        return '#D8D8D8';
    }
  };

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId);
    if (onRegionClick) {
      onRegionClick(regionId);
    }
  };

  return (
    <div className="relative">
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        width="1280" 
        height="1050"
        className={className}
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <defs>
          <filter id="hover-shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {regions.map((region) => (
          <g key={region.id}>
            <path
              d={region.path}
              fill={getRegionColor(region.id)}
              transform={region.transform}
              opacity={hoveredRegion === region.id || selectedRegion === region.id ? 0.8 : 0.6}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region.id)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                filter: hoveredRegion === region.id ? 'url(#hover-shadow)' : 'none'
              }}
            />
            <text
              x={region.labelPosition.x}
              y={region.labelPosition.y}
              fill="#333"
              fontSize="14"
              fontFamily="Arial"
              textAnchor="middle"
              pointerEvents="none"
            >
              {region.label}
            </text>
          </g>
        ))}
      </svg>

      {selectedRegion && findings.some(f => f.region === selectedRegion) && (
        <div className="absolute top-4 right-4 bg-white p-4 shadow-lg rounded-lg w-64 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              {regions.find(r => r.id === selectedRegion)?.label} Findings
            </h3>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          {findings
            .filter(f => f.region === selectedRegion)
            .map((finding, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <p className="text-sm text-gray-700 mb-1">{finding.observation}</p>
                <span 
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    finding.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                    finding.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}
                >
                  {finding.riskLevel.toUpperCase()} RISK
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HorseSilhouette; 