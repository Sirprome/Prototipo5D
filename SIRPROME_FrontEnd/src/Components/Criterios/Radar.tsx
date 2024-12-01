import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface CriterioData {
  criterio: string;
  valor: number;
}

interface RadarChartExampleProps {
  data: CriterioData[];
}

const RadarChartExample: React.FC<RadarChartExampleProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="criterio" />
          <PolarRadiusAxis />
          <Radar
            name="Valor"
            dataKey="valor"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartExample;
