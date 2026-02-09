import FullscreenBackground from '../components/FullscreenBackground';
import { staticAssets } from '../assets/staticAssets';

export default function FinalPage() {
  return (
    <FullscreenBackground imageSrc={staticAssets.bgPage3}>
      <div className="relative z-10 flex min-h-screen flex-col px-6 py-12">
        {/* Scrollable content container */}
        <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto">
          <div className="animate-fade-in space-y-6 pb-24">
            <p className="whitespace-pre-wrap font-emily text-base leading-relaxed text-kaitoke md:text-lg lg:text-xl">
              {`Soo baby ig ye feelings kabhi express nahi ki mene but genuinely I love you soo much literally I feel soo blessed ki mere paas aap ho I never thought ki koi mujhe itna pyaar karega yaan koi itna important ho jayey meri life me but thank you sooo much baby and I love you sooo much meri life me aane ke liye bahut mwah hogayi hai meri life aap ke aane ke baad aur bas kya hi tareef karu aap ki aankhe uff jaanleva aap ki baatein qatil hai aur ap ke voh lips hayeee kitne mwahh hai aur voh nose ka mole bhi 💋 I love you mera bacha and bass jitna Bolu utna kam hai  aap se zyada best koi nahi ho sakta hai bina mazaak ke i love you and hope so pasand aayega chota sa gift mwahh

And legit when I am writing this na mujhe kuch samjh nahi aa raha hai mujhe bass aap ki voh baatein voh uff hasna sab yaad aa raha hai aur mei confused hun ki kaha se shuru karu kyunki khatam hone pe toh aayega nahi ye kabhi never ending hai na aap ki tareefe bas baby humesha mere saath rehna and mei manifest karta hun ki har ek Janam hum aise hi saath rahenge aur aap meri wifey banke aaoge humesha I love you mei kuch nahi chahta aap ke  ilawa i love you soo much I promise kisi ko dekhunga bhi nahi aap ke bina sirf aap hi aap ho humesha ab i promise cheat toh marke bhi nahi aankh tk uthake nahi dekhunga kisi ko i love you ❤️❤️`}
            </p>
          </div>
        </div>

        {/* Signature - bottom right */}
        <div className="absolute bottom-8 right-8">
          <p className="font-high-tower text-lg text-kaitoke md:text-xl lg:text-2xl">
            - YOUR ARSU
          </p>
        </div>
      </div>
    </FullscreenBackground>
  );
}
