import React, { useRef, useState } from 'react';
import { SurveyData } from '../types';
import { BarChart } from './Charts';
import { Summary } from './Summary';

// Inform TypeScript about global variables from script tags
declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
}

// Simple Markdown to HTML renderer
const renderMarkdown = (text: string) => {
    if (!text) return { __html: '' };
    let html = text
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-gray-900 mb-6">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
        .replace(/\n/g, '<br />');

    // Basic list handling
    html = html.replace(/(<li class="ml-6 list-disc">.*?<\/li>)/gs, '<ul>$1</ul>').replace(/<\/ul><br \/><ul>/g, '');

    return { __html: html };
};


interface DashboardProps {
    data: SurveyData;
    report: string | null;
    onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, report, onReset }) => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        const element = reportRef.current;
        if (!element || !window.jspdf || !window.html2canvas) {
            console.error("PDF generation libraries not loaded.");
            alert("PDF oluşturma kütüphaneleri yüklenemedi. Lütfen tekrar deneyin.");
            return;
        };

        setIsDownloading(true);

        try {
            const { jsPDF } = window.jspdf;
            const canvas = await window.html2canvas(element, {
                scale: 2, // A higher scale improves quality
                useCORS: true,
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });

            const margin = 15;
            const pdfPageWidth = pdf.internal.pageSize.getWidth();
            const pdfContentWidth = pdfPageWidth - (margin * 2);
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            const pdfContentHeight = pdfPageHeight - (margin * 2);

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasAspectRatio = canvasHeight / canvasWidth;

            const projectedPdfHeight = pdfContentWidth * canvasAspectRatio;
            let currentPosition = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', margin, margin, pdfContentWidth, projectedPdfHeight);
            let heightLeft = projectedPdfHeight - pdfContentHeight;
            
            // Add subsequent pages if the content is taller than one page
            while (heightLeft > 0) {
                currentPosition -= pdfContentHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, currentPosition + margin, pdfContentWidth, projectedPdfHeight);
                heightLeft -= pdfContentHeight;
            }

            pdf.save('Sürdürülebilirlik_Raporu.pdf');

        } catch (error) {
            console.error("Error creating PDF:", error);
            alert("An error occurred while downloading the report. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };
    
    const energyData = [
        { label: 'Doğalgaz', value: Number(data.section2.q2_1_dogalgaz) || 0, color: '#22c55e' },
        { label: 'Elektrik', value: Number(data.section2.q2_1_elektrik) || 0, color: '#84cc16' },
        { label: 'Fuel-Oil', value: Number(data.section2.q2_1_fuelOil) || 0, color: '#f97316' },
    ];

    const wasteData = [
        { label: 'Genel Çöp', value: Number(data.section2.q2_6_genelCop) || 0, color: '#15803d' },
        { label: 'Geri Dönüşüm', value: Number(data.section2.q2_6_geriDonusum) || 0, color: '#22c55e' },
        { label: 'Tehlikeli', value: Number(data.section2.q2_6_tehlikeliAtik) || 0, color: '#ef4444' },
    ];

    return (
        <div>
            <div ref={reportRef} className="bg-white p-4">
                <header className="text-center pdf-section py-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Sürdürülebilirlik Olgunluk Raporu</h1>
                    <p className="text-lg sm:text-xl text-gray-600 mt-2">ÖRNEK YEMEK SANAYİ</p>
                </header>

                <section className="p-6 bg-white border border-gray-200 rounded-lg my-6 pdf-section">
                     <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Yapay Zeka Değerlendirmesi</h2>
                     <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(report || 'Rapor içeriği oluşturulamadı.')} />
                </section>

                <section className="p-6 bg-gray-50 border border-gray-200 rounded-lg my-6 pdf-section">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center border-b pb-2">Önemli Metrikler (Yıllık)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <BarChart data={energyData} title="Enerji Tüketim Dağılımı" unit="Birim" />
                        <BarChart data={wasteData} title="Atık Miktarı Dağılımı" unit="kg" />
                    </div>
                </section>
                
                <section>
                    <div className="text-center pdf-section py-4">
                         <h2 className="text-3xl font-bold text-gray-900">Anket Cevapları Özeti</h2>
                    </div>
                    <Summary data={data} isReportView={true} />
                </section>

            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={onReset}
                    className="px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Ana Sayfaya Dön
                </button>
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isDownloading ? 'İndiriliyor...' : 'Raporu PDF Olarak İndir'}
                </button>
            </div>
        </div>
    );
};