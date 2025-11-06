
import React from 'react';
import { Submission } from '../types';

interface HomeScreenProps {
    submissions: Submission[];
    onStartNew: () => void;
    onView: (submission: Submission) => void;
    onDelete: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ submissions, onStartNew, onView, onDelete }) => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">ÖRNEK YEMEK SANAYİ</h1>
                    <p className="text-lg sm:text-xl text-gray-600 mt-2">Sürdürülebilirlik Olgunluk Raporlama Platformu</p>
                </header>

                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Hoş Geldiniz</h2>
                    <p className="text-gray-600 mt-2 mb-8">Yeni bir sürdürülebilirlik olgunluk anketi başlatın veya geçmiş raporlarınızı görüntüleyin.</p>
                    <button
                        onClick={onStartNew}
                        className="w-full sm:w-auto px-10 py-4 text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                    >
                        Yeni Anket Başlat
                    </button>
                </div>

                {submissions.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Geçmiş Raporlar</h3>
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
                            {submissions.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()).map(submission => (
                                <div key={submission.id} className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="font-semibold text-gray-800">Rapor Tarihi</p>
                                        <p className="text-gray-600">{submission.submissionDate}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3 mt-3 sm:mt-0">
                                        <button
                                            onClick={() => onView(submission)}
                                            className="px-5 py-2 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Raporu Görüntüle
                                        </button>
                                        <button
                                            onClick={() => onDelete(submission.id)}
                                            className="px-5 py-2 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            aria-label={`Raporu sil: ${submission.submissionDate}`}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 <footer className="text-center mt-8 text-sm text-gray-500">
                    <p>&copy; 2024 Yeşil Dönüşüm Olgunluk Raporu Platformu</p>
                </footer>
            </div>
        </div>
    );
};