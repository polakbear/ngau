import { useState, useMemo } from 'react';
import { rankBasedColorScale } from '../utils/color';

export function Legend() {
  const [showMethodology, setShowMethodology] = useState(false);

  const gradientStyle = useMemo(() => {
    const MAX_RANK = 194;
    const colorStops: string[] = [];
    const numStops = 20;

    for (let i = 0; i < numStops; i++) {
      const rank = Math.round(MAX_RANK - (i * (MAX_RANK - 1)) / (numStops - 1));
      const percent = (i / (numStops - 1)) * 100;
      const color = rankBasedColorScale(rank);
      colorStops.push(`${color} ${percent}%`);
    }

    return {
      background: `linear-gradient(to right, ${colorStops.join(', ')})`,
    };
  }, []);

  return (
    <>
      <div className="legend">
        <div className="legend-container">
          <div className="legend-scale">
            <div className="legend-bar">
              <div className="legend-no-data"></div>
              <div className="legend-gradient" style={gradientStyle}></div>
            </div>
            <div className="legend-row">
              <div className="legend-labels">
                <div className="legend-label-nodata">No data</div>
                <div className="legend-gradient-labels">
                  <span className="legend-label-verypoor">Very Poor</span>
                  <span className="legend-label-poor">Poor</span>
                  <span className="legend-label-fair">Fair</span>
                  <span className="legend-label-good">Good</span>
                  <span className="legend-label-excellent">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
