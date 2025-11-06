
import React from 'react';
import { QuestionCard, Label, Input, Textarea, RadioGroup } from './ui';
import { SurveyData } from '../types';

type SectionProps<T> = { data: T; onUpdate: (field: keyof T, value: any) => void; };

const yesNoOptions = [{ label: 'Evet', value: 'evet' }, { label: 'Hayır', value: 'hayır' }];

export const Section1: React.FC<SectionProps<SurveyData['section1']>> = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <QuestionCard title="1.1. Sahiplenme" description='Bu üç politikayı (Çevre, İSG, Kalite) entegre bir "Sürdürülebilirlik Stratejisi" olarak yöneten ve üst yönetime raporlayan belirli bir kişi veya komiteniz (Sürdürülebilirlik Lideri/Ekibi) var mı?'>
      <RadioGroup name="q1_1_liderVarMi" value={data.q1_1_liderVarMi} onChange={(val) => onUpdate('q1_1_liderVarMi', val)} options={yesNoOptions} />
      {data.q1_1_liderVarMi === 'evet' && (
        <Textarea label="Varsa, bu kişinin unvanı ve sorumluluk tanımı nedir?" value={data.q1_1_liderUnvan} onChange={(e) => onUpdate('q1_1_liderUnvan', e.target.value)} />
      )}
    </QuestionCard>
    <QuestionCard title="1.2. Stratejik Entegrasyon" description='Misyonunuzdaki "inovasyon" ve "teknoloji" hedefleri ile Çevre Politikanızdaki "enerji verimliliği" hedefi arasında somut bir bağ var mı?'>
       <RadioGroup name="q1_2_baglanti" value={data.q1_2_baglanti} onChange={(val) => onUpdate('q1_2_baglanti', val)} options={yesNoOptions} />
       <Textarea label='Son 2 yılda, "sürdürülebilirlik" (örn: enerji/su tasarrufu, atık azaltma) amacıyla yaptığınız "teknolojik" yatırımlar nelerdir ve maliyeti nedir?' value={data.q1_2_yatirimlar} onChange={(e) => onUpdate('q1_2_yatirimlar', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="1.3. Vizyon Entegrasyonu" description='Vizyonunuzdaki "Güven veren kuruluş" imajını desteklemek için, gıda güvenliği ve lezzet dışında, çevresel veya sosyal performansınızı (örn: gıda atığı oranı, karbon emisyonu) müşterilerinize şeffaf bir şekilde raporluyor musunuz?'>
       <RadioGroup name="q1_3_raporlama" value={data.q1_3_raporlama} onChange={(val) => onUpdate('q1_3_raporlama', val)} options={yesNoOptions} />
    </QuestionCard>
    <QuestionCard title="1.4. Standart Güncelleme (Metrik)" description="İSG Politikanız OHSAS 18001'i referans alıyor. ISO 45001'e geçiş için bir planınız var mı? Bu geçişin mevcut durumu nedir (planlama, uygulama, sertifikasyon)?">
       <Textarea label="Geçiş planı ve durumu" value={data.q1_4_iso45001Gecis} onChange={(e) => onUpdate('q1_4_iso45001Gecis', e.target.value)} />
    </QuestionCard>
  </div>
);

export const Section2: React.FC<SectionProps<SurveyData['section2']>> = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <QuestionCard title="2.1. Enerji (Metrik)" description="Merkezi tesisinizde son 12 ayda tüketilen toplam enerji miktarı (kaynaklara göre ayrı ayrı) nedir?">
      <Input label="Doğalgaz" unit="m³" type="number" value={data.q2_1_dogalgaz} onChange={(e) => onUpdate('q2_1_dogalgaz', e.target.value)} />
      <Input label="Elektrik" unit="kWh" type="number" value={data.q2_1_elektrik} onChange={(e) => onUpdate('q2_1_elektrik', e.target.value)} />
      <Input label="Fuel-oil vb." unit="Litre/Ton" type="number" value={data.q2_1_fuelOil} onChange={(e) => onUpdate('q2_1_fuelOil', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="2.2. Enerji Verimliliği (KPI)" description='Merkezi tesiste son 12 ayda üretilen toplam yemek porsiyonu nedir? Buna dayanarak "porsiyon başına enerji tüketimi (kWh/Porsiyon)" metriğini hesaplıyor musunuz?'>
      <Input label="Toplam Yemek Porsiyonu" type="number" value={data.q2_2_toplamPorsiyon} onChange={(e) => onUpdate('q2_2_toplamPorsiyon', e.target.value)} />
      <Textarea label="Porsiyon başına enerji tüketimi hesaplaması ve değeri" value={data.q2_2_porsiyonBasiEnerji} onChange={(e) => onUpdate('q2_2_porsiyonBasiEnerji', e.target.value)} />
    </QuestionCard>
     <QuestionCard title="2.3. Su (Metrik) & 2.4. Su Verimliliği (KPI)" description="Son 12 aydaki toplam şebeke suyu tüketiminiz ve 'porsiyon başına su tüketimi' metriğiniz nedir?">
      <Input label="Toplam şebeke suyu miktarı" unit="m³" type="number" value={data.q2_3_suTuketimi} onChange={(e) => onUpdate('q2_3_suTuketimi', e.target.value)} />
      <Input label="Porsiyon başına su tüketimi" unit="Litre/Porsiyon" type="number" value={data.q2_4_porsiyonBasiSu} onChange={(e) => onUpdate('q2_4_porsiyonBasiSu', e.target.value)} />
    </QuestionCard>
     <QuestionCard title="2.5. Atık Su (Uyum)" description="Atık su yönetimi için (özellikle yağ ayırıcılar - FOG) yasal gereklilikler kapsamında yapılan periyodik bakım ve ölçüm kayıtları (tarih, sonuç) nelerdir?">
       <Textarea label="Bakım ve ölçüm kayıtları" value={data.q2_5_atikSuYonetimi} onChange={(e) => onUpdate('q2_5_atikSuYonetimi', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="2.6. Genel Atık (Metrik) & 2.7. Geri Kazanım Oranı (KPI)" description="Son 12 ayda oluşan toplam atık miktarını (ton veya kg) kategorize edilmiş olarak belirtin ve geri kazanım oranınızı hesaplayın.">
      <Input label="Genel Çöp (Bertaraf)" unit="kg" type="number" value={data.q2_6_genelCop} onChange={(e) => onUpdate('q2_6_genelCop', e.target.value)} />
      <Input label="Geri Dönüştürülebilir (Ambalaj, kağıt, metal, plastik)" unit="kg" type="number" value={data.q2_6_geriDonusum} onChange={(e) => onUpdate('q2_6_geriDonusum', e.target.value)} />
      <Input label="Tehlikeli Atık (varsa)" unit="kg" type="number" value={data.q2_6_tehlikeliAtik} onChange={(e) => onUpdate('q2_6_tehlikeliAtik', e.target.value)} />
      <Input label="Geri Kazanım Oranı" unit="%" type="number" placeholder="Toplam atık içindeki geri dönüştürülebilir atık oranı" value={data.q2_7_geriKazanimOrani} onChange={(e) => onUpdate('q2_7_geriKazanimOrani', e.target.value)} />
    </QuestionCard>
  </div>
);

export const Section3: React.FC<SectionProps<SurveyData['section3']>> = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <QuestionCard title="3.1. Filo Envanteri" description="Sevkiyat filonuzda kaç adet araç bulunmaktadır? Bu araçların yakıt tipine (dizel, benzinli, elektrikli, hibrit) ve yaş ortalamasına göre dağılımı nedir?">
      <Input label="Toplam araç sayısı" type="number" value={data.q3_1_aracSayisi} onChange={(e) => onUpdate('q3_1_aracSayisi', e.target.value)} />
      <Textarea label="Araçların yakıt tipi ve yaş dağılımı" value={data.q3_1_aracDetaylari} onChange={(e) => onUpdate('q3_1_aracDetaylari', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="3.2. Yakıt Tüketimi (Metrik)" description="Filonuzun son 12 aydaki toplam yakıt tüketimi (Litre) nedir?">
      <Input label="Toplam Yakıt Tüketimi" unit="Litre" type="number" value={data.q3_2_yakitTuketimi} onChange={(e) => onUpdate('q3_2_yakitTuketimi', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="3.3. Lojistik Verimlilik (KPI)" description='"Dağıtılan porsiyon başına yakıt tüketimi (Litre/Porsiyon)" veya "Kat edilen km başına yakıt tüketimi (Litre/100 km)" metriklerini takip ediyor musunuz?'>
      <Textarea label="Takip edilen metrikler ve değerleri" value={data.q3_3_lojistikVerimlilik} onChange={(e) => onUpdate('q3_3_lojistikVerimlilik', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="3.4. Emisyonlar (KPI)" description="Toplam yakıt tüketimine dayanarak Scope 1 karbon emisyonunuzu (tCO2e) hesaplıyor musunuz?">
      <Textarea label="Hesaplama ve sonuç" value={data.q3_4_scope1Emisyon} onChange={(e) => onUpdate('q3_4_scope1Emisyon', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="3.5. Optimizasyon (Proje)" description="Sevkiyat rotalarınızı yakıt tüketimini en aza indirecek şekilde optimize eden bir yazılım (rota optimizasyonu) kullanıyor musunuz? Kullanmıyorsanız, bu konudaki fizibilite durumunuz nedir?">
      <Textarea label="Rota optimizasyon yazılımı kullanımı ve fizibilite durumu" value={data.q3_5_rotaOptimizasyonu} onChange={(e) => onUpdate('q3_5_rotaOptimizasyonu', e.target.value)} />
    </QuestionCard>
    <QuestionCard title="3.6. Satın Alma" description='Yeni araç alım politikanızda "yakıt verimliliği" veya "düşük emisyon" birincil bir kriter midir?'>
      <RadioGroup name="q3_6_satinAlmaPolitikasi" value={data.q3_6_satinAlmaPolitikasi} onChange={(val) => onUpdate('q3_6_satinAlmaPolitikasi', val)} options={yesNoOptions} />
    </QuestionCard>
  </div>
);

export const Section4: React.FC<SectionProps<SurveyData['section4']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="4.1. Yeşil Kurulum (Proje)" description="Müşteri mutfaklarını kurarken, enerji ve su verimliliği yüksek ekipmanları proaktif olarak teklif ediyor musunuz?">
            <RadioGroup name="q4_1_yesilKurulum" value={data.q4_1_yesilKurulum} onChange={(val) => onUpdate('q4_1_yesilKurulum', val)} options={yesNoOptions} />
            <Input label="Son 1 yılda bu şekilde kurulan mutfak sayısı/oranı nedir?" type="text" value={data.q4_1_kurulumOrani} onChange={(e) => onUpdate('q4_1_kurulumOrani', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="4.2. Ölçüm (Boşluk Analizi)" description="Müşteri tesislerindeki mutfak operasyonlarınızın tükettiği enerji (kWh) ve su (m³) miktarını, o tesisin toplam faturasından ayrıştırıp 'porsiyon başına' bazda takip edebiliyor musunuz?">
            <RadioGroup name="q4_2_olcumYapiliyorMu" value={data.q4_2_olcumYapiliyorMu} onChange={(val) => onUpdate('q4_2_olcumYapiliyorMu', val)} options={yesNoOptions} />
            <Textarea label="Bu konuda bir pilot çalışma yaptınız mı?" value={data.q4_2_pilotCalisma} onChange={(e) => onUpdate('q4_2_pilotCalisma', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="4.3. Verimlilik (Operasyon)" description="Yerinde üretim ekiplerinize enerji ve suyu verimli kullanma konusunda 2023-2024 yılı içinde verilen eğitimlerin tarihi, konusu ve katılımcı sayısı nedir?">
            <Textarea label="Verilen eğitimlerin detayları" value={data.q4_3_verimlilikEgitimleri} onChange={(e) => onUpdate('q4_3_verimlilikEgitimleri', e.target.value)} />
        </QuestionCard>
    </div>
);

export const Section5: React.FC<SectionProps<SurveyData['section5']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="5.1. Temel Metrik (KPI)" description="Şu anda firmanızda oluşan toplam gıda atığını (fire) aylık/yıllık olarak KİLO (kg) veya MALİYET (TL) bazında ölçüyor musunuz?">
            <RadioGroup name="q5_1_gidaAtigiOlcumu" value={data.q5_1_gidaAtigiOlcumu} onChange={(val) => onUpdate('q5_1_gidaAtigiOlcumu', val)} options={yesNoOptions} />
        </QuestionCard>
        <QuestionCard title="5.2. Ayrıştırma (Analiz)" description="Gıda atığını kaynaklarına göre aşağıdaki 3 kategoride ayrı ayrı takip ediyor musunuz? Lütfen son 3 ayın verilerini kg olarak girin:">
            <Input label="1. Mutfak Hazırlık Firesi (Sebze kabuğu, ayıklama vb.)" unit="kg" type="number" value={data.q5_2_mutfakHazirlikFiresi} onChange={(e) => onUpdate('q5_2_mutfakHazirlikFiresi', e.target.value)} />
            <Input label="2. Fazla Üretim Atığı (Pişip satılmayan/servis edilmeyen)" unit="kg" type="number" value={data.q5_2_fazlaUretimAtigi} onChange={(e) => onUpdate('q5_2_fazlaUretimAtigi', e.target.value)} />
            <Input label="3. Müşteri Tabağından Dönen Atık (Tabak artığı)" unit="kg" type="number" value={data.q5_2_tabakArtigi} onChange={(e) => onUpdate('q5_2_tabakArtigi', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="5.3. Modele Özgü Atık (Taşıma)" description='"Taşıma Yemek" modelinde "maksimum 2 saat" kuralı sonrası benmaride kalan ve tüketilmeyen yemekler hangi atık kategorisinde ölçülüyor ve miktarı nedir?'>
            <Textarea label="Atık kategorisi ve miktarı" value={data.q5_3_tasimaModeliAtik} onChange={(e) => onUpdate('q5_3_tasimaModeliAtik', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="5.4. Modele Özgü Atık (Yerinde)" description='"Yerinde Üretim" modelinde oluşan gıda atığı miktarını (kg) müşteriye aylık olarak raporluyor musunuz?'>
             <RadioGroup name="q5_4_yerindeUretimRaporlama" value={data.q5_4_yerindeUretimRaporlama} onChange={(val) => onUpdate('q5_4_yerindeUretimRaporlama', val)} options={yesNoOptions} />
        </QuestionCard>
        <QuestionCard title="5.5. Değerlendirme (Döngüsellik)" description="Atık olan gıdaları nasıl yönetiyorsunuz?">
            <Input label="Tüketilebilir durumdaki fazla üretim (Gıda Bankası / Sosyal yardım)" unit="kg/ay" type="number" value={data.q5_5_degerlendirmeGidaBankasi} onChange={(e) => onUpdate('q5_5_degerlendirmeGidaBankasi', e.target.value)} />
            <Input label="Hazırlık firesi (Kompost / Hayvan yemi)" unit="kg/ay" type="number" value={data.q5_5_degerlendirmeKompost} onChange={(e) => onUpdate('q5_5_degerlendirmeKompost', e.target.value)} />
            <Input label="Diğer (Çöpe gönderme / Bertaraf)" unit="kg/ay" type="number" value={data.q5_5_degerlendirmeBertaraf} onChange={(e) => onUpdate('q5_5_degerlendirmeBertaraf', e.target.value)} />
        </QuestionCard>
    </div>
);

export const Section6: React.FC<SectionProps<SurveyData['section6']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="6.1. Taşıma Modeli (Servis)" description='"Taşıma Yemek" modelinde müşteriye sunulan servis malzemelerinin malzeme tipine göre % dağılımı nedir?'>
            <Input label="Tek kullanımlık plastik (örn: PS, PP)" unit="%" type="number" value={data.q6_1_plastik} onChange={(e) => onUpdate('q6_1_plastik', e.target.value)} />
            <Input label="Tek kullanımlık köpük (EPS)" unit="%" type="number" value={data.q6_1_kopuk} onChange={(e) => onUpdate('q6_1_kopuk', e.target.value)} />
            <Input label="Tek kullanımlık biyo-çözünür/kompost edilebilir" unit="%" type="number" value={data.q6_1_bioCozunur} onChange={(e) => onUpdate('q6_1_bioCozunur', e.target.value)} />
            <Input label="Yıkanabilir (Porselen, metal - müşteri tarafından sağlanıyorsa)" unit="%" type="number" value={data.q6_1_yikanabilir} onChange={(e) => onUpdate('q6_1_yikanabilir', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="6.2. Yerinde Üretim Modeli (Servis)" description='"Yerinde Üretim" modelinde yıkanabilir (porselen/metal) servis ekipmanlarının kullanım oranı % kaçtır?'>
            <Input label="Kullanım Oranı" unit="%" type="number" value={data.q6_2_yerindeYikanabilirOrani} onChange={(e) => onUpdate('q6_2_yerindeYikanabilirOrani', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="6.3. Döngüsellik (Proje)" description="Tek kullanımlık plastiklere alternatif olarak yeniden kullanılabilir veya kompost edilebilir ambalaj alternatifleri için yapılmış bir maliyet-fayda analizi veya fizibilite çalışması var mı? Varsa sonucu nedir?">
            <Textarea label="Analiz/Fizibilite sonucu" value={data.q6_3_alternatifAmbalajAnalizi} onChange={(e) => onUpdate('q6_3_alternatifAmbalajAnalizi', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="6.4. Operasyonel Döngüsellik (Metrik)" description="Yeniden kullanılabilir termobox'ların temizlenmesi sürecinde harcanan ortalama su (Litre/termobox) ve enerji (kWh/termobox) miktarını ölçüyor musunuz?">
            <RadioGroup name="q6_4_termoboxTemizlikOlcumu" value={data.q6_4_termoboxTemizlikOlcumu} onChange={(val) => onUpdate('q6_4_termoboxTemizlikOlcumu', val)} options={yesNoOptions} />
        </QuestionCard>
    </div>
);

export const Section7: React.FC<SectionProps<SurveyData['section7']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="7.1. Yeşil Satın Alma" description='Tedarikçilerinizi değerlendirirken, sürdürülebilirlik kriterlerini içeren bir "Tedarikçi Değerlendirme Puan Kartınız" var mı?'>
            <RadioGroup name="q7_1_yesilSatinAlma" value={data.q7_1_yesilSatinAlma} onChange={(val) => onUpdate('q7_1_yesilSatinAlma', val)} options={yesNoOptions} />
        </QuestionCard>
        <QuestionCard title="7.2. Yerellik (Misyon)" description="Toplam hammadde alımınızın (TL veya kg bazında) yüzde kaçı yerel (local) üreticilerden temin edilmektedir?">
            <Input label="Yerel alım oranı" unit="%" type="number" value={data.q7_2_yerellikOrani} onChange={(e) => onUpdate('q7_2_yerellikOrani', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="7.3. Tedarikçi Denetimi" description="2023-2024 yılında sürdürülebilirlik konusunda denetlediğiniz veya eğitim verdiğiniz tedarikçi sayısı kaçtır?">
            <Input label="Denetlenen/Eğitilen Tedarikçi Sayısı" type="number" value={data.q7_3_tedarikciDenetimi} onChange={(e) => onUpdate('q7_3_tedarikciDenetimi', e.target.value)} />
        </QuestionCard>
    </div>
);

export const Section8: React.FC<SectionProps<SurveyData['section8']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="8.1. İSG Metrikleri (KPI)" description="Lütfen son 12 ayın İSG verilerini sağlayın:">
            <Input label="Toplam Çalışan Sayısı" type="number" value={data.q8_1_calisanSayisi} onChange={(e) => onUpdate('q8_1_calisanSayisi', e.target.value)} />
            <Input label="Toplam Çalışılan Adam-Saat" type="number" value={data.q8_1_toplamAdamSaat} onChange={(e) => onUpdate('q8_1_toplamAdamSaat', e.target.value)} />
            <Input label="Kayıp Zamanlı Kaza Sayısı" type="number" value={data.q8_1_kazaSayisi} onChange={(e) => onUpdate('q8_1_kazaSayisi', e.target.value)} />
            <Input label="Kaza Sıklık Oranı (LTIFR)" type="text" value={data.q8_1_kazaSiklikOrani} onChange={(e) => onUpdate('q8_1_kazaSiklikOrani', e.target.value)} />
            <Input label="Kişi Başı Ortalama İSG Eğitim Saati" type="number" value={data.q8_1_egitimSaati} onChange={(e) => onUpdate('q8_1_egitimSaati', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="8.2. Kültür (Boşluk Analizi)" description="Çalışanlarınızın psikolojik sağlığını ve kurumsal tükenmişlik (burnout) riskini ölçmek için son 12 ayda yaptığınız bir çalışma var mı?">
            <RadioGroup name="q8_2_psikolojikSaglikCalismasi" value={data.q8_2_psikolojikSaglikCalismasi} onChange={(val) => onUpdate('q8_2_psikolojikSaglikCalismasi', val)} options={yesNoOptions} />
        </QuestionCard>
        <QuestionCard title="8.3. Çalışan Bağlılığı (KPI)" description="Çalışan memnuniyet anketlerinizdeki katılım oranı (%) ve genel memnuniyet skoru (100 üzerinden) nedir?">
            <Input label="Katılım Oranı" unit="%" type="number" value={data.q8_3_memnuniyetKatilimOrani} onChange={(e) => onUpdate('q8_3_memnuniyetKatilimOrani', e.target.value)} />
            <Input label="Genel Memnuniyet Skoru" unit="/ 100" type="number" value={data.q8_3_memnuniyetSkoru} onChange={(e) => onUpdate('q8_3_memnuniyetSkoru', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="8.4. İş Gücü Devir Hızı (KPI)" description="Son 12 aydaki işten ayrılma oranınız (Turnover Rate) nedir?">
            <Input label="İşten Ayrılma Oranı" unit="%" type="number" value={data.q8_4_devirHizi} onChange={(e) => onUpdate('q8_4_devirHizi', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="8.5. Farkındalık (Proje)" description='Çalışanlara zorunlu eğitimler dışında, "gıda israfının önlenmesi", "enerji tasarrufu" veya "sürdürülebilirlik" konularında 2023-2024 yılında verdiğiniz eğitimlerin adı, tarihi ve katılımcı sayısı nedir?'>
            <Textarea label="Eğitim detayları" value={data.q8_5_farkindalikEgitimleri} onChange={(e) => onUpdate('q8_5_farkindalikEgitimleri', e.target.value)} />
        </QuestionCard>
    </div>
);

export const Section9: React.FC<SectionProps<SurveyData['section9']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="9.1. Toplumsal Katkı (Proje)" description='"Tüketilebilir durumdaki fazla gıdalar" için Gıda Bankaları veya diğer sosyal yardım kuruluşları ile imzalanmış resmi bir protokolünüz/iş birliğiniz var mı?'>
            <RadioGroup name="q9_1_gidaBankasiProtokolu" value={data.q9_1_gidaBankasiProtokolu} onChange={(val) => onUpdate('q9_1_gidaBankasiProtokolu', val)} options={yesNoOptions} />
            <Input label="Varsa, son 12 ayda bağışlanan gıda miktarı (kg veya porsiyon) nedir?" type="text" value={data.q9_1_bagislananGidaMiktari} onChange={(e) => onUpdate('q9_1_bagislananGidaMiktari', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="9.2. Sağlıklı Menü (Proje)" description='"Dengeli ve yeterli beslenen toplum" hedefinize yönelik menü planlamanız nasıl?'>
            <Input label="Bitki bazlı (plant-based) ana yemek seçeneklerinin toplam menüdeki oranı (%) nedir?" unit="%" type="number" value={data.q9_2_bitkiBazliMenuOrani} onChange={(e) => onUpdate('q9_2_bitkiBazliMenuOrani', e.target.value)} />
            <Label>Menülerde kalori, alerjen ve besin değeri bilgilerini proaktif olarak sunuyor musunuz?</Label>
            <RadioGroup name="q9_2_besinDegeriSunumu" value={data.q9_2_besinDegeriSunumu} onChange={(val) => onUpdate('q9_2_besinDegeriSunumu', val)} options={yesNoOptions} />
        </QuestionCard>
        <QuestionCard title="9.3. Sürdürülebilir Menü (Proje)" description='Menü planlaması yaparken, düşük karbon ayak izli menüleri müşterilerinize bir "sürdürülebilirlik seçeneği" olarak sunuyor musunuz?'>
            <RadioGroup name="q9_3_surdurulebilirMenuSunumu" value={data.q9_3_surdurulebilirMenuSunumu} onChange={(val) => onUpdate('q9_3_surdurulebilirMenuSunumu', val)} options={yesNoOptions} />
        </QuestionCard>
    </div>
);

export const Section10: React.FC<SectionProps<SurveyData['section10']>> = ({ data, onUpdate }) => (
    <div className="space-y-6">
        <QuestionCard title="10.1. Maliyet Verisi (TL)" description="Lütfen son 12 ayın toplam yıllık maliyetlerini belirtin:">
            <Input label="Toplam Enerji Maliyeti" unit="TL" type="number" value={data.q10_1_enerjiMaliyeti} onChange={(e) => onUpdate('q10_1_enerjiMaliyeti', e.target.value)} />
            <Input label="Toplam Su ve Atık Su Maliyeti" unit="TL" type="number" value={data.q10_1_suMaliyeti} onChange={(e) => onUpdate('q10_1_suMaliyeti', e.target.value)} />
            <Input label="Toplam Atık Bertaraf Maliyeti" unit="TL" type="number" value={data.q10_1_atikBertarafMaliyeti} onChange={(e) => onUpdate('q10_1_atikBertarafMaliyeti', e.target.value)} />
            <Input label="Toplam Lojistik Yakıt Maliyeti" unit="TL" type="number" value={data.q10_1_lojistikYakitMaliyeti} onChange={(e) => onUpdate('q10_1_lojistikYakitMaliyeti', e.target.value)} />
            <Input label="Toplam Ambalaj (Tek kullanımlık) Maliyeti" unit="TL" type="number" value={data.q10_1_ambalajMaliyeti} onChange={(e) => onUpdate('q10_1_ambalajMaliyeti', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="10.2. Tasarruf (Proje)" description="Son 2 yılda yaptığınız herhangi bir enerji/su verimliliği veya atık azaltma projesi sonucunda elde ettiğiniz doğrulanmış yıllık ekonomik tasarruf (TL) miktarı nedir?">
            <Input label="Yıllık Ekonomik Tasarruf" unit="TL" type="number" value={data.q10_2_tasarrufMiktari} onChange={(e) => onUpdate('q10_2_tasarrufMiktari', e.target.value)} />
        </QuestionCard>
        <QuestionCard title="10.3. Tahmini Kayıp (TL)" description="Gıda atığı miktarınızı ve hammadde maliyetlerinizi baz alarak, gıda atığının size olan tahmini yıllık maliyetini (TL) hesaplıyor musunuz?">
            <Textarea label="Gıda atığı maliyeti hesaplaması ve sonucu" value={data.q10_3_gidaAtigiMaliyeti} onChange={(e) => onUpdate('q10_3_gidaAtigiMaliyeti', e.target.value)} />
        </QuestionCard>
    </div>
);