import React from 'react';
import { SurveyData } from '../types';
import { SECTIONS } from '../constants';

interface SummaryProps {
  data: SurveyData;
  isReportView?: boolean;
}

const DataRow: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => {
  const displayValue = value || <span className="text-gray-400">Cevaplanmadı</span>;
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">{displayValue}</dd>
    </div>
  );
};

const SectionSummary: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg pdf-section">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">{title}</h3>
        <dl className="divide-y divide-gray-200">
            {children}
        </dl>
    </div>
);

export const Summary: React.FC<SummaryProps> = ({ data, isReportView = false }) => {
  return (
    <div className="space-y-6">
        {!isReportView && (
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Anket Özeti</h2>
                <p className="mt-2 text-gray-600">Lütfen verdiğiniz cevapları kontrol ediniz. Raporunuz bu verilere göre oluşturulacaktır.</p>
            </div>
        )}

      <SectionSummary title={SECTIONS[0].title}>
        <DataRow label="1.1 Sürdürülebilirlik Lideri/Ekibi var mı?" value={data.section1.q1_1_liderVarMi} />
        {data.section1.q1_1_liderVarMi === 'evet' && <DataRow label="Unvan ve Sorumluluk Tanımı" value={data.section1.q1_1_liderUnvan} />}
        <DataRow label="1.2 Strateji ile Sürdürülebilirlik arasında bağ var mı?" value={data.section1.q1_2_baglanti} />
        <DataRow label="Teknolojik Yatırımlar ve Maliyeti" value={data.section1.q1_2_yatirimlar} />
        <DataRow label="1.3 Performans Raporlaması Yapılıyor mu?" value={data.section1.q1_3_raporlama} />
        <DataRow label="1.4 ISO 45001 Geçiş Planı" value={data.section1.q1_4_iso45001Gecis} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[1].title}>
        <DataRow label="2.1 Doğalgaz Tüketimi (m³)" value={data.section2.q2_1_dogalgaz} />
        <DataRow label="2.1 Elektrik Tüketimi (kWh)" value={data.section2.q2_1_elektrik} />
        <DataRow label="2.1 Fuel-oil Tüketimi (Litre/Ton)" value={data.section2.q2_1_fuelOil} />
        <DataRow label="2.2 Toplam Yemek Porsiyonu" value={data.section2.q2_2_toplamPorsiyon} />
        <DataRow label="2.2 Porsiyon Başına Enerji Tüketimi" value={data.section2.q2_2_porsiyonBasiEnerji} />
        <DataRow label="2.3 Toplam Su Tüketimi (m³)" value={data.section2.q2_3_suTuketimi} />
        <DataRow label="2.4 Porsiyon Başına Su Tüketimi (Litre/Porsiyon)" value={data.section2.q2_4_porsiyonBasiSu} />
        <DataRow label="2.5 Atık Su Yönetimi Kayıtları" value={data.section2.q2_5_atikSuYonetimi} />
        <DataRow label="2.6 Genel Çöp Miktarı (kg)" value={data.section2.q2_6_genelCop} />
        <DataRow label="2.6 Geri Dönüştürülebilir Atık Miktarı (kg)" value={data.section2.q2_6_geriDonusum} />
        <DataRow label="2.6 Tehlikeli Atık Miktarı (kg)" value={data.section2.q2_6_tehlikeliAtik} />
        <DataRow label="2.7 Geri Kazanım Oranı (%)" value={data.section2.q2_7_geriKazanimOrani} />
      </SectionSummary>

       <SectionSummary title={SECTIONS[2].title}>
        <DataRow label="3.1 Toplam Araç Sayısı" value={data.section3.q3_1_aracSayisi} />
        <DataRow label="3.1 Araç Detayları" value={data.section3.q3_1_aracDetaylari} />
        <DataRow label="3.2 Toplam Yakıt Tüketimi (Litre)" value={data.section3.q3_2_yakitTuketimi} />
        <DataRow label="3.3 Lojistik Verimlilik Metrikleri" value={data.section3.q3_3_lojistikVerimlilik} />
        <DataRow label="3.4 Scope 1 Emisyon Hesabı" value={data.section3.q3_4_scope1Emisyon} />
        <DataRow label="3.5 Rota Optimizasyonu" value={data.section3.q3_5_rotaOptimizasyonu} />
        <DataRow label="3.6 Düşük Emisyonlu Araç Alım Politikası" value={data.section3.q3_6_satinAlmaPolitikasi} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[3].title}>
        <DataRow label="4.1 Yeşil Kurulum Teklifi" value={data.section4.q4_1_yesilKurulum} />
        <DataRow label="4.1 Kurulum Oranı" value={data.section4.q4_1_kurulumOrani} />
        <DataRow label="4.2 Enerji/Su Tüketim Takibi" value={data.section4.q4_2_olcumYapiliyorMu} />
        <DataRow label="4.2 Pilot Çalışma" value={data.section4.q4_2_pilotCalisma} />
        <DataRow label="4.3 Verimlilik Eğitimleri" value={data.section4.q4_3_verimlilikEgitimleri} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[4].title}>
        <DataRow label="5.1 Gıda Atığı Ölçümü" value={data.section5.q5_1_gidaAtigiOlcumu} />
        <DataRow label="5.2 Mutfak Hazırlık Firesi (kg)" value={data.section5.q5_2_mutfakHazirlikFiresi} />
        <DataRow label="5.2 Fazla Üretim Atığı (kg)" value={data.section5.q5_2_fazlaUretimAtigi} />
        <DataRow label="5.2 Tabak Artığı (kg)" value={data.section5.q5_2_tabakArtigi} />
        <DataRow label="5.3 Taşıma Modeli Atık Kategorisi ve Miktarı" value={data.section5.q5_3_tasimaModeliAtik} />
        <DataRow label="5.4 Yerinde Üretim Atık Raporlaması" value={data.section5.q5_4_yerindeUretimRaporlama} />
        <DataRow label="5.5 Değerlendirme: Gıda Bankası (kg/ay)" value={data.section5.q5_5_degerlendirmeGidaBankasi} />
        <DataRow label="5.5 Değerlendirme: Kompost (kg/ay)" value={data.section5.q5_5_degerlendirmeKompost} />
        <DataRow label="5.5 Değerlendirme: Bertaraf (kg/ay)" value={data.section5.q5_5_degerlendirmeBertaraf} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[5].title}>
        <DataRow label="6.1 Servis Malzemesi: Plastik (%)" value={data.section6.q6_1_plastik} />
        <DataRow label="6.1 Servis Malzemesi: Köpük (%)" value={data.section6.q6_1_kopuk} />
        <DataRow label="6.1 Servis Malzemesi: Biyo-çözünür (%)" value={data.section6.q6_1_bioCozunur} />
        <DataRow label="6.1 Servis Malzemesi: Yıkanabilir (%)" value={data.section6.q6_1_yikanabilir} />
        <DataRow label="6.2 Yerinde Üretim Yıkanabilir Ekipman Oranı (%)" value={data.section6.q6_2_yerindeYikanabilirOrani} />
        <DataRow label="6.3 Alternatif Ambalaj Analizi" value={data.section6.q6_3_alternatifAmbalajAnalizi} />
        <DataRow label="6.4 Termobox Temizlik Ölçümü" value={data.section6.q6_4_termoboxTemizlikOlcumu} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[6].title}>
        <DataRow label="7.1 Yeşil Satın Alma Politikası" value={data.section7.q7_1_yesilSatinAlma} />
        <DataRow label="7.2 Yerel Alım Oranı (%)" value={data.section7.q7_2_yerellikOrani} />
        <DataRow label="7.3 Denetlenen/Eğitilen Tedarikçi Sayısı" value={data.section7.q7_3_tedarikciDenetimi} />
      </SectionSummary>
      
      <SectionSummary title={SECTIONS[7].title}>
        <DataRow label="8.1 Toplam Çalışan Sayısı" value={data.section8.q8_1_calisanSayisi} />
        <DataRow label="8.1 Toplam Adam-Saat" value={data.section8.q8_1_toplamAdamSaat} />
        <DataRow label="8.1 Kaza Sayısı" value={data.section8.q8_1_kazaSayisi} />
        <DataRow label="8.1 Kaza Sıklık Oranı" value={data.section8.q8_1_kazaSiklikOrani} />
        <DataRow label="8.1 Kişi Başı Eğitim Saati" value={data.section8.q8_1_egitimSaati} />
        <DataRow label="8.2 Psikolojik Sağlık Çalışması" value={data.section8.q8_2_psikolojikSaglikCalismasi} />
        <DataRow label="8.3 Memnuniyet Anketi Katılım Oranı (%)" value={data.section8.q8_3_memnuniyetKatilimOrani} />
        <DataRow label="8.3 Memnuniyet Skoru (/100)" value={data.section8.q8_3_memnuniyetSkoru} />
        <DataRow label="8.4 İşten Ayrılma Oranı (%)" value={data.section8.q8_4_devirHizi} />
        <DataRow label="8.5 Sürdürülebilirlik Farkındalık Eğitimleri" value={data.section8.q8_5_farkindalikEgitimleri} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[8].title}>
        <DataRow label="9.1 Gıda Bankası Protokolü" value={data.section9.q9_1_gidaBankasiProtokolu} />
        <DataRow label="9.1 Bağışlanan Gıda Miktarı" value={data.section9.q9_1_bagislananGidaMiktari} />
        <DataRow label="9.2 Bitki Bazlı Menü Oranı (%)" value={data.section9.q9_2_bitkiBazliMenuOrani} />
        <DataRow label="9.2 Besin Değeri Sunumu" value={data.section9.q9_2_besinDegeriSunumu} />
        <DataRow label="9.3 Sürdürülebilir Menü Sunumu" value={data.section9.q9_3_surdurulebilirMenuSunumu} />
      </SectionSummary>

      <SectionSummary title={SECTIONS[9].title}>
        <DataRow label="10.1 Toplam Enerji Maliyeti (TL)" value={data.section10.q10_1_enerjiMaliyeti} />
        <DataRow label="10.1 Toplam Su Maliyeti (TL)" value={data.section10.q10_1_suMaliyeti} />
        <DataRow label="10.1 Toplam Atık Bertaraf Maliyeti (TL)" value={data.section10.q10_1_atikBertarafMaliyeti} />
        <DataRow label="10.1 Toplam Lojistik Yakıt Maliyeti (TL)" value={data.section10.q10_1_lojistikYakitMaliyeti} />
        <DataRow label="10.1 Toplam Ambalaj Maliyeti (TL)" value={data.section10.q10_1_ambalajMaliyeti} />
        <DataRow label="10.2 Yıllık Ekonomik Tasarruf (TL)" value={data.section10.q10_2_tasarrufMiktari} />
        <DataRow label="10.3 Tahmini Yıllık Gıda Atığı Maliyeti (TL)" value={data.section10.q10_3_gidaAtigiMaliyeti} />
      </SectionSummary>

    </div>
  );
};