import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API}/quiz/questions`)
      .then(res => setQuestions(res.data.questions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/quiz/submit`, { answers });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-body">Loading...</div>;

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;
  const canProceed = answers[q?.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-muted via-[#FAFAF9] to-primary-muted">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-primary-dark font-body">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {!result ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-2xl bg-secondary-muted flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-secondary-dark" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-medium text-stone-800 mb-2">Find Your Perfect Match</h1>
              <p className="text-stone-500 font-body">Answer 5 quick questions to get matched with the right therapist for you.</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-stone-500 font-body mb-2">
                <span>Question {current + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-xl font-heading font-medium text-stone-800 mb-6" data-testid={`quiz-question-${q?.id}`}>{q?.question}</h2>
                  <div className="space-y-3">
                    {q?.options.map(opt => (
                      <button key={opt.value} onClick={() => handleSelect(q.id, opt.value)}
                        data-testid={`quiz-option-${opt.value}`}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                          answers[q.id] === opt.value
                            ? 'border-secondary bg-secondary-muted shadow-sm'
                            : 'border-stone-200 hover:border-secondary-light hover:bg-stone-50'
                        }`}>
                        <span className="text-sm font-medium text-stone-800 font-body">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={handlePrev} disabled={current === 0} data-testid="quiz-prev-btn"
                className="flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-stone-800 disabled:opacity-30 font-body transition-colors">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              {isLast ? (
                <button onClick={handleSubmit} disabled={!canProceed || submitting} data-testid="quiz-submit-btn"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 disabled:opacity-50">
                  {submitting ? 'Finding matches...' : 'See My Matches'}
                </button>
              ) : (
                <button onClick={handleNext} disabled={!canProceed} data-testid="quiz-next-btn"
                  className="flex items-center gap-1 bg-secondary-dark hover:bg-secondary text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 disabled:opacity-50">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} data-testid="quiz-results">
            <div className="text-center mb-10">
              <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-accent-dark" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl font-heading font-medium text-stone-800 mb-2">Your Perfect Matches</h1>
              <p className="text-stone-500 font-body">Based on your answers, we recommend <strong className="text-primary-dark">{result.recommended_type}</strong></p>
            </div>

            <div className="space-y-4">
              {result.matched_therapists?.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                  data-testid={`quiz-match-${t.id}`}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-all">
                  <img src={t.image} alt={t.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-stone-800">{t.name}</h3>
                      {i === 0 && <span className="text-xs bg-accent-muted text-accent-dark px-2 py-0.5 rounded-full font-body font-medium">Best Match</span>}
                    </div>
                    <p className="text-sm text-primary-dark font-body">{t.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 font-body">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" fill="currentColor" /> {t.rating}</span>
                      <span>{t.experience}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.specialties?.slice(0, 3).map(s => (
                        <span key={s} className="text-xs bg-secondary-muted text-secondary-dark px-2 py-0.5 rounded-full font-body">{s}</span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/therapists/${t.id}`} className="self-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-all flex-shrink-0">
                    Book Now
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/therapists" className="text-primary-dark font-semibold font-body hover:underline text-sm">View All Therapists &rarr;</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
