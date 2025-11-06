
export interface SurveyData {
  section1: {
    q1_1_liderVarMi: string;
    q1_1_liderUnvan: string;
    q1_2_baglanti: string;
    q1_2_yatirimlar: string;
    q1_3_raporlama: string;
    q1_4_iso45001Gecis: string;
  };
  section2: {
    q2_1_dogalgaz: string;
    q2_1_elektrik: string;
    q2_1_fuelOil: string;
    q2_2_toplamPorsiyon: string;
    q2_2_porsiyonBasiEnerji: string;
    q2_3_suTuketimi: string;
    q2_4_porsiyonBasiSu: string;
    q2_5_atikSuYonetimi: string;
    q2_6_genelCop: string;
    q2_6_geriDonusum: string;
    q2_6_tehlikeliAtik: string;
    q2_7_geriKazanimOrani: string;
  };
  section3: {
    q3_1_aracSayisi: string;
    q3_1_aracDetaylari: string;
    q3_2_yakitTuketimi: string;
    q3_3_lojistikVerimlilik: string;
    q3_4_scope1Emisyon: string;
    q3_5_rotaOptimizasyonu: string;
    q3_6_satinAlmaPolitikasi: string;
  };
  section4: {
    q4_1_yesilKurulum: string;
    q4_1_kurulumOrani: string;
    q4_2_olcumYapiliyorMu: string;
    q4_2_pilotCalisma: string;
    q4_3_verimlilikEgitimleri: string;
  };
  section5: {
    q5_1_gidaAtigiOlcumu: string;
    q5_2_mutfakHazirlikFiresi: string;
    q5_2_fazlaUretimAtigi: string;
    q5_2_tabakArtigi: string;
    q5_3_tasimaModeliAtik: string;
    q5_4_yerindeUretimRaporlama: string;
    q5_5_degerlendirmeGidaBankasi: string;
    q5_5_degerlendirmeKompost: string;
    q5_5_degerlendirmeBertaraf: string;
  };
  section6: {
    q6_1_plastik: string;
    q6_1_kopuk: string;
    q6_1_bioCozunur: string;
    q6_1_yikanabilir: string;
    q6_2_yerindeYikanabilirOrani: string;
    q6_3_alternatifAmbalajAnalizi: string;
    q6_4_termoboxTemizlikOlcumu: string;
  };
  section7: {
    q7_1_yesilSatinAlma: string;
    q7_2_yerellikOrani: string;
    q7_3_tedarikciDenetimi: string;
  };
  section8: {
    q8_1_calisanSayisi: string;
    q8_1_toplamAdamSaat: string;
    q8_1_kazaSayisi: string;
    q8_1_kazaSiklikOrani: string;
    q8_1_egitimSaati: string;
    q8_2_psikolojikSaglikCalismasi: string;
    q8_3_memnuniyetKatilimOrani: string;
    q8_3_memnuniyetSkoru: string;
    q8_4_devirHizi: string;
    q8_5_farkindalikEgitimleri: string;
  };
  section9: {
    q9_1_gidaBankasiProtokolu: string;
    q9_1_bagislananGidaMiktari: string;
    q9_2_bitkiBazliMenuOrani: string;
    q9_2_besinDegeriSunumu: string;
    q9_3_surdurulebilirMenuSunumu: string;
  };
  section10: {
    q10_1_enerjiMaliyeti: string;
    q10_1_suMaliyeti: string;
    q10_1_atikBertarafMaliyeti: string;
    q10_1_lojistikYakitMaliyeti: string;
    q10_1_ambalajMaliyeti: string;
    q10_2_tasarrufMiktari: string;
    q10_3_gidaAtigiMaliyeti: string;
  };
}

export interface Submission {
  id: string;
  submissionDate: string;
  surveyData: SurveyData;
  report: string | null;
}
