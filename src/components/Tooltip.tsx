import { CountryData } from '../types';
import { rankBasedColorScale, getContrastingTextColor } from '../utils/color';
import { getFullLabel } from '../utils/score';
import MetricRow from './MetricRow';

export function Tooltip({
  countryName,
  country,
  closeButton,
  onClose,
}: {
  countryName: string;
  country: CountryData | undefined;
  closeButton?: boolean;
  onClose?: () => void;
}) {
  const total = 194;
  const rank = country?.kri_rank ?? null;
  const kri = country?.kri_score ?? null;

  if (!country || rank === null) {
    return (
      <div
        className="tooltip-content"
        style={{
          position: 'relative',
          width: '288px',
          minHeight: '180px',
          fontSize: '12px',
        }}
      >
        {closeButton && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <button onClick={onClose} className="pinned-icon" title="Pinned">
              <i className="fas fa-thumbtack" />
            </button>
          </div>
        )}

        <div
          className="tooltip-header"
          style={{ textAlign: 'left', fontSize: '14px', marginBottom: '8px' }}
        >
          {countryName}
        </div>
        <div
          style={{
            color: '#888',
            marginTop: '30px',
            textAlign: 'center',
            padding: '40px 0',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
          }}
        >
          <div>
            <i
              className="fas fa-info-circle"
              style={{ marginRight: '8px', opacity: 0.6 }}
            ></i>
            No data provided
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="tooltip-content"
      style={{
        position: 'relative',
        width: '288px',
        minHeight: '180px',
        fontSize: '11px',
      }}
    >
      {closeButton && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <button onClick={onClose} className="pinned-icon" title="Pinned">
            <i className="fas fa-thumbtack" />
          </button>
        </div>
      )}

      <div
        className="tooltip-header"
        style={{ textAlign: 'left', fontSize: '14px', marginBottom: '8px' }}
      >
        {countryName}
      </div>

      <div
        className="tooltip-badges-row"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px',
          width: '100%',
          fontSize: '10px',
        }}
      >
        <div
          className="tooltip-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 1,
            marginRight: '6px',
            backgroundColor: 'rgba(63, 209, 199, 0.1)',
            border: '1px solid rgba(63, 209, 199, 0.4)',
            borderRadius: '4px',
            padding: '4px 5px',
            maxWidth: '190px',
          }}
        >
          <i
            className="fa fa-star"
            style={{
              color: '#3fd1c7',
              marginRight: 4,
              width: '10px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          />
          <strong style={{ marginRight: '2px', fontSize: '10px' }}>KRI</strong>{' '}
          {kri != null ? kri.toFixed(3) : 'N/A'}
          <span style={{ margin: '0 3px' }}>|</span>
          <strong style={{ marginRight: '2px', fontSize: '10px' }}>
            Rank
          </strong>{' '}
          {rank} / {total}
        </div>
        <div
          className="badge-qual"
          style={{
            backgroundColor: rankBasedColorScale(rank),
            color: getContrastingTextColor(rankBasedColorScale(rank)),
            minWidth: '50px',
            textAlign: 'center',
            paddingLeft: '4px',
            paddingRight: '4px',
            paddingTop: '3px',
            paddingBottom: '3px',
            borderRadius: '4px',
            display: 'inline-block',
            flexShrink: 0,
            fontSize: '11px',
          }}
        >
          {getFullLabel(rank, total)}
        </div>
      </div>

      <div className="tooltip-metrics-grid" style={{ padding: '0' }}>
        <MetricRow
          iconClass="fa fa-seedling"
          label="Life"
          value={country?.life}
          rank={country?.ranking_life}
        />
        <MetricRow
          iconClass="fa fa-heart"
          label="Health"
          value={country?.health}
          rank={country?.ranking_health}
        />
        <MetricRow
          iconClass="fa fa-graduation-cap"
          label="Education"
          value={country?.education}
          rank={country?.ranking_education}
        />
        <MetricRow
          iconClass="fa fa-shield-alt"
          label="Protection"
          value={country?.protection}
          rank={country?.ranking_protection}
        />
        <MetricRow
          iconClass="fa fa-globe"
          label="Empowerment"
          value={country?.environment}
          rank={country?.ranking_environment}
        />
      </div>
    </div>
  );
}
