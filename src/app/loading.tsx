import { TailSpin } from 'react-loader-spinner';

export default function loading(){
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfbf9]/90 backdrop-blur-sm">
      <TailSpin
        visible={true}
        height="60"
        width="60"
        color="#03A9F4" 
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      
      <div className="mt-6 flex flex-col items-center gap-1">
        <span className="text-slate-600 font-serif italic text-lg tracking-widest uppercase">
          Brandy
        </span>
        <span className="text-slate-600 text-xs font-light tracking-[0.2em]">
          Loading...
        </span>
      </div>
    </div>
  );
};

