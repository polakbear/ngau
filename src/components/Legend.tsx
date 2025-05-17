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
        <div className="legend-title">Kids Rights Index</div>
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

        <button
          className="methodology-toggle"
          onClick={() => setShowMethodology(!showMethodology)}
        >
          <i className="fas fa-info-circle"></i> Methodology
        </button>

        <div
          className={`legend-methodology ${showMethodology ? 'active' : ''}`}
          id="methodology-panel"
        >
          <div className="methodology-section methodology-overall">
            <strong>Overall (KRI Score):</strong>
            Combined measure of child rights implementation
          </div>
          <div className="methodology-section methodology-life">
            <strong>Life:</strong>
            Under-5 mortality, life expectancy, maternal mortality
          </div>
          <div className="methodology-section methodology-health">
            <strong>Health:</strong>
            Underweight children, immunization, sanitation, water access
          </div>
          <div className="methodology-section methodology-education">
            <strong>Education:</strong>
            Schooling for girls and boys, gender gap
          </div>
          <div className="methodology-section methodology-protection">
            <strong>Protection:</strong>
            Child labour, adolescent birth rate, birth registration
          </div>
          <div className="methodology-section methodology-environment">
            <strong>Empowerment:</strong>
            Child marriage, female genital mutilation, voice of the child
          </div>
        </div>
      </div>

      <div className="data-sources">
        Data sources:{' '}
        <a
          href="https://kidsrights.org/research/kidsrights-index/"
          target="_blank"
          rel="noopener"
        >
          KidsRights Index
        </a>
        ,{' '}
        <a href="https://data.unicef.org/" target="_blank" rel="noopener">
          UNICEF
        </a>
      </div>
    </>
  );
}
