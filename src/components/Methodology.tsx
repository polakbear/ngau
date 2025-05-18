import { useEffect, useState } from 'react';

export function Methodology() {
  const [showMethodology, setShowMethodology] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className={`legend-methodology ${
          isDesktop || showMethodology ? 'active' : ''
        }`}
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
      <button
        className="methodology-toggle"
        onClick={() => setShowMethodology(!showMethodology)}
      >
        <i className="fas fa-info-circle"></i> Methodology
      </button>
    </>
  );
}
