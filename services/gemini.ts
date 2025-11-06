import { GoogleGenAI } from '@google/genai';
import { SurveyData } from '../types';

export async function generateSustainabilityReport(data: SurveyData): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const formatData = (sectionData: object) => {
    return Object.entries(sectionData)
      .filter(([, value]) => value !== '' && value !== null && value !== undefined)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n') || 'Bu bölümde veri girilmemiş.';
  };


  const prompt = `
    **Özel Rol ve Görev Tanımı:**
    Sen, Türkiye'deki sürdürülebilirlik ve ESG danışmanlığı alanında en saygın uzmanlardan birisin. "ÖRNEK YEMEK SANAYİ" adlı bir catering firmasının yönetim kuruluna sunulmak üzere, aşağıda verileri sunulan anket sonuçlarına dayanarak detaylı, veri odaklı ve eyleme geçirilebilir bir "Sürdürülebilirlik Olgunluk Analizi ve Stratejik Yol Haritası" hazırlıyorsun.

    **Hedef Kitle:** Firmanın CEO'su ve Yönetim Kurulu. Bu nedenle, raporun dili stratejik, profesyonel ve ikna edici olmalıdır. Teknik detaylar, işletme üzerindeki finansal ve itibari etkileriyle birlikte sunulmalıdır.

    **Zorunlu Format:** Çıktı, Markdown formatında olmalıdır. Başlıklar, alt başlıklar, listeler ve vurgular için Markdown sözdizimini etkili bir şekilde kullan.

    **Analiz Edilecek Ham Veriler:**
    ---
    ### BÖLÜM 1: YÖNETİŞİM ('G') VE STRATEJİK UYUM
    ${formatData(data.section1)}
    ---
    ### BÖLÜM 2: ÇEVRESEL ('E') PERFORMANS: MERKEZİ TESİS
    ${formatData(data.section2)}
    ---
    ### BÖLÜM 3: ÇEVRESEL ('E') PERFORMANS: LOJİSTİK VE FİLO
    ${formatData(data.section3)}
    ---
    ### BÖLÜM 4: ÇEVRESEL ('E') PERFORMANS: YERİNDE ÜRETİM MODELLERİ
    ${formatData(data.section4)}
    ---
    ### BÖLÜM 5: GIDA ATIĞI YÖNETİMİ
    ${formatData(data.section5)}
    ---
    ### BÖLÜM 6: AMBALAJ VE DÖNGÜSEL EKONOMİ
    ${formatData(data.section6)}
    ---
    ### BÖLÜM 7: SÜRDÜRÜLEBİLİR TEDARİK ZİNCİRİ
    ${formatData(data.section7)}
    ---
    ### BÖLÜM 8: SOSYAL ('S') PERFORMANS: ÇALIŞANLAR VE KÜLTÜR
    ${formatData(data.section8)}
    ---
    ### BÖLÜM 9: SOSYAL ('S') PERFORMANS: TOPLUM VE MÜŞTERİ
    ${formatData(data.section9)}
    ---
    ### BÖLÜM 10: EKONOMİK ÖLÇÜMLER VE SENTEZ
    ${formatData(data.section10)}
    ---

    **RAPOR YAPISI (Bu yapıya harfiyen uyulmalıdır):**

    # Sürdürülebilirlik Olgunluk Analizi ve Stratejik Yol Haritası: ÖRNEK YEMEK SANAYİ

    ## 1. Yönetici Özeti ve Mevcut Olgunluk Seviyesi
    *   Firmanın mevcut sürdürülebilirlik performansının genel bir özetini sun.
    *   Verilen anket verilerine dayanarak, firmayı şu olgunluk seviyelerinden birine yerleştir: **'Reaktif/Uyum Odaklı', 'Proaktif/Verimlilik Odaklı', 'Stratejik/İnovasyon Odaklı', 'Lider/Dönüştürücü'**.
    *   Bu seviyeyi neden seçtiğini, anketten **spesifik veri noktalarına** atıfta bulunarak (örneğin, "Gıda atığı ölçümünün yapılmaması (Bölüm 5) ve sürdürülebilirlik liderinin olmaması (Bölüm 1) nedeniyle firma 'Reaktif' seviyededir.") gerekçelendir.

    ## 2. Stratejik Değerlendirme: Güçlü Yönler
    Anket verilerinden yola çıkarak şirketin en belirgin 3-5 güçlü yönünü madde madde listele. Her madde için, bu durumun neden bir güç olduğunu ve şirkete ne gibi avantajlar sağladığını (örneğin, maliyet tasarrufu, marka itibarı, risk azaltımı) belirt.
    *   **Örnek:** **Güçlü Yerel Tedarik Zinciri:** "Bölüm 7'deki %XX'lik yerel alım oranı, sadece 'Türk mutfağı' misyonunu desteklemekle kalmaz, aynı zamanda karbon ayak izini düşürür ve yerel ekonomiye katkı sağlar."

    ## 3. Stratejik Değerlendirme: Öncelikli Gelişim Alanları
    Anket verilerindeki eksikliklere veya zayıf performansa dayanarak, en kritik 3-5 gelişim alanını madde madde listele. Her madde için, bu eksikliğin şirket için oluşturduğu **riski** (finansal, operasyonel, itibar) açıkla.
    *   **Örnek:** **Sistematik Gıda Atığı Ölçümünün Eksikliği:** "Bölüm 5'te gıda atığı ölçümünün yapılmadığı belirtiliyor. Bu durum, Bölüm 10'da görülebilecek önemli maliyet kayıplarına ve çevresel etkiye yol açmaktadır."

    ## 4. Kapsamlı ESG Analizi ve Eylem Planı
    Her bir ESG başlığı altında, anket verilerini kullanarak derinlemesine bir analiz yap ve **SMART** (Spesifik, Ölçülebilir, Ulaşılabilir, İlgili, Zaman-bağlı) hedeflere yönelik eylem önerileri sun.

    ### **Yönetişim (G) Analizi**
    *   **Mevcut Durum:** Stratejik entegrasyon, liderlik ve raporlama konularındaki mevcut durumu verilerle özetle (Bölüm 1).
    *   **Eylem Önerileri:**
        *   **Öneri 1:** (Örn: 3 ay içinde Sürdürülebilirlik Lideri atanması ve görev tanımının oluşturulması.)
        *   **Öneri 2:** (Örn: 6 ay içinde ESG metriklerinin üst yönetim toplantı gündemine entegre edilmesi.)

    ### **Çevresel (E) Analizi**
    *   **Mevcut Durum:** Enerji ve su verimliliği (kWh/porsiyon), atık yönetimi (geri kazanım oranı %), lojistik emisyonları ve ambalaj kullanımı gibi kilit metrikleri verileriyle analiz et (Bölüm 2, 3, 4, 5, 6). Bölüm 10'daki maliyet verileriyle bu metrikler arasında bağlantı kur.
    *   **Eylem Önerileri:**
        *   **Öneri 1:** (Örn: 6 ay içinde, en yüksek enerji tüketimine sahip 5 merkezi tesis ekipmanı için bir verimlilik denetimi yapılması ve %15'lik bir azaltım hedefi konulması.)
        *   **Öneri 2:** (Örn: 'Fazla Üretim Atığı'nı (Bölüm 5) 12 ay içinde %20 azaltmak için talep tahmin sisteminin iyileştirilmesi.)
        *   **Öneri 3:** (Örn: Tek kullanımlık plastik ambalaj oranını (Bölüm 6) 24 ay içinde %50 azaltmak amacıyla kompostlanabilir alternatifler için tedarikçi görüşmelerine başlanması.)

    ### **Sosyal (S) Analizi**
    *   **Mevcut Durum:** İSG performansı (Kaza Sıklık Oranı), çalışan bağlılığı (memnuniyet skoru), tedarikçi denetimi ve toplumsal katkı (gıda bağışı) gibi konuları verilerle değerlendir (Bölüm 7, 8, 9).
    *   **Eylem Önerileri:**
        *   **Öneri 1:** (Örn: ISO 45001 geçiş planını (Bölüm 1) 12 ay içinde tamamlayarak sertifikasyon sürecini başlatmak.)
        *   **Öneri 2:** (Örn: Gıda bankası protokolü olmayan (Bölüm 9) şubeler için 6 ay içinde yerel gıda bankalarıyla temas kurulması ve bağış sürecinin standartlaştırılması.)

    ## 5. Sonuç ve Stratejik Yol Haritası
    *   Raporun ana bulgularını özetle.
    *   Aşağıdaki zaman dilimlerine göre önceliklendirilmiş bir yol haritası sun. **'Faz' gibi genel ifadeler kullanma.**
    *   **Kısa Vade (0-6 Ay):** En acil ve hızlı kazanım sağlayacak 2-3 eylemi belirt. (Örn: Gıda atığı ölçüm sisteminin kurulması, sürdürülebilirlik liderinin atanması).
    *   **Orta Vade (6-18 Ay):** Daha kapsamlı projeleri ve politika değişikliklerini içeren 2-3 eylemi belirt. (Örn: Tedarikçi sürdürülebilirlik değerlendirme politikasının devreye alınması, enerji verimliliği yatırımlarının başlaması).
    *   **Uzun Vade (18+ Ay):** Şirketin sürdürülebilirlik liderliğine ulaşmasını sağlayacak dönüştürücü 2-3 eylemi belirt. (Örn: Bilime Dayalı Hedefler belirleyerek net-sıfır emisyon taahhüdü verilmesi, tüm filonun elektrikli araçlara dönüştürülmesi için plan yapılması).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
  });

  return response.text;
}
