import React, { useState, useEffect } from "react";
import { 
  Shield, 
  MapPin, 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Settings, 
  Plus, 
  CheckCircle, 
  Calendar, 
  Check, 
  Trash2, 
  Compass, 
  User, 
  Activity, 
  X,
  Play,
  RotateCcw,
  BookMarked,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ESTADOS_BRASIL, 
  CONCURSOS_INICIAIS, 
  LEVELS, 
  PATENTES_POLICIAIS, 
  DAILY_MISSIONS, 
  getMotivationalMessage, 
  getAreaColors, 
  Contest, 
  StateInfo, 
  Subject 
} from "./data";

// Predefined quiz question templates based on common subjects to give the user a high-fidelity interactive simulator
interface QuizQuestion {
  id: string;
  subject: string;
  topic: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    subject: "Língua Portuguesa",
    topic: "Leitura e interpretação de textos",
    text: "Em relação à coesão textual, assinale a opção em que o pronome relativo em destaque exerce função de objeto direto:",
    options: [
      "O policial penal cujo nome foi citado apresentou o relatório.",
      "A viatura de patrulhamento que compramos ontem possui blindagem nível III-A.",
      "Esta é a delegacia na qual prestaremos depoimento.",
      "O edital do concurso ao qual nos referimos foi publicado na semana passada."
    ],
    correctAnswer: 1,
    explanation: "Na alternativa B, 'que' retoma 'A viatura de patrulhamento' e funciona como objeto direto do verbo comprar ('compramos a viatura')."
  },
  {
    id: "q2",
    subject: "Direito Penal",
    topic: "Teoria do crime (fato típico, ilícito e culpável)",
    text: "O agente policial que, no estrito cumprimento do dever legal, efetua a prisão de um foragido em flagrante delito, atua amparado por:",
    options: [
      "Uma causa de exclusão da ilicitude.",
      "Uma causa de exclusão da tipicidade penal.",
      "Uma causa de exclusão da culpabilidade por inexigibilidade de conduta diversa.",
      "Uma mera isenção de pena regulamentada pelo juiz criminal."
    ],
    correctAnswer: 0,
    explanation: "O estrito cumprimento do dever legal é uma das causas excludentes de ilicitude (ou causas de exclusão de antijuridicidade), previstas no Art. 23, III do Código Penal."
  },
  {
    id: "q3",
    subject: "Lei de Execução Penal (LEP)",
    topic: "Dos deveres e direitos do preso",
    text: "Segundo a Lei de Execução Penal (Lei nº 7.210/84), constitui direito do preso, EXCETO:",
    options: [
      "Alimentação suficiente, vestuário e atribuição de trabalho remunerado.",
      "Proporcionalidade na distribuição do tempo para o trabalho, descanso e recreação.",
      "Liberdade de locomoção irrestrita dentro do pavilhão de segurança máxima durante o período noturno.",
      "Representação e petição a qualquer autoridade, em defesa de direito."
    ],
    correctAnswer: 2,
    explanation: "A liberdade de locomoção irrestrita noturna em pavilhão de segurança máxima é incompatível com as regras disciplinares e a custódia segura, não sendo um direito do preso."
  },
  {
    id: "q4",
    subject: "Direito Constitucional",
    topic: "Da segurança pública (Art. 144)",
    text: "Nos termos da Constituição Federal de 1988, as Polícias Penais (Federal, Estaduais e Distrital) estão inseridas no rol de órgãos responsáveis pela segurança pública. Assinale a alternativa correta sobre sua atribuição constitucional:",
    options: [
      "Destinam-se ao patrulhamento ostensivo das rodovias federais e estaduais.",
      "Incumbe-lhes a segurança dos estabelecimentos penais.",
      "Exercem com exclusividade as funções de polícia judiciária do Estado.",
      "Atuam primordialmente na apuração de infrações penais militares."
    ],
    correctAnswer: 1,
    explanation: "O Art. 144, § 5º-A da CF/88 estabelece que às polícias penais, vinculadas ao órgão administrador do sistema penal da unidade federativa a que pertencem, cabe a segurança dos estabelecimentos penais."
  },
  {
    id: "q5",
    subject: "Direito Administrativo",
    topic: "Atos administrativos: requisitos e atributos",
    text: "Dentre os atributos dos atos administrativos, aquele que confere a prerrogativa de impor obrigações unilaterais aos administrados, sem necessidade de concordância prévia, denomina-se:",
    options: [
      "Autoexecutoriedade",
      "Tipicidade",
      "Presunção de Legitimidade",
      "Imperatividade"
    ],
    correctAnswer: 3,
    explanation: "A imperatividade é o atributo pelo qual os atos administrativos se impõem a terceiros independentemente de sua concordância."
  },
  {
    id: "q6",
    subject: "Raciocínio Lógico-Matemático",
    topic: "Lógica proposicional",
    text: "Considere a proposição lógica P: 'Se o agente treina, então a missão é concluída'. Assinale a alternativa que apresenta uma proposição equivalente a P:",
    options: [
      "Se a missão não é concluída, então o agente não treinou.",
      "Se o agente não treinou, então a missão não é concluída.",
      "O agente treinou e a missão foi concluída.",
      "Se a missão foi concluída, então o agente treinou."
    ],
    correctAnswer: 0,
    explanation: "A condicional 'Se A, então B' é equivalente à sua contrapositiva 'Se não B, então não A'."
  },
  {
    id: "q7",
    subject: "Direito Penal Militar",
    topic: "Dos crimes contra a autoridade ou disciplina militar (Insubordinação, motim, revolta)",
    text: "O crime militar de 'revolta' (Art. 149, parágrafo único do Código Penal Militar) diferencia-se essencialmente do crime de 'motim' pelo seguinte fator circunstancial:",
    options: [
      "Presença de civis incitando a tropa em praça pública.",
      "Prática do ato por oficiais de patente superior contra cadetes.",
      "Estar os agentes armados ou portando armamento da instituição.",
      "Prática exclusiva em período de guerra declarada pelo Presidente."
    ],
    correctAnswer: 2,
    explanation: "O motim qualifica-se como revolta quando os militares agem armados (Art. 149, parágrafo único do CPM)."
  },
  {
    id: "q8",
    subject: "Legislação de Trânsito",
    topic: "Código de Trânsito Brasileiro (CTB)",
    text: "De acordo com o Código de Trânsito Brasileiro, dirigir sob a influência de álcool ou de qualquer outra substância psicoativa que determine dependência constitui infração de natureza:",
    options: [
      "Grave, acarretando multa simples.",
      "Gravíssima, punida com multa multiplicada por 10 e suspensão do direito de dirigir por 12 meses.",
      "Média, sujeita à advertência verbal pelo agente de trânsito.",
      "Grave, com apreensão imediata da Carteira Nacional de Habilitação sem direito a contraditório."
    ],
    correctAnswer: 1,
    explanation: "O artigo 165 do CTB define a infração de dirigir sob efeito de álcool como gravíssima, com fator multiplicador de 10x na multa e suspensão do direito de dirigir por 12 meses."
  }
];

export default function App() {
  // Navigation / Tabs State
  const [activeTab, setActiveTab] = useState<"dashboard" | "schedule" | "quiz" | "errors" | "reports">("dashboard");

  // User Core State (Persisted in localStorage)
  const [candidateName, setCandidateName] = useState<string>("");
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [consecutiveDays, setConsecutiveDays] = useState<number>(1);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Preset profile loader for quick preview (Já tenho perfil)
  const handleLoadPresetProfile = () => {
    const defaultState = ESTADOS_BRASIL.find(s => s.uf === "BR") || ESTADOS_BRASIL[0];
    const defaultContest = CONCURSOS_INICIAIS.find(c => c.id === "prf") || CONCURSOS_INICIAIS[0];
    
    setCandidateName("Operador Elite");
    setSelectedState(defaultState);
    setSelectedContest(defaultContest);
    setXp(1240); // Nice preset level
    setConsecutiveDays(5); // Active streak
    
    const todayStr = new Date().toLocaleDateString("pt-BR");
    const yesterdayStr = new Date(Date.now() - 86400000).toLocaleDateString("pt-BR");
    
    const initialLogs = [
      {
        id: "log-1",
        date: yesterdayStr,
        subject: "Direito Penal",
        hours: 2.0,
        notes: "Teoria do crime e estrito cumprimento do dever legal.",
        xp: 160
      },
      {
        id: "log-2",
        date: todayStr,
        subject: "Direito Constitucional",
        hours: 1.5,
        notes: "Artigo 144 da CF/88 e segurança pública.",
        xp: 120
      }
    ];
    setStudyLogs(initialLogs);
    
    const initialQuestions = [
      {
        id: "qlog-1",
        date: yesterdayStr,
        subject: "Direito Penal",
        topic: "Teoria do crime (fato típico, ilícito e culpável)",
        correct: 14,
        wrong: 4,
        xp: 140
      },
      {
        id: "qlog-2",
        date: todayStr,
        subject: "Direito Constitucional",
        topic: "Da segurança pública (Art. 144)",
        correct: 18,
        wrong: 2,
        xp: 180
      }
    ];
    setQuestionsHistory(initialQuestions);
    
    setErrorBook([
      {
        id: "err-1",
        date: yesterdayStr,
        subject: "Direito Penal",
        topic: "Exclusão de Ilicitude",
        questionText: "O agente policial que, no estrito cumprimento do dever legal, atua amparado por uma causa de exclusão da ilicitude...",
        selectedAnswer: "Uma causa de exclusão da culpabilidade",
        correctAnswer: "Uma causa de exclusão da ilicitude",
        status: "Pendente"
      }
    ]);

    setShowWelcome(false);
  };

  // Lists of records
  const [studyLogs, setStudyLogs] = useState<Array<{
    id: string;
    date: string;
    subject: string;
    hours: number;
    notes: string;
    xp: number;
  }>>([]);

  const [questionLogs, setQuestionsHistory] = useState<Array<{
    id: string;
    date: string;
    subject: string;
    topic: string;
    correct: number;
    wrong: number;
    xp: number;
  }>>([]);

  const [errorBook, setErrorBook] = useState<Array<{
    id: string;
    subject: string;
    topic: string;
    notes: string;
    status: "Pendente" | "Revisado";
    date: string;
    nextReviewDate: string;
  }>>([]);

  // Onboarding UI state
  const [onboardingName, setOnboardingName] = useState<string>("");
  const [onboardingRegionFilter, setOnboardingRegionFilter] = useState<string>("Todos");
  const [tempSelectedState, setTempSelectedState] = useState<StateInfo | null>(null);

  // Schedule Builder input state
  const [weeklyHoursBudget, setWeeklyHoursBudget] = useState<number>(20);
  const [examDate, setExamDate] = useState<string>("");
  const [customSchedule, setCustomSchedule] = useState<Array<{
    id: string;
    day: string;
    subject: string;
    duration: number;
    completed: boolean;
  }>>([]);

  // Study log input state
  const [logSubject, setLogSubject] = useState<string>("");
  const [logHours, setLogHours] = useState<number>(1);
  const [logNotes, setLogNotes] = useState<string>("");

  // External Questions manual logger input state
  const [manualSubject, setManualSubject] = useState<string>("");
  const [manualTopic, setManualTopic] = useState<string>("");
  const [manualCorrect, setManualCorrect] = useState<number>(10);
  const [manualWrong, setManualWrong] = useState<number>(2);

  // Interactive Quiz State
  const [quizSubject, setQuizSubject] = useState<string>("");
  const [quizTopic, setQuizTopic] = useState<string>("");
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState<number>(0);
  const [quizTotalCount, setQuizTotalCount] = useState<number>(0);

  // Built-in stopwatch/study timer state
  const [timerRunning, setRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(3000); // Default 50 mins (50 * 60)
  const [timerMaxSeconds, setTimerMaxSeconds] = useState<number>(3000);
  const [timerSubject, setTimerSubject] = useState<string>("");
  const [timerType, setTimerType] = useState<"focus" | "break">("focus");

  // Load state from localstorage on start
  useEffect(() => {
    try {
      const savedName = localStorage.getItem("pq_candidate_name");
      const savedState = localStorage.getItem("pq_selected_state");
      const savedContest = localStorage.getItem("pq_selected_contest");
      const savedXp = localStorage.getItem("pq_xp");
      const savedDays = localStorage.getItem("pq_consecutive_days");
      const savedStudyLogs = localStorage.getItem("pq_study_logs");
      const savedQuestionLogs = localStorage.getItem("pq_question_logs");
      const savedErrorBook = localStorage.getItem("pq_error_book");
      const savedSchedule = localStorage.getItem("pq_custom_schedule");
      const savedWeeklyHours = localStorage.getItem("pq_weekly_hours");
      const savedExamDate = localStorage.getItem("pq_exam_date");

       if (savedName) setCandidateName(savedName);
      if (savedState) setSelectedState(JSON.parse(savedState));
      if (savedContest) setSelectedContest(JSON.parse(savedContest));
      if (savedName && savedState) setShowWelcome(false);
      if (savedXp) setXp(Number(savedXp));
      if (savedDays) setConsecutiveDays(Number(savedDays));
      if (savedStudyLogs) setStudyLogs(JSON.parse(savedStudyLogs));
      if (savedQuestionLogs) setQuestionsHistory(JSON.parse(savedQuestionLogs));
      if (savedErrorBook) setErrorBook(JSON.parse(savedErrorBook));
      if (savedSchedule) setCustomSchedule(JSON.parse(savedSchedule));
      if (savedWeeklyHours) setWeeklyHoursBudget(Number(savedWeeklyHours));
      if (savedExamDate) setExamDate(savedExamDate);
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
    setHistoryLoaded(true);
  }, []);

  // Save changes to localstorage when states update
  useEffect(() => {
    if (!historyLoaded) return;
    localStorage.setItem("pq_candidate_name", candidateName);
    localStorage.setItem("pq_selected_state", selectedState ? JSON.stringify(selectedState) : "");
    localStorage.setItem("pq_selected_contest", selectedContest ? JSON.stringify(selectedContest) : "");
    localStorage.setItem("pq_xp", String(xp));
    localStorage.setItem("pq_consecutive_days", String(consecutiveDays));
    localStorage.setItem("pq_study_logs", JSON.stringify(studyLogs));
    localStorage.setItem("pq_question_logs", JSON.stringify(questionLogs));
    localStorage.setItem("pq_error_book", JSON.stringify(errorBook));
    localStorage.setItem("pq_custom_schedule", JSON.stringify(customSchedule));
    localStorage.setItem("pq_weekly_hours", String(weeklyHoursBudget));
    localStorage.setItem("pq_exam_date", examDate);
  }, [candidateName, selectedState, selectedContest, xp, consecutiveDays, studyLogs, questionLogs, errorBook, customSchedule, weeklyHoursBudget, examDate, historyLoaded]);

  // Handle study timer interval
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setRunning(false);
            clearInterval(interval);
            // Handle phase completion
            if (timerType === "focus") {
              const gainedXp = 80;
              setXp((x) => x + gainedXp);
              // log study block
              const studySubjectName = timerSubject || selectedContest?.disciplinas[0]?.nome || "Estudos Gerais";
              const dateStr = new Date().toLocaleDateString("pt-BR");
              const minutes = Math.round(timerMaxSeconds / 60);

              const newLog = {
                id: Date.now().toString(),
                date: dateStr,
                subject: studySubjectName,
                hours: minutes / 60,
                notes: `Bloco de foco inteligente concluído pelo cronômetro integrado.`,
                xp: gainedXp
              };
              setStudyLogs((prevLogs) => [newLog, ...prevLogs]);

              alert(`Fim do Bloco de Foco! Você completou ${minutes} minutos em ${studySubjectName} e ganhou +${gainedXp} XP!`);
              
              // Toggle to break
              setTimerType("break");
              setTimerSeconds(10 * 60); // 10 minutes default break
              setTimerMaxSeconds(10 * 60);
            } else {
              alert("O intervalo acabou! Prepare-se para focar novamente.");
              setTimerType("focus");
              setTimerSeconds(50 * 60); // Back to 50 minutes
              setTimerMaxSeconds(50 * 60);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerType, timerSubject, timerMaxSeconds, selectedContest]);

  // Reset all state to restart the app
  const handleResetApp = () => {
    if (confirm("Atenção: Todos os seus registros, simulados, cronograma e XP acumulados serão excluídos permanentemente. Deseja continuar?")) {
      setCandidateName("");
      setSelectedState(null);
      setSelectedContest(null);
      setXp(0);
      setConsecutiveDays(1);
      setStudyLogs([]);
      setQuestionsHistory([]);
      setErrorBook([]);
      setCustomSchedule([]);
      setWeeklyHoursBudget(20);
      setExamDate("");
      setOnboardingName("");
      setTempSelectedState(null);
      setActiveTab("dashboard");
      setRunning(false);
      setShowWelcome(true);
      localStorage.clear();
    }
  };

  // Onboarding Submission
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingName.trim()) {
      alert("Por favor, digite seu nome ou pseudônimo de candidato.");
      return;
    }
    if (!tempSelectedState) {
      alert("Por favor, escolha um Estado de preparação para listar os editais.");
      return;
    }
    setCandidateName(onboardingName.trim());
    setSelectedState(tempSelectedState);
  };

  const handleSelectContest = (contest: Contest) => {
    setSelectedContest(contest);
    // Auto populate initial values
    if (contest.disciplinas.length > 0) {
      setLogSubject(contest.disciplinas[0].nome);
      setQuizSubject(contest.disciplinas[0].nome);
      if (contest.disciplinas[0].topicos.length > 0) {
        setQuizTopic(contest.disciplinas[0].topicos[0]);
      }
    }
    // Generate initial weekly schedule for 20 hours default
    generateWeeklySchedule(contest, weeklyHoursBudget);
  };

  // Weekly Schedule Generator based on priority weighting
  const generateWeeklySchedule = (contest: Contest, totalHours: number) => {
    const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const schedule: Array<{
      id: string;
      day: string;
      subject: string;
      duration: number;
      completed: boolean;
    }> = [];

    const disciplines = contest.disciplinas;
    if (!disciplines.length) return;

    // Weight mapped based on priority
    const priorityWeights: Record<string, number> = {
      "Muito Alta": 4,
      "Alta": 3,
      "Média": 2,
      "Baixa": 1
    };

    // Calculate total weights
    const totalWeight = disciplines.reduce((sum, d) => sum + (priorityWeights[d.prioridade] || 2), 0);
    
    // Distribute hours to subjects
    let blockIdCounter = 1;
    let distributedBlocksCount = 0;
    const targetBlocksTotal = Math.max(7, Math.round(totalHours)); // 1 block = 1 hour ideally

    const subjectBlockAllocations = disciplines.map((d) => {
      const weight = priorityWeights[d.prioridade] || 2;
      const share = weight / totalWeight;
      const blocksCount = Math.max(1, Math.round(share * targetBlocksTotal));
      return {
        name: d.nome,
        blocks: blocksCount
      };
    });

    // Flatten blocks
    const studyPool: string[] = [];
    subjectBlockAllocations.forEach((alloc) => {
      for (let i = 0; i < alloc.blocks; i++) {
        studyPool.push(alloc.name);
      }
    });

    // Populate day-by-day
    daysOfWeek.forEach((day, index) => {
      // Allocate blocks for this day
      const blocksPerDay = Math.ceil(studyPool.length / 7);
      const daySubjects = studyPool.slice(index * blocksPerDay, (index + 1) * blocksPerDay);

      daySubjects.forEach((subject) => {
        schedule.push({
          id: `block-${blockIdCounter++}`,
          day,
          subject,
          duration: 50, // 50 mins focus block
          completed: false
        });
      });
    });

    setCustomSchedule(schedule);
  };

  // Re-generate schedule handler
  const handleUpdateScheduleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContest) return;
    generateWeeklySchedule(selectedContest, weeklyHoursBudget);
    alert("Seu cronograma de estudos tático foi gerado com sucesso com base nas prioridades de peso do edital!");
  };

  // Toggle custom schedule block completed
  const handleToggleBlock = (blockId: string) => {
    setCustomSchedule((prev) => 
      prev.map((block) => {
        if (block.id === blockId) {
          const nextState = !block.completed;
          if (nextState) {
            // Reward XP for completing block
            setXp((prevXp) => prevXp + 60);
            // Log study session automatically
            const dateStr = new Date().toLocaleDateString("pt-BR");
            setStudyLogs((prevLogs) => [
              {
                id: Date.now().toString(),
                date: dateStr,
                subject: block.subject,
                hours: 50 / 60,
                notes: "Bloco de cronograma sugerido concluído.",
                xp: 60
              },
              ...prevLogs
            ]);
          } else {
            // Refund XP
            setXp((prevXp) => Math.max(0, prevXp - 60));
          }
          return { ...block, completed: nextState };
        }
        return block;
      })
    );
  };

  // Study log manual submission
  const handleAddStudyLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logSubject) {
      alert("Por favor, selecione uma disciplina.");
      return;
    }
    const earnedXp = Math.round(logHours * 100);
    const dateStr = new Date().toLocaleDateString("pt-BR");

    const newLog = {
      id: Date.now().toString(),
      date: dateStr,
      subject: logSubject,
      hours: logHours,
      notes: logNotes.trim() || "Estudo autônomo focado.",
      xp: earnedXp
    };

    setStudyLogs((prev) => [newLog, ...prev]);
    setXp((prev) => prev + earnedXp);
    setLogHours(1);
    setLogNotes("");

    // Give streak reward occasionally
    if (studyLogs.length % 5 === 4) {
      const bonusXp = 300;
      setXp((prev) => prev + bonusXp);
      alert(`Fantástico! Sequência prolongada! Você recebeu um bônus militar de +${bonusXp} XP.`);
    }

    alert(`Estudo registrado! +${earnedXp} XP adicionados ao seu perfil.`);
  };

  const handleDeleteStudyLog = (id: string, logXp: number) => {
    if (confirm("Deseja realmente remover este registro de estudo? O XP correspondente será estornado.")) {
      setStudyLogs((prev) => prev.filter((item) => item.id !== id));
      setXp((prev) => Math.max(0, prev - logXp));
    }
  };

  // External Questions manual logger submission
  const handleAddManualQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = manualSubject || selectedContest?.disciplinas[0]?.nome || "Geral";
    const total = manualCorrect + manualWrong;

    if (total === 0) {
      alert("Por favor, informe pelo menos uma questão (acerto ou erro).");
      return;
    }

    const baseXp = Math.floor(total / 10) * 50 + (manualCorrect * 5); // 50 XP per 10 questions + 5 bonus per correct
    const dateStr = new Date().toLocaleDateString("pt-BR");

    const newLog = {
      id: Date.now().toString(),
      date: dateStr,
      subject: finalSubject,
      topic: manualTopic.trim() || "Assuntos gerais do edital",
      correct: manualCorrect,
      wrong: manualWrong,
      xp: baseXp
    };

    setQuestionsHistory((prev) => [newLog, ...prev]);
    setXp((prev) => prev + baseXp);

    // If there are errors, automatically add to the Caderno de Erros
    if (manualWrong > 0) {
      const daysToReview = 1;
      const rawNextDate = new Date();
      rawNextDate.setDate(rawNextDate.getDate() + daysToReview);
      
      const newError = {
        id: `err-${Date.now()}`,
        subject: finalSubject,
        topic: manualTopic.trim() || "Pontos específicos errados",
        notes: `Erros identificados na bateria de questões em ${dateStr}. Necessita revisão ativa dos tópicos relacionados.`,
        status: "Pendente" as const,
        date: dateStr,
        nextReviewDate: rawNextDate.toLocaleDateString("pt-BR")
      };
      setErrorBook((prev) => [newError, ...prev]);
    }

    setManualSubject("");
    setManualTopic("");
    setManualCorrect(10);
    setManualWrong(2);

    alert(`Questões externas registradas! +${baseXp} XP adicionados. Erros foram adicionados ao seu Caderno de Erros.`);
  };

  // Interactive Quiz trigger
  const handleSelectQuizTopic = (subjectName: string) => {
    setQuizSubject(subjectName);
    const disc = selectedContest?.disciplinas.find((d) => d.nome === subjectName);
    if (disc && disc.topicos.length > 0) {
      setQuizTopic(disc.topicos[0]);
    }
  };

  const handleStartInteractiveQuiz = () => {
    // Search for a matching prebuilt mock question or fall back
    const matched = MOCK_QUESTIONS.filter(
      (q) => q.subject.toLowerCase() === quizSubject.toLowerCase()
    );

    if (matched.length > 0) {
      // Pick random matched question
      const randomQ = matched[Math.floor(Math.random() * matched.length)];
      setCurrentQuizQuestion(randomQ);
    } else {
      // Fallback procedural question if no mock matched
      setCurrentQuizQuestion({
        id: `gen-${Date.now()}`,
        subject: quizSubject,
        topic: quizTopic,
        text: `Considerando o tema "${quizTopic}" da disciplina "${quizSubject}", analise a afirmativa correta sobre as normas aplicáveis e as competências constitucionais do cargo de ${selectedContest?.cargo}:`,
        options: [
          "O regulamento geral prevê que a conduta ética deve guiar todas as ações táticas, devendo o agente motivar suas decisões administrativas por escrito.",
          "O cumprimento de ordens ilegais afasta a culpabilidade em caso de flagrante delito sob pretexto de hierarquia militar.",
          "As atribuições legislativas impedem que o órgão atue subsidiariamente em operações integradas de segurança interestadual.",
          "A jurisprudência do STF autoriza o confisco imediato e permanente de bens particulares por autoridade penal sem decisão judicial prévia."
        ],
        correctAnswer: 0,
        explanation: "As decisões administrativas devem obedecer ao princípio da motivação. O cumprimento de ordem manifestamente ilegal constitui crime (não afasta ilicitude), e o confisco necessita de devido processo legal."
      });
    }

    setSelectedAnswerIndex(null);
    setQuizAnswered(false);
  };

  const handleAnswerQuestion = (index: number) => {
    if (quizAnswered) return;
    setSelectedAnswerIndex(index);
    setQuizAnswered(true);

    const isCorrect = index === currentQuizQuestion?.correctAnswer;
    setQuizTotalCount((t) => t + 1);
    
    const dateStr = new Date().toLocaleDateString("pt-BR");

    if (isCorrect) {
      setQuizCorrectCount((c) => c + 1);
      const earnedXp = 30;
      setXp((prev) => prev + earnedXp);
      alert(`Parabéns! Resposta correta. +${earnedXp} XP!`);
      
      // Save stats to log
      setQuestionsHistory((prev) => [
        {
          id: Date.now().toString(),
          date: dateStr,
          subject: quizSubject,
          topic: quizTopic,
          correct: 1,
          wrong: 0,
          xp: earnedXp
        },
        ...prev
      ]);

    } else {
      const penaltyXp = 5;
      setXp((prev) => Math.max(0, prev + penaltyXp)); // Minor XP just for attempting
      alert(`Incorreto! O gabarito correto foi registrado.`);

      // Save stats to log with error
      setQuestionsHistory((prev) => [
        {
          id: Date.now().toString(),
          date: dateStr,
          subject: quizSubject,
          topic: quizTopic,
          correct: 0,
          wrong: 1,
          xp: penaltyXp
        },
        ...prev
      ]);

      // Add to Caderno de Erros automatically
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      setErrorBook((prev) => [
        {
          id: `err-${Date.now()}`,
          subject: quizSubject,
          topic: quizTopic,
          notes: `Erro no simulador interno de questões do PosseQuest sobre "${quizTopic}".`,
          status: "Pendente" as const,
          date: dateStr,
          nextReviewDate: nextDate.toLocaleDateString("pt-BR")
        },
        ...prev
      ]);
    }
  };

  const handleSolveError = (id: string) => {
    setErrorBook((prev) => 
      prev.map((err) => {
        if (err.id === id) {
          setXp((prevXp) => prevXp + 80);
          alert("Revisão de erro concluída com sucesso! Você obteve +80 XP de elite pela persistência.");
          return { ...err, status: "Revisado" as const };
        }
        return err;
      })
    );
  };

  const handleClearError = (id: string) => {
    if (confirm("Deseja realmente remover esta pendência do Caderno de Erros?")) {
      setErrorBook((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Helper values derived from state
  const currentLevelInfo = LEVELS.reduce((acc, lvl) => {
    if (xp >= lvl.xp) return lvl;
    return acc;
  }, LEVELS[0]);

  const nextLevelInfo = LEVELS.find((lvl) => lvl.xp > xp) || { xp: 999999, label: "MAX" };
  const xpIntoLevel = xp - currentLevelInfo.xp;
  const xpNeededForNextLevel = nextLevelInfo.xp - currentLevelInfo.xp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpIntoLevel / xpNeededForNextLevel) * 100)));

  const currentRankName = PATENTES_POLICIAIS.reduce((acc, rank) => {
    if (xp >= rank.min) return rank.name;
    return acc;
  }, PATENTES_POLICIAIS[0].name);

  const nextRankInfo = PATENTES_POLICIAIS.find((rank) => rank.min > xp) || null;

  // Filtered lists of state contests
  const activeStateContests = selectedState && Array.isArray(CONCURSOS_INICIAIS)
    ? CONCURSOS_INICIAIS.filter((c) => c && c.estado === selectedState.uf)
    : [];

  // Computed reports stats
  const totalCorrect = questionLogs.reduce((sum, item) => sum + item.correct, 0);
  const totalWrong = questionLogs.reduce((sum, item) => sum + item.wrong, 0);
  const totalQuestions = totalCorrect + totalWrong;
  const accuracyPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalHoursStudied = studyLogs.reduce((sum, item) => sum + item.hours, 0);

  // Find worst subject (highest error count or lowest correct ratio)
  const subjectPerformance = questionLogs.reduce((acc, curr) => {
    if (!acc[curr.subject]) {
      acc[curr.subject] = { correct: 0, wrong: 0 };
    }
    acc[curr.subject].correct += curr.correct;
    acc[curr.subject].wrong += curr.wrong;
    return acc;
  }, {} as Record<string, { correct: number; wrong: number }>);

  let worstSubject = "Sem dados";
  let worstAccuracy = 100;
  Object.keys(subjectPerformance).forEach((subject) => {
    const stats = subjectPerformance[subject];
    const total = stats.correct + stats.wrong;
    if (total > 0) {
      const acc = (stats.correct / total) * 100;
      if (acc < worstAccuracy) {
        worstAccuracy = acc;
        worstSubject = `${subject} (${Math.round(acc)}% acerto)`;
      }
    }
  });

  // Today stats
  const todayStr = new Date().toLocaleDateString("pt-BR");
  const todayStudyHours = studyLogs
    .filter((log) => log.date === todayStr)
    .reduce((sum, log) => sum + log.hours, 0);
  const todayCorrect = questionLogs
    .filter((log) => log.date === todayStr)
    .reduce((sum, log) => sum + log.correct, 0);
  const todayWrong = questionLogs
    .filter((log) => log.date === todayStr)
    .reduce((sum, log) => sum + log.wrong, 0);

  // Motivational message
  const dashboardMotivation = getMotivationalMessage(
    { hours: todayStudyHours, questions: todayCorrect + todayWrong },
    consecutiveDays,
    errorBook.filter((e) => e.status === "Pendente").length
  );

  // Daily missions stats
  const totalMissions = DAILY_MISSIONS.length;
  const completedMissionsCount = [
    todayStudyHours >= 1,
    (todayCorrect + todayWrong) >= 20,
    errorBook.some(e => e.status === "Revisado" && e.date === todayStr),
    consecutiveDays >= 1
  ].filter(Boolean).length;
  const missionPercent = totalMissions > 0 ? Math.round((completedMissionsCount / totalMissions) * 100) : 0;

  // Onboarding state categories
  const filteredStatesList = onboardingRegionFilter === "Todos" 
    ? ESTADOS_BRASIL 
    : ESTADOS_BRASIL.filter((s) => s.regiao === onboardingRegionFilter);

  // Render welcome screen or onboarding form
  if (!candidateName || !selectedState || showWelcome) {
    if (showWelcome) {
      return (
        <div className="min-h-screen bg-[#0a0f18] text-[#eef6ff] font-sans flex flex-col items-center justify-start py-10 md:py-16 px-4 sm:px-6 selection:bg-[#2a3a56] relative overflow-x-hidden">
          {/* Glowing Radial Background */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#1a2333]/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="w-full max-w-4xl bg-[#0f1724] border border-[#2a3a56] rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 my-auto space-y-8">
            {/* Top Logo / Title */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                {/* Custom High-Fidelity Spartan Helmet and Gold Shield Logo */}
                <div className="relative p-2 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-500 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                    {/* Outer Gold Shield */}
                    <path d="M50,5 L85,20 V50 C85,72 70,88 50,95 C30,88 15,72 15,50 V20 L50,5 Z" fill="none" stroke="#d97706" strokeWidth="2.5" />
                    <path d="M50,9 L80,22 V48 C80,68 67,83 50,90 C33,83 20,68 20,48 V22 L50,9 Z" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" />
                    
                    {/* Spartan Helmet */}
                    <path d="M35,32 L65,32 L62,45 L50,48 L38,45 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <path d="M48,45 L52,45 L52,65 L48,65 Z" fill="#f59e0b" />
                    <path d="M38,45 L48,50 L48,58 L40,54 Z" fill="#0f172a" />
                    <path d="M62,45 L52,50 L52,58 L60,54 Z" fill="#0f172a" />
                    <path d="M35,45 L38,68 L44,65 L42,48 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                    <path d="M65,45 L62,68 L56,65 L58,48 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                    <path d="M50,15 C52,15 53,24 50,28 C47,24 48,15 50,15 Z" fill="#f59e0b" />
                    
                    {/* Target and Book Mini-Accents */}
                    <path d="M28,75 L38,75 M33,70 L33,80" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="33" cy="75" r="3" fill="none" stroke="#f59e0b" strokeWidth="1" />
                    <path d="M62,72 L72,72 L72,78 L62,78 Z M67,72 L67,78" stroke="#f59e0b" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>

              <div>
                <h1 className="text-sm font-black tracking-[0.25em] text-neutral-400 uppercase">PosseQuest</h1>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent uppercase mt-1">
                  OPERAÇÃO POSSE
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <span className="h-px w-8 bg-amber-500/30" />
                  <p className="text-amber-500 font-extrabold uppercase tracking-[0.2em] text-xs sm:text-sm">
                    Do edital à posse
                  </p>
                  <span className="h-px w-8 bg-amber-500/30" />
                </div>
                <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mt-2">
                  App de estudos para concursos policiais.
                </p>
              </div>
            </div>

            {/* Campaign Core Value Cards (Fidelity matching the footer of the image) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2a3a56]/60">
              {[
                {
                  title: "PLANO POR EDITAL",
                  desc: "Estude com foco no que realmente cai no seu concurso policial.",
                  icon: FileText
                },
                {
                  title: "QUESTÕES E REVISÕES",
                  desc: "Milhares de questões comentadas e caderno de erros automatizado.",
                  icon: Sparkles
                },
                {
                  title: "ROTA ATÉ A POSSE",
                  desc: "Acompanhe seu avanço tático e suba de nível na hierarquia de patentes.",
                  icon: MapPin
                }
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="bg-[#151f31]/60 border border-[#2a3a56]/50 rounded-2xl p-4 space-y-2 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-1">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xs font-black tracking-wider text-white uppercase">{card.title}</h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Coming Soon Teaser */}
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 text-center">
              <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest block mb-1">EM BREVE</span>
              <p className="text-xs text-neutral-400 font-medium">Prepare-se para sua próxima missão. Novos simulados táticos semanais.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#2a3a56]/40">
              <button
                type="button"
                onClick={() => setShowWelcome(false)}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#07111c] font-black px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-sm uppercase tracking-wider"
              >
                Iniciar minha missão <ChevronRight className="w-4.5 h-4.5" />
              </button>
              <button
                type="button"
                onClick={handleLoadPresetProfile}
                className="w-full sm:w-auto bg-[#151f31] border border-[#2a3a56] hover:bg-[#1b2a42] text-neutral-300 hover:text-white font-extrabold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider"
              >
                <User className="w-4.5 h-4.5 text-amber-500/80" /> Já tenho perfil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#0a0f18] text-[#eef6ff] font-sans flex flex-col items-center justify-start py-10 md:py-16 px-4 sm:px-6 selection:bg-[#2a3a56]">
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#1a2333]/40 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-4xl bg-[#0f1724] border border-[#2a3a56] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 my-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1a2538] border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4 shadow-lg shadow-amber-500/10">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-2">PosseQuest</h1>
            <p className="text-amber-400 font-extrabold uppercase tracking-widest text-xs mb-3">OPERAÇÃO POSSE · DO EDITAL À POSSE</p>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto">
              Monte seu plano de combate policial personalizado. Insira seu codinome de guerra e escolha sua base federativa de estudos.
            </p>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="space-y-8">
            {/* Step 1: Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider block">
                1. Digite seu nome ou codinome de guerra
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  placeholder="Ex: Soldado Silva, Investigadora Santos..."
                  value={onboardingName}
                  onChange={(e) => setOnboardingName(e.target.value)}
                  className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-sm py-3 pl-10 rounded-xl transition-all outline-none w-full text-white placeholder-neutral-500 font-medium"
                />
              </div>
            </div>

            {/* Step 2: State selection */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider block">
                  2. Escolha o Estado do concurso desejado
                </label>
                
                {/* Region Filter */}
                <div className="flex flex-wrap gap-1 bg-[#151f31] p-1 rounded-lg border border-[#2a3a56]">
                  {["Todos", "Sudeste", "Sul", "Nordeste", "Norte", "Centro-Oeste"].map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setOnboardingRegionFilter(region)}
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-1.5 rounded transition-all cursor-pointer ${
                        onboardingRegionFilter === region 
                          ? "bg-amber-500 text-[#07111c]" 
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* States Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-1 rounded-xl bg-[#0a0f18]/30">
                {filteredStatesList.map((stateInfo) => {
                  const isTempSelected = tempSelectedState?.uf === stateInfo.uf;
                  return (
                    <button
                      key={stateInfo.uf}
                      type="button"
                      onClick={() => setTempSelectedState(stateInfo)}
                      className={`relative px-3 py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isTempSelected 
                          ? "bg-[#1b2a47] border-amber-500 text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/50 scale-[1.03]" 
                          : "bg-[#151f31] border-[#2a3a56]/80 text-neutral-400 hover:text-white hover:border-[#3e557b] hover:bg-[#18253b]/50"
                      }`}
                    >
                      {/* Subtly animated background glow effect on selected state */}
                      {isTempSelected && (
                        <span className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                      )}

                      {/* State abbreviation in big emphasis */}
                      <span className={`text-base font-extrabold tracking-wide ${isTempSelected ? 'text-amber-400' : 'text-neutral-200'}`}>
                        {stateInfo.uf}
                      </span>

                      {/* Full state name below */}
                      <span className="text-[10px] text-neutral-400 font-medium text-center truncate w-full uppercase tracking-wider px-1">
                        {stateInfo.uf === "BR" ? "Concursos Federais" : stateInfo.estado}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit onboarding with dynamic helper validation */}
            <div className="pt-6 border-t border-[#2a3a56]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 font-medium">
                {!onboardingName.trim() || !tempSelectedState ? (
                  <span className="flex items-center gap-1.5 text-amber-500/80">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Insira o codinome de guerra e escolha um Estado para prosseguir.
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    Identificação validada. Permissão de acesso concedida.
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={!onboardingName.trim() || !tempSelectedState}
                className={`font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  onboardingName.trim() && tempSelectedState
                    ? "bg-amber-500 hover:bg-amber-400 text-[#07111c] shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-[#151f31] border border-[#2a3a56] text-neutral-500 cursor-not-allowed opacity-50"
                }`}
              >
                Continuar para Escolha do Edital <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // If candidate is locked in but contest isn't, render contest picker
  if (!selectedContest) {
    // Rule 9: Before rendering editais, validate if there is:
    // - selectedState (estado selecionado)
    // - contestsObject (objeto de concursos daquele estado)
    // - editaisList (lista de editais daquele estado)
    const hasSelectedState = selectedState !== null && selectedState !== undefined;
    const contestsObject = hasSelectedState && Array.isArray(CONCURSOS_INICIAIS) ? CONCURSOS_INICIAIS : [];
    const editaisList = hasSelectedState ? contestsObject.filter(c => c && c.estado === selectedState?.uf) : [];

    return (
      <div className="min-h-screen bg-[#0a0f18] text-[#eef6ff] font-sans flex flex-col items-center justify-start py-10 md:py-16 px-4 sm:px-6 selection:bg-[#2a3a56]">
        <div className="w-full max-w-4xl bg-[#0f1724] border border-[#2a3a56] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#2a3a56]/60 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1e2a3e] to-[#121b29] border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-base shadow-inner">
                {selectedState?.uf}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest block">Estado Selecionado</span>
                <h2 className="text-xl font-bold text-white">{selectedState?.estado} ({selectedState?.uf})</h2>
              </div>
            </div>
            <button 
              onClick={() => setSelectedState(null)} 
              className="text-xs font-black text-neutral-400 hover:text-white bg-[#151f31] border border-[#2a3a56] px-3 py-1.5 rounded-lg transition-all"
            >
              Trocar Estado
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-black text-white mb-2 font-sans tracking-tight">Escolha seu Edital Tático</h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Cada edital policial possui disciplinas, pesos e regras próprias. Escolha seu objetivo para montar seu cronograma com base no concurso correto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editaisList.length > 0 ? (
              editaisList.map((contest) => {
                const colors = getAreaColors(contest.tipo);
                return (
                  <div 
                    key={contest.id}
                    onClick={() => handleSelectContest(contest)}
                    className="border border-[#2a3a56] hover:border-amber-500/50 bg-[#151f31] rounded-2xl p-5 transition-all hover:translate-y-[-2px] cursor-pointer flex flex-col justify-between h-56"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#0a0f18] text-amber-400 border border-amber-500/20">
                          {contest.tipo}
                        </span>
                        <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                          {contest.banca} · {contest.ano}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1">{contest.nome}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                        Orgão: {contest.orgao}
                      </p>
                    </div>

                    <div className="border-t border-[#2a3a56]/60 pt-3 flex items-center justify-between text-xs text-neutral-400">
                      <span>Vagas: <strong className="text-white">{contest.vagas || "A definir"}</strong></span>
                      <span>Salário: <strong className="text-[#10b981] font-semibold">{contest.salario || "A definir"}</strong></span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-2 border border-dashed border-[#2a3a56] rounded-2xl p-8 text-center text-neutral-400">
                <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-1 text-base">Nenhum edital cadastrado para este estado</h4>
                <p className="text-xs max-w-md mx-auto mb-6 text-neutral-400 leading-relaxed">
                  Ainda não há dados cadastrados para este estado. Volte aos estados ou escolha Concursos Federais para estudar PF, PRF ou Senado.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => setSelectedState(null)}
                    className="text-xs font-extrabold bg-[#151f31] border border-[#2a3a56] px-5 py-2.5 rounded-xl transition-all text-white cursor-pointer hover:bg-[#1f2d47]"
                  >
                    Voltar aos Estados
                  </button>
                  <button 
                    onClick={() => {
                      const fedState = ESTADOS_BRASIL.find(s => s.uf === "BR");
                      if (fedState) setSelectedState(fedState);
                    }}
                    className="text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-[#07111c] px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    Ver Concursos Federais
                  </button>
                  {selectedState?.uf === "SC" && (
                    <button 
                      onClick={() => {
                        const ppSc = CONCURSOS_INICIAIS.find(c => c.id === "policia_penal_sc");
                        if (ppSc) handleSelectContest(ppSc);
                      }}
                      className="text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-[#07111c] px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      Estudar Polícia Penal SC
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Contest color theme config
  const activeColors = getAreaColors(selectedContest.tipo);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#eef6ff] font-sans flex flex-col selection:bg-[#2a3a56] selection:text-white">
      {/* Top Header / Platform Nav */}
      <header className="border-b border-[#2a3a56]/80 bg-[#0f1724]/90 backdrop-blur-md sticky top-0 z-40 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a2538] to-[#0a0f18] border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">PosseQuest</h1>
                <span className="text-[9px] font-black uppercase bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">v1.2</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                {selectedContest.nome} · {selectedContest.cargo}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex flex-wrap gap-1 bg-[#151f31] p-1 rounded-xl border border-[#2a3a56]/80">
            {[
              { id: "dashboard", label: "Início", icon: Shield },
              { id: "schedule", label: "Estudos", icon: Calendar },
              { id: "quiz", label: "Simulados", icon: BookMarked },
              { id: "errors", label: "Revisões", icon: AlertTriangle },
              { id: "reports", label: "Perfil", icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? "bg-amber-500 text-[#07111c]" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Telemetry Box */}
          <div className="flex items-center gap-3 bg-[#151f31] px-4 py-2 rounded-xl border border-[#2a3a56]/80">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                {currentRankName}
              </span>
              <span className="text-xs font-bold text-white">
                {candidateName} ({currentLevelInfo.label})
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-[#07111c] font-black text-sm shadow">
              {currentLevelInfo.label.replace("LV ", "")}
            </div>
          </div>
        </div>
      </header>

      {/* Main Core Platform Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 pb-24 md:pb-8">
        
        {/* Progress Bar under header */}
        <div className="mb-8 bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-1.5">
              <span>Nível Atual: <strong className="text-white">{currentLevelInfo.label}</strong></span>
              <span>Próxima Patente: <strong className="text-white">{nextRankInfo ? nextRankInfo.name : "Nível Máximo"}</strong></span>
            </div>
            <div className="h-2.5 bg-[#0a0f18] rounded-full overflow-hidden border border-[#2a3a56]/40">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="text-lg font-black text-white block">{xp} XP</span>
            <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
              {nextRankInfo ? `${nextRankInfo.min - xp} XP para subir` : "Parabéns, Elite Máxima!"}
            </span>
          </div>
        </div>

        {/* Dynamic View Panel Rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            
            {/* VIEW 1: Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Bento Hub of 7 Operational Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  
                  {/* CARD 1: Concurso-alvo */}
                  <div className="bg-[#0f1724] border border-amber-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-amber-500/5 relative overflow-hidden">
                    <div className="absolute right-3 top-3 opacity-10">
                      <Shield className="w-16 h-16 text-amber-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block mb-1">CONCURSO-ALVO</span>
                      <h3 className="text-xl font-extrabold text-white leading-tight">{selectedContest.nome}</h3>
                      <p className="text-[11px] text-neutral-400 mt-1 uppercase font-semibold tracking-wider">
                        {selectedContest.cargo} · {selectedContest.banca}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#2a3a56]/40 flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-bold">{selectedContest.salario || "R$ 6.000,00"}</span>
                      <button 
                        onClick={() => { setSelectedContest(null); setSelectedState(null); }}
                        className="text-[10px] font-black uppercase text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer bg-[#151f31] px-2 py-1 rounded border border-[#2a3a56]"
                      >
                        Alterar
                      </button>
                    </div>
                  </div>

                  {/* CARD 2: Missões de hoje */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex items-center justify-between shadow-md">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">MISSÕES DE HOJE</span>
                      <h3 className="text-2xl font-black text-white">{completedMissionsCount} de {totalMissions}</h3>
                      <p className="text-[11px] text-neutral-400">Objetivos diários</p>
                    </div>
                    {/* SVG Circular Progress Meter */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-neutral-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-amber-500 transition-all duration-500"
                          strokeWidth="3.5"
                          strokeDasharray={`${missionPercent}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-amber-500">
                        {missionPercent}%
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: Questões resolvidas */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex items-center gap-4 shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">QUESTÕES</span>
                      <h3 className="text-3xl font-black text-white">{totalQuestions.toLocaleString("pt-BR")}</h3>
                      <p className="text-[11px] text-neutral-400">Total respondido</p>
                    </div>
                  </div>

                  {/* CARD 4: Taxa de acerto */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">TAXA DE ACERTO</span>
                        <h3 className="text-3xl font-black text-emerald-400 mt-1">{accuracyPercent}%</h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Micro vector sparkline graph */}
                    <div className="h-4 mt-2 w-full">
                      <svg className="w-full h-full text-emerald-500/70" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path
                          d="M 0,18 C 15,15 25,5 40,8 C 55,10 65,18 80,4 L 100,2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 0,18 C 15,15 25,5 40,8 C 55,10 65,18 80,4 L 100,2 L 100,20 L 0,20 Z"
                          fill="currentColor"
                          fillOpacity="0.05"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* CARD 5: Rota até a posse */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex flex-col justify-between shadow-md col-span-1 md:col-span-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">ROTA ATÉ A POSSE</span>
                        <span className="text-xs font-black text-amber-500">{Math.round(progressPercent)}%</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mb-3">Progresso tático rumo à nomeação oficial</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 bg-[#0a0f18] rounded-full overflow-hidden border border-[#2a3a56]/40 p-[1.5px]">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[8px] font-extrabold text-neutral-500 uppercase tracking-wider">
                        <span>EDITAL</span>
                        <span>PROVA OBJETIVA</span>
                        <span>APROVADO</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 6: Próxima revisão */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">PRÓXIMA REVISÃO</span>
                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-base font-black text-white block">
                            {errorBook.filter(e => e.status === "Pendente").length} Pendentes
                          </strong>
                          <span className="text-[9px] text-neutral-400 block font-semibold uppercase">Caderno de Erros</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("errors")}
                      className="mt-4 text-[10px] text-center font-black uppercase tracking-wider text-amber-500 hover:text-white transition-colors py-2 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl cursor-pointer"
                    >
                      Revisar Agora
                    </button>
                  </div>

                  {/* CARD 7: Simulado da semana */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block mb-1">SIMULADO DA SEMANA</span>
                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white block leading-tight">Geral {selectedContest.banca}</strong>
                          <span className="text-[9px] text-emerald-400 block font-extrabold uppercase mt-0.5 tracking-wider">Simulado Liberado</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className="mt-4 text-[10px] text-center font-black uppercase tracking-wider text-[#07111c] bg-amber-500 hover:bg-amber-400 transition-all py-2 rounded-xl font-black cursor-pointer shadow-sm shadow-amber-500/10"
                    >
                      Iniciar Simulado
                    </button>
                  </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: General Stats & Active Status */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Performance Motivation Banner */}
                  <div className="bg-gradient-to-r from-[#1a2333] to-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute right-4 bottom-4 opacity-10 text-neutral-50">
                      <Shield className="w-36 h-36" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded mb-3 inline-block tracking-wider">
                      Instrução do Comando Policial
                    </span>
                    <h2 className="text-xl font-bold text-white mb-2">Relatório de Diagnóstico Tático</h2>
                    <p className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
                      "{dashboardMotivation}"
                    </p>
                  </div>

                  {/* Daily Mission Cards */}
                  <div>
                    <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" /> Missões Diárias de Combate
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DAILY_MISSIONS.map((mission) => {
                        // Check if completed in stats
                        let isCompleted = false;
                        if (mission.id === "mission-study-1" && todayStudyHours >= 1) isCompleted = true;
                        if (mission.id === "mission-questions-20" && (todayCorrect + todayWrong) >= 20) isCompleted = true;
                        if (mission.id === "mission-error-review" && errorBook.some(e => e.status === "Revisado" && e.date === todayStr)) isCompleted = true;
                        if (mission.id === "mission-streak" && consecutiveDays >= 1) isCompleted = true;

                        return (
                          <div 
                            key={mission.id}
                            className={`border rounded-2xl p-5 flex flex-col justify-between h-40 transition-all ${
                              isCompleted 
                                ? "bg-emerald-500/5 border-emerald-500/40 text-neutral-300" 
                                : "bg-[#0f1724] border-[#2a3a56]/80 text-neutral-200"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                  isCompleted ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-[#0a0f18] text-amber-400 border border-amber-500/20"
                                }`}>
                                  {isCompleted ? "Concluída" : `+${mission.xp} XP`}
                                </span>
                                {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                              </div>
                              <h4 className="font-bold text-white mb-1">{mission.title}</h4>
                              <p className="text-xs text-neutral-400">{mission.desc}</p>
                            </div>

                            {!isCompleted && (
                              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                                Ative estudando ou simulando questões hoje
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Quick Logger Form */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6">
                    <h3 className="text-lg font-black text-white mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-500" /> Registrar Estudo Realizado
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      Concluiu um período de estudos fora da plataforma? Registre as horas de foco líquido aqui para somar XP e computar sua sequência.
                    </p>

                    <form onSubmit={handleAddStudyLog} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Disciplina do Edital</label>
                        <select 
                          value={logSubject}
                          onChange={(e) => setLogSubject(e.target.value)}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                        >
                          {selectedContest.disciplinas.map((d) => (
                            <option key={d.nome} value={d.nome}>{d.nome}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Tempo Líquido (Horas)</label>
                        <input 
                          type="number"
                          min="0.25"
                          max="12"
                          step="0.25"
                          value={logHours}
                          onChange={(e) => setLogHours(Number(e.target.value))}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-[#07111c] font-black py-2.5 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
                      >
                        Salvar e Somar XP
                      </button>
                    </form>
                  </div>

                </div>

                {/* Right: Quick Stats Sidebar & Timer */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Active Timer / Stop Watch Card */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 relative">
                    <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded tracking-wider mb-3 inline-block">
                      Cronômetro Tático 50/10
                    </span>
                    <h3 className="font-bold text-white mb-2">Ciclo de Estudo Ativo</h3>

                    <div className="text-center py-6">
                      <div className="text-5xl font-black tracking-tight text-white mb-2 font-mono drop-shadow">
                        {Math.floor(timerSeconds / 60).toString().padStart(2, "0")}:
                        {(timerSeconds % 60).toString().padStart(2, "0")}
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-4">
                        {timerType === "focus" ? "Modo de Foco" : "Intervalo de Descanso"}
                      </span>

                      {/* Timer controls */}
                      <div className="flex justify-center gap-2">
                        {!timerRunning ? (
                          <button
                            onClick={() => setRunning(true)}
                            className="bg-amber-500 hover:bg-amber-400 text-[#07111c] w-12 h-12 rounded-full flex items-center justify-center transition-all shadow shadow-amber-500/20 cursor-pointer"
                          >
                            <Play className="w-5 h-5 fill-current" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setRunning(false)}
                            className="bg-red-500/20 border border-red-500 text-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setRunning(false);
                            setTimerSeconds(50 * 60);
                            setTimerMaxSeconds(50 * 60);
                            setTimerType("focus");
                          }}
                          className="bg-[#151f31] border border-[#2a3a56] hover:bg-[#202e47] text-neutral-300 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 border-t border-[#2a3a56]/60 pt-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Estudando Agora</span>
                        <select 
                          value={timerSubject}
                          onChange={(e) => setTimerSubject(e.target.value)}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2 rounded-xl transition-all outline-none w-full text-white"
                        >
                          {selectedContest.disciplinas.map((d) => (
                            <option key={d.nome} value={d.nome}>{d.nome}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats totals */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 space-y-4">
                    <h3 className="font-black text-sm text-neutral-400 uppercase tracking-widest border-b border-[#2a3a56]/60 pb-2">
                      Estatísticas de Hoje
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-neutral-400 text-xs block mb-0.5">Estudado Hoje</span>
                        <strong className="text-white text-xl">{todayStudyHours.toFixed(1)}h</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-xs block mb-0.5">Questões Hoje</span>
                        <strong className="text-white text-xl">{todayCorrect + todayWrong}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-xs block mb-0.5">Acertos Hoje</span>
                        <strong className="text-emerald-400 text-xl">{todayCorrect}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-xs block mb-0.5">Sequência Ativa</span>
                        <strong className="text-amber-500 text-xl">{consecutiveDays} dias</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Settings shortcuts */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 space-y-3">
                    <button
                      onClick={() => {
                        setSelectedContest(null);
                        setSelectedState(null);
                      }}
                      className="w-full bg-[#151f31] hover:bg-[#202e47] border border-[#2a3a56] text-white font-extrabold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4" /> Alterar Concurso / Estado
                    </button>
                    <button
                      onClick={handleResetApp}
                      className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-extrabold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Resetar Todos os Dados
                    </button>
                  </div>

                </div>

              </div>
              </div>
            )}

            {/* VIEW 2: Schedule Builder */}
            {activeTab === "schedule" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Schedule Setup / Target Hours */}
                <div className="lg:col-span-4 space-y-6 bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" /> Parâmetros de Estudo
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Defina sua meta de horas semanais e data limite do concurso para gerar seu ciclo de estudo baseado no peso e relevância de cada disciplina do edital.
                    </p>
                  </div>

                  <form onSubmit={handleUpdateScheduleSettings} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Meta de Horas Semanais</label>
                      <input 
                        type="number"
                        min="5"
                        max="80"
                        value={weeklyHoursBudget}
                        onChange={(e) => setWeeklyHoursBudget(Number(e.target.value))}
                        className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-sm py-2.5 rounded-xl transition-all outline-none w-full text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Data Provável da Prova</label>
                      <input 
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-sm py-2.5 rounded-xl transition-all outline-none w-full text-white font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-[#07111c] font-black py-3 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Gerar Ciclo Inteligente
                    </button>
                  </form>

                  {/* Info alert about exam distance */}
                  {examDate && (
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-neutral-300">
                      <strong>Contagem Regressiva Ativa:</strong>
                      <p className="mt-1">
                        Faltam {Math.max(0, Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} dias para a aplicação da sua prova. Força total na preparação!
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Render Weekly Schedule Blocks */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-500" /> Distribuição de Horas no Edital
                    </h3>
                    <span className="text-xs text-neutral-400 font-bold bg-[#151f31] px-3 py-1.5 rounded-lg border border-[#2a3a56]">
                      {customSchedule.length} blocos gerados
                    </span>
                  </div>

                  <div className="space-y-4">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((dayName) => {
                      const dayBlocks = customSchedule.filter((b) => b.day === dayName);
                      return (
                        <div key={dayName} className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 space-y-3">
                          <h4 className="font-bold text-sm text-white tracking-wide border-b border-[#2a3a56]/50 pb-2 flex justify-between">
                            <span>{dayName}</span>
                            <span className="text-xs font-semibold text-neutral-400">
                              {dayBlocks.length} horas sugeridas
                            </span>
                          </h4>

                          {dayBlocks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {dayBlocks.map((block) => (
                                <div 
                                  key={block.id}
                                  onClick={() => handleToggleBlock(block.id)}
                                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                                    block.completed
                                      ? "bg-emerald-500/10 border-emerald-500 text-neutral-300"
                                      : "bg-[#151f31] border-[#2a3a56] hover:border-neutral-500 hover:bg-[#1a2b42]"
                                  }`}
                                >
                                  <div>
                                    <strong className="text-xs block text-white mb-0.5 line-clamp-1">{block.subject}</strong>
                                    <span className="text-[10px] text-[#9bb0ca] font-mono block">Ciclo de {block.duration}min</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {block.completed ? (
                                      <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[#0a0f18] text-xs">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                        Focar
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-neutral-500 italic">Nenhum bloco agendado para hoje. Recomendamos focar em revisões ou simulados leves.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: Interactive Quiz / External Logger */}
            {activeTab === "quiz" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Panel: Simulation Engine */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Topic Selector for Quiz */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" /> Simulador Tático Interno
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Gere questões objetivas de múltipla escolha com base nos conteúdos previstos do seu edital. Obtenha XP por gabaritar!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Escolha a Disciplina</label>
                        <select 
                          value={quizSubject}
                          onChange={(e) => handleSelectQuizTopic(e.target.value)}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                        >
                          {selectedContest.disciplinas.map((d) => (
                            <option key={d.nome} value={d.nome}>{d.nome}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Tópico do Edital</label>
                        <select 
                          value={quizTopic}
                          onChange={(e) => setQuizTopic(e.target.value)}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                        >
                          {selectedContest.disciplinas
                            .find((d) => d.nome === quizSubject)
                            ?.topicos.map((top) => (
                              <option key={top} value={top}>{top}</option>
                            )) || <option>Geral</option>}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleStartInteractiveQuiz}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-[#07111c] font-black py-3 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Gerar Questão de Concurso
                    </button>
                  </div>

                  {/* Active Question Panel */}
                  {currentQuizQuestion && (
                    <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-[#2a3a56]/50 pb-3">
                        <div>
                          <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block">Questão Prática</span>
                          <span className="text-xs font-bold text-white">{currentQuizQuestion.subject} &middot; {currentQuizQuestion.topic}</span>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">ID: {currentQuizQuestion.id}</span>
                      </div>

                      <p className="text-sm font-semibold leading-relaxed text-white">
                        {currentQuizQuestion.text}
                      </p>

                      <div className="space-y-3">
                        {currentQuizQuestion.options.map((option, index) => {
                          let optionStyle = "border-[#2a3a56] bg-[#151f31] hover:border-neutral-400";
                          
                          if (quizAnswered) {
                            if (index === currentQuizQuestion.correctAnswer) {
                              optionStyle = "border-emerald-500 bg-emerald-500/10 text-white font-semibold";
                            } else if (index === selectedAnswerIndex) {
                              optionStyle = "border-red-500 bg-red-500/10 text-white";
                            } else {
                              optionStyle = "border-[#2a3a56]/40 bg-[#151f31]/40 text-neutral-500 cursor-not-allowed";
                            }
                          }

                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswerQuestion(index)}
                              disabled={quizAnswered}
                              className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex gap-3 items-start ${optionStyle}`}
                            >
                              <span className="font-bold text-amber-500">{String.fromCharCode(65 + index)})</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Quiz Explanation */}
                      {quizAnswered && (
                        <div className="p-4 rounded-xl bg-[#0a0f18] border border-[#2a3a56] space-y-2">
                          <strong className="text-xs text-amber-500 uppercase tracking-wider block">Gabarito Comentado</strong>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            {currentQuizQuestion.explanation}
                          </p>
                          <button
                            onClick={handleStartInteractiveQuiz}
                            className="bg-[#151f31] border border-[#2a3a56] hover:bg-[#202e47] text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all cursor-pointer mt-2"
                          >
                            Próxima Questão
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Right Panel: External Logger Form */}
                <div className="lg:col-span-4 bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-amber-500" /> Histórico Externo
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Fez baterias de simulados no QConcursos, TecConcursos ou outros sistemas de questões? Adicione as estatísticas para manter seu desempenho atualizado.
                    </p>
                  </div>

                  <form onSubmit={handleAddManualQuestions} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Matéria Estudada</label>
                      <select 
                        value={manualSubject}
                        onChange={(e) => setManualSubject(e.target.value)}
                        className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                      >
                        {selectedContest.disciplinas.map((d) => (
                          <option key={d.nome} value={d.nome}>{d.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Assunto Específico</label>
                      <input 
                        type="text"
                        placeholder="Ex: Prisão em Flagrante, Sintaxe..."
                        value={manualTopic}
                        onChange={(e) => setManualTopic(e.target.value)}
                        className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Quantidade de Acertos</label>
                        <input 
                          type="number"
                          min="0"
                          value={manualCorrect}
                          onChange={(e) => setManualCorrect(Number(e.target.value))}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white text-center font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Quantidade de Erros</label>
                        <input 
                          type="number"
                          min="0"
                          value={manualWrong}
                          onChange={(e) => setManualWrong(Number(e.target.value))}
                          className="bg-[#151f31] border border-[#2a3a56] focus:border-amber-500/70 text-xs py-2.5 rounded-xl transition-all outline-none w-full text-white text-center font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#151f31] hover:bg-[#202e47] border border-[#2a3a56] text-white font-black py-3 rounded-xl transition-all text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Registrar Questões
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* VIEW 4: Error Book */}
            {activeTab === "errors" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2a3a56]/60 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-white">Caderno de Erros Ativo</h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      A revisão ativa dos erros impede a reincidência em armadilhas de banca. Resolva as pendências para resgatar XP extra!
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-[#151f31] border border-[#2a3a56] px-3.5 py-1.5 rounded-lg text-amber-500">
                    {errorBook.filter((e) => e.status === "Pendente").length} Pendências
                  </span>
                </div>

                <div className="space-y-3">
                  {errorBook.length > 0 ? (
                    errorBook.map((err) => {
                      const isPendente = err.status === "Pendente";
                      return (
                        <div 
                          key={err.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isPendente 
                              ? "bg-[#0f1724] border-red-500/30" 
                              : "bg-[#0f1724]/60 border-[#2a3a56]/40 opacity-70"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-white px-2 py-0.5 rounded bg-[#0a0f18] border border-[#2a3a56]">
                                  {err.subject}
                                </span>
                                {err.topic && (
                                  <span className="text-xs text-neutral-400">
                                    &middot; {err.topic}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-300 leading-relaxed mb-1">{err.notes}</p>
                              <span className="text-[10px] text-neutral-500 font-mono">
                                Registrado em {err.date} &middot; Sugestão de revisão: {err.nextReviewDate}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isPendente ? (
                                <>
                                  <button
                                    onClick={() => handleSolveError(err.id)}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-[#0a0f18] text-xs font-extrabold px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                                  >
                                    <Check className="w-3.5 h-3.5" /> Revisar (+80 XP)
                                  </button>
                                  <button
                                    onClick={() => handleClearError(err.id)}
                                    className="bg-[#151f31] hover:bg-[#202e47] border border-[#2a3a56] text-neutral-400 hover:text-white text-xs font-extrabold p-2 rounded-lg transition-all"
                                    title="Remover erro"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4" /> Revisado
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="border border-dashed border-[#2a3a56] rounded-2xl p-8 text-center text-neutral-400 bg-[#0f1724]/40">
                      <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                      <h4 className="font-bold text-white mb-1">Caderno de Erros Zerado</h4>
                      <p className="text-xs max-w-sm mx-auto">
                        Incrível! Você não possui nenhuma pendência disciplinar ativa no momento. Mantenha os treinos de simulados em dia!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 5: Reports / Performance */}
            {activeTab === "reports" && (
              <div className="space-y-8">
                
                {/* Profile Header Card */}
                <div className="bg-gradient-to-r from-[#1b2a47] to-[#0f1724] border border-amber-500/30 rounded-2xl p-6 shadow-lg shadow-amber-500/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-[#07111c] font-black text-2xl shadow-lg shadow-amber-500/20 shrink-0">
                      {currentLevelInfo.label.replace("LV ", "")}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">CONCURSEIRO DE ELITE</span>
                      <h2 className="text-2xl font-black text-white">{candidateName}</h2>
                      <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-500" />
                        Patente Ativa: <strong className="text-white font-extrabold">{currentRankName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 z-10">
                    <button
                      onClick={() => { setSelectedContest(null); setSelectedState(null); }}
                      className="bg-[#151f31] hover:bg-[#22324c] border border-[#2a3a56] text-white font-extrabold py-2 px-4 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-amber-500" /> Alterar Edital
                    </button>
                    <button
                      onClick={handleResetApp}
                      className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-extrabold py-2 px-4 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Resetar Missão
                    </button>
                  </div>
                </div>
                
                {/* General stats indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Tempo Estudado", val: `${totalHoursStudied.toFixed(1)}h`, desc: "Horas de foco registradas" },
                    { label: "Questões Resolvidas", val: totalQuestions, desc: "Bateria acumulada total" },
                    { label: "Taxa de Acertos", val: `${accuracyPercent}%`, desc: "Desempenho no edital" },
                    { label: "Sequência Conquistada", val: `${consecutiveDays} dias`, desc: "Constância acumulada" }
                  ].map((ind, i) => (
                    <div key={i} className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-5 text-center">
                      <span className="text-xs text-neutral-400 font-bold block mb-1">{ind.label}</span>
                      <strong className="text-2xl md:text-3xl font-black text-white block mb-0.5">{ind.val}</strong>
                      <span className="text-[10px] text-neutral-500 block">{ind.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Analytical charts / insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Subject strengths & weaknesses */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 space-y-4">
                    <h3 className="font-black text-sm text-neutral-400 uppercase tracking-widest border-b border-[#2a3a56]/60 pb-2 flex items-center gap-1.5">
                      <Activity className="w-4 h-4" /> Diagnóstico de Rendimento
                    </h3>

                    <div className="space-y-4">
                      <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block">Maior Fraqueza Identificada</span>
                          <strong className="text-xs text-white block">{worstSubject}</strong>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block">Patente de Elite Ativa</span>
                          <strong className="text-xs text-white block">{currentRankName}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational logs */}
                  <div className="bg-[#0f1724] border border-[#2a3a56]/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-sm text-neutral-400 uppercase tracking-widest border-b border-[#2a3a56]/60 pb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" /> Matriz do Edital Escolhido
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-3">
                        O edital da <strong className="text-white">{selectedContest.nome}</strong> é composto por <strong className="text-white">{selectedContest.disciplinas.length} disciplinas</strong> com pesos e prioridades específicas. Certifique-se de direcionar mais tempo de estudo para as matérias com prioridade <span className="text-amber-500 font-bold">Muito Alta</span> ou <span className="text-amber-500 font-bold">Alta</span>.
                      </p>
                    </div>

                    <div className="text-xs font-bold text-neutral-400 bg-[#0a0f18] p-3.5 rounded-xl border border-[#2a3a56]/40 flex items-center justify-between">
                      <span>Banca Organizadora: <strong className="text-white">{selectedContest.banca}</strong></span>
                      <span>Ano de Referência: <strong className="text-white">{selectedContest.ano}</strong></span>
                    </div>
                  </div>

                </div>

                {/* History list of logged studies */}
                <div className="border border-[#2a3a56]/80 rounded-2xl bg-[#0f1724] p-6 shadow-md mt-6">
                  <h3 className="font-bold text-neutral-200 text-sm mb-4">Registro Cronológico de Foco</h3>
                  
                  {studyLogs.length > 0 ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {studyLogs.map((log) => (
                        <div key={log.id} className="p-3 bg-[#151f31] rounded-xl border border-[#2a3a56]/40 flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-white font-semibold">{log.subject}</strong>
                            <span className="text-neutral-400 block mt-0.5">{log.date} &middot; {log.hours.toFixed(1)}h estudadas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold bg-[#10b981]/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              +{log.xp} XP
                            </span>
                            <button
                              onClick={() => handleDeleteStudyLog(log.id, log.xp)}
                              className="text-neutral-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              title="Remover"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">Nenhum estudo registrado cronologicamente ainda.</p>
                  )}
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

      {/* Mobile Bottom Navigation Bar (Visible only on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f1724]/95 backdrop-blur-lg border-t border-[#2a3a56]/80 flex justify-around py-3 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.55)] pb-safe">
        {[
          { id: "dashboard", label: "Início", icon: Shield },
          { id: "schedule", label: "Estudos", icon: Calendar },
          { id: "quiz", label: "Simulados", icon: BookMarked },
          { id: "errors", label: "Revisões", icon: AlertTriangle },
          { id: "reports", label: "Perfil", icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex-1"
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? "text-amber-400 bg-amber-500/10" : "text-neutral-400"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={isActive ? "text-amber-500 font-extrabold" : "text-neutral-400"}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
