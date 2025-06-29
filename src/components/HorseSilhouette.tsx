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
}

const HorseSilhouette: React.FC<HorseSilhouetteProps> = ({ className, findings, onRegionClick }) => {
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
    setSelectedRegion(regionId);
    if (onRegionClick) {
      onRegionClick(regionId);
    }
  };

  const regions: RegionConfig[] = [
    {
      id: 'head',
      label: 'Head',
      path: 'M0 0 C0.99 0.66 1.98 1.32 3 2...',  // Existing head path
      transform: 'translate(1146,0)'
    },
    {
      id: 'neck',
      label: 'Neck',
      path: 'M0 0 C0.33 0 0.66 0 1 0...',  // Existing neck path
      transform: 'translate(798,647)'
    },
    // ... Add other regions with their paths
  ];

  return (
    <div className="relative">
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        width="1280" 
        height="1050"
        className={className}
      >
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
              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            />
            <text
              x={0} // You'll need to adjust x,y coordinates for each label
              y={0}
              fill="#333"
              fontSize="14"
              fontFamily="Arial"
              transform={region.transform}
            >
              {region.label}
            </text>
          </g>
        ))}
      </svg>

      {selectedRegion && (
        <div className="absolute top-0 right-0 bg-white p-4 shadow-lg rounded-lg w-64">
          <h3 className="text-lg font-semibold mb-2">Findings</h3>
          {findings
            .filter(f => f.region === selectedRegion)
            .map((finding, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm">{finding.observation}</p>
                <span 
                  className={`inline-block px-2 py-1 rounded text-xs ${
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