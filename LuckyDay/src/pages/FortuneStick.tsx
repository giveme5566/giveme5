import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { 
  Qian, 
  getRandomQian, 
  QIAN_TYPE_LABELS, 
  QIAN_TYPE_COLORS,
  SCENE_QIAN_MAP 
} from '@/data/qianwen';

export default function FortuneStick() {
  const [step, setStep] = useState<'select-scene' | 'shake' | 'result'>('select-scene');
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const [resultQian, setResultQian] = useState<Qian | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  
  const navigate = useNavigate();

  // 选择场景
  const handleSelectScene = (sceneKey: string) => {
    setSelectedScene(sceneKey);
    setStep('shake');
  };

  // 摇签
  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      const qian = getRandomQian();
      setResultQian(qian);
      setIsShaking(false);
      setStep('result');
    }, 1500);
  };

  // 重新摇
  const handleRestart = () => {
    setStep('select-scene');
    setSelectedScene(null);
    setResultQian(null);
  };

  // 保存图片
  const handleSaveImage = async () => {
    const element = document.getElementById('qian-result');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2
      });
      const link = document.createElement('a');
      link.download = '观音灵签.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-amber-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-amber-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-amber-900">求支签</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* 选择场景 */}
        {step === 'select-scene' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🎋</div>
              <h2 className="text-xl font-semibold text-amber-900">请选择所求之事</h2>
              <p className="text-amber-600 mt-1">选择最契合你当前心愿的场景</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(SCENE_QIAN_MAP).map(([key, scene]) => (
                <button
                  key={key}
                  onClick={() => handleSelectScene(key)}
                  className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm hover:border-amber-300 hover:shadow-md transition-all text-left"
                >
                  <div className="text-2xl mb-2">{scene.icon}</div>
                  <div className="font-medium text-amber-900 text-sm">{scene.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 摇签 */}
        {step === 'shake' && selectedScene && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-sm text-amber-600 mb-2">
                当前场景：{SCENE_QIAN_MAP[selectedScene].label}
              </div>
              <div className="text-3xl mb-3">{SCENE_QIAN_MAP[selectedScene].icon}</div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">心中默念所求之事</h2>
              <p className="text-amber-600">然后点击签筒，为你摇出一支灵签</p>
            </div>

            <div className="flex justify-center py-8">
              <button
                onClick={handleShake}
                disabled={isShaking}
                className={`relative w-40 h-56 bg-gradient-to-b from-amber-700 to-amber-900 rounded-3xl shadow-lg border-4 border-amber-800 flex items-end justify-center pb-6 transition-transform ${isShaking ? 'animate-shake' : 'hover:scale-105'}`}
              >
                <div className="absolute top-4 text-5xl">🎲</div>
                <div className="text-white font-medium">
                  {isShaking ? '正在摇签...' : '点击摇签'}
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 bg-amber-200 rounded-full transition-all ${
                        isShaking 
                          ? `h-${4 + Math.floor(Math.random() * 8)} animate-bounce` 
                          : 'h-4'
                      }`}
                      style={{ 
                        height: isShaking ? `${16 + Math.random() * 24}px` : '16px',
                        animationDelay: isShaking ? `${i * 0.1}s` : '0s'
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setStep('select-scene')}
                className="text-amber-600"
              >
                换一个场景
              </Button>
            </div>
          </div>
        )}

        {/* 签文结果 */}
        {step === 'result' && resultQian && (
          <div className="space-y-4">
            <div id="qian-result" className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100">
              {/* 签级 */}
              <div className="text-center mb-4">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${QIAN_TYPE_COLORS[resultQian.type]}`}>
                  {QIAN_TYPE_LABELS[resultQian.type]}
                </span>
              </div>

              {/* 签号和签名 */}
              <div className="text-center mb-6">
                <div className="text-sm text-amber-600 mb-1">{resultQian.xuhao} · {resultQian.gongwei}</div>
                <h2 className="text-2xl font-bold text-amber-900">{resultQian.qianming}</h2>
              </div>

              {/* 签文 */}
              <div className="bg-amber-50 rounded-2xl p-5 mb-5 border border-amber-100">
                <div className="text-lg leading-relaxed text-amber-900 text-center whitespace-pre-line">
                  {resultQian.qianwen}
                </div>
              </div>

              {/* 解曰 */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-amber-800 mb-2">解曰</h3>
                <div className="text-amber-700 leading-relaxed text-sm">
                  {resultQian.jieyue}
                </div>
              </div>

              {/* 仙机 */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-amber-800 mb-2">仙机</h3>
                <div className="grid grid-cols-2 gap-2">
                  {resultQian.xianji.split('，').map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-sm text-amber-700">
                      <span className="text-amber-400">·</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* 典故 */}
              <div className="pt-4 border-t border-amber-100">
                <h3 className="text-sm font-medium text-amber-800 mb-2">典故</h3>
                <div className="text-amber-600 text-sm leading-relaxed">
                  {resultQian.diangu}
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleRestart}
                className="flex-1 border-amber-200 text-amber-800 hover:bg-amber-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                再求一支
              </Button>
              <Button 
                onClick={handleSaveImage}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                保存签文
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-3deg); }
          20%, 40%, 60%, 80% { transform: rotate(3deg); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
