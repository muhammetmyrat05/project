export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface Answer {
  questionId: number;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'Endüstriyel robotların en yaygın kullanım alanı nedir?',
    options: {
      A: 'Eğlence sektörü',
      B: 'Üretim ve montaj',
      C: 'Tarım',
      D: 'Eğitim'
    }
  },
  {
    id: 2,
    question: 'Robot manipülatörünün hareketli parçalarına ne denir?',
    options: {
      A: 'Eksenler',
      B: 'Bağlantılar',
      C: 'Mafsallar',
      D: 'Motorlar'
    }
  },
  {
    id: 3,
    question: 'PLC sisteminde kullanılan en yaygın programlama dili hangisidir?',
    options: {
      A: 'Python',
      B: 'Ladder Logic',
      C: 'Java',
      D: 'C++'
    }
  },
  {
    id: 4,
    question: 'Sensörlerin görevi nedir?',
    options: {
      A: 'Enerji üretmek',
      B: 'Çevresel verileri algılamak',
      C: 'Motor kontrol etmek',
      D: 'Işık yaymak'
    }
  },
  {
    id: 5,
    question: 'SCADA sistemleri ne için kullanılır?',
    options: {
      A: 'Oyun geliştirme',
      B: 'Web tasarımı',
      C: 'Endüstriyel süreç kontrolü ve izleme',
      D: 'Grafik tasarımı'
    }
  },
  {
    id: 6,
    question: 'Servo motor ile step motor arasındaki temel fark nedir?',
    options: {
      A: 'Renk',
      B: 'Geri besleme mekanizması',
      C: 'Boyut',
      D: 'Fiyat'
    }
  },
  {
    id: 7,
    question: 'Endüstri 4.0 kavramı neyi ifade eder?',
    options: {
      A: 'Dördüncü sanayi devrimi',
      B: 'Dört tip robot',
      C: 'Dört aşamalı üretim',
      D: 'Dört sensör sistemi'
    }
  },
  {
    id: 8,
    question: 'Otomasyon sistemlerinde PID kontrolörün görevi nedir?',
    options: {
      A: 'Veri depolamak',
      B: 'Hata düzeltme ve sistem kontrolü',
      C: 'Güvenlik sağlamak',
      D: 'İletişim kurmak'
    }
  },
  {
    id: 9,
    question: 'HMI (Human Machine Interface) nedir?',
    options: {
      A: 'Bir robot türü',
      B: 'İnsan-makine arayüzü',
      C: 'Bir sensör tipi',
      D: 'Bir motor çeşidi'
    }
  },
  {
    id: 10,
    question: 'Robotların çalışma alanına ne ad verilir?',
    options: {
      A: 'Çalışma masası',
      B: 'Hareket alanı',
      C: 'Çalışma zarfı (envelope)',
      D: 'Robot alanı'
    }
  }
];

export const correctAnswers: Answer[] = [
  { questionId: 1, correctAnswer: 'B' },
  { questionId: 2, correctAnswer: 'B' },
  { questionId: 3, correctAnswer: 'B' },
  { questionId: 4, correctAnswer: 'B' },
  { questionId: 5, correctAnswer: 'C' },
  { questionId: 6, correctAnswer: 'B' },
  { questionId: 7, correctAnswer: 'A' },
  { questionId: 8, correctAnswer: 'B' },
  { questionId: 9, correctAnswer: 'B' },
  { questionId: 10, correctAnswer: 'C' }
];
