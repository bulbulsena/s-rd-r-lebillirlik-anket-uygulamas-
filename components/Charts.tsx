
import React from 'react';

interface BarChartProps {
    data: { label: string; value: number; color: string }[];
    title: string;
    unit: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, unit }) => {
    const validData = data.filter(d => d.value > 0);
    const maxValue = Math.max(...validData.map(d => d.value), 0);
    const chartHeight = 200;
    const barWidth = 50;
    const barMargin = 25;
    const width = validData.length * (barWidth + barMargin) - barMargin;

    return (
        <div className="p-4 border bg-white rounded-lg shadow-sm">
            <h4 className="text-md font-semibold text-gray-700 mb-4 text-center">{title}</h4>
            {validData.length > 0 && maxValue > 0 ? (
                <div className="flex justify-center items-end h-[250px] gap-4">
                    {validData.map((d, i) => {
                        const barHeight = maxValue > 0 ? (d.value / maxValue) * chartHeight : 0;
                        return (
                            <div key={i} className="flex flex-col items-center">
                                <div className="text-xs font-medium text-gray-600">{d.value.toLocaleString('tr-TR')} {unit}</div>
                                <div
                                    className="w-12 rounded-t-md hover:opacity-90 transition-opacity"
                                    style={{ height: `${barHeight}px`, backgroundColor: d.color }}
                                    title={`${d.label}: ${d.value} ${unit}`}
                                ></div>
                                <div className="text-xs text-center text-gray-500 mt-1">{d.label}</div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[250px]">
                     <p className="text-center text-gray-500">Bu grafik için yeterli veri bulunmuyor.</p>
                </div>
            )}
        </div>
    );
};
