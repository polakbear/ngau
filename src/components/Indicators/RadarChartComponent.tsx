import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import styles from './RadarChartComponent.module.css';

interface RadarChartComponentProps {
  scores: {
    life?: number | null;
    health?: number | null;
    education?: number | null;
    protection?: number | null;
    empowerment?: number | null;
  };
  overallRank: number | null;
}

const axisLabels = [
  { key: 'life', label: 'Life', icon: 'fa fa-seedling' },
  { key: 'health', label: 'Health', icon: 'fa fa-heart' },
  { key: 'education', label: 'Education', icon: 'fa fa-graduation-cap' },
  { key: 'protection', label: 'Protection', icon: 'fa fa-shield-alt' },
  { key: 'empowerment', label: 'Empowerment', icon: 'fa fa-globe' },
];

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({
  scores,
}) => {
  const chartData = axisLabels.map(({ key, label }) => {
    const scoreValue = scores[key as keyof typeof scores];
    const chartValue =
      typeof scoreValue === 'number' && scoreValue !== null ? scoreValue : 0;

    return {
      category: label,
      value: chartValue,
    };
  });

  const chartColor = '#5EEAD4';

  const CustomAxisLabel = ({ payload, x, y, cx, cy }: any) => {
    const axisData = axisLabels.find((item) => item.label === payload.value);
    if (!axisData) return <g></g>;

    const angle = Math.atan2(y - cy, x - cx);
    const distance = 25;
    const iconX = x + Math.cos(angle) * distance;
    const iconY = y + Math.sin(angle) * distance;

    const scoreValue = scores[axisData.key as keyof typeof scores];
    const formattedScore = scoreValue ? scoreValue.toFixed(3) : 'N/A';

    return (
      <g>
        <foreignObject x={iconX - 50} y={iconY - 15} width="100" height="30">
          <div className={styles.labelContainer}>
            <i className={`${axisData.icon} ${styles.labelIcon}`} />
            <div className={styles.labelTextContainer}>
              <div className={styles.labelText}>{axisData.label}</div>
              <div className={styles.labelScore}>{formattedScore}</div>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
          <PolarGrid stroke="#ffffff" strokeOpacity={0.1} />
          <PolarAngleAxis
            dataKey="category"
            tick={CustomAxisLabel}
            axisLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 1]}
            tick={false}
            axisLine={false}
            allowDataOverflow={false}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke={chartColor}
            fill={chartColor}
            fillOpacity={0.4}
            strokeWidth={2}
            dot={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
