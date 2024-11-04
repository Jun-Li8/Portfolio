import photo from '../assets/JunLi.jpg'
import { TypeAnimation } from 'react-type-animation';
import InteractivePoll from '../components/InteractivePoll'

const Home = () => {
    return (
        <div className="flex overflow-y-scroll no-scrollbar">
        {/* Content Section */}
            <div className="flex-1 p-8">
                <div className="text-4xl font-bold font-serif mb-6">
                    <TypeAnimation
                    sequence={[
                        "Hi, I'm Jun.",
                        1200,
                        "Hi, I'm Jun. I'm a Software Developer.",
                        1200,
                        "Hi, I'm Jun. I'm a System Architect.",
                        1200,
                        "Hi, I'm Jun. I'm a Lifelong Student",
                        1200,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    />
                </div>
                <div className='font-mono'>
                    <p className="text-black mb-4">
                        I graduated from <b className='text-purple-700'>Northwestern University</b> with both a Master's and Bachelor's degree in Computer Science, with a focus on Networking, Computer Vision, and Machine Learning.
                    </p>
                    <p className="text-black mb-4">
                        With over 2 years of experience working at companies such as <b className='text-red-700'>Epic Systems</b>, <b className='text-orange-500'>2MinuteWarning</b>,
                        and <b className='text-blue-600'>AbbVie</b>, I have developed the skills to create full-stack web applications and design reliable, scalable distributed backend systems.
                    </p>
                    <p className="text-black mb-4">
                        Outside of work, I enjoy playing board game, mahjong, and chess. I also enjoy competing to hackathons and coding competition.
                    </p>
                </div>
                <br></br>
                <InteractivePoll />
            </div>
  
            {/* Image Section */}
            <div className="relative w-1/2">
            {/* Fixed position wrapper to maintain full height */}
                <div className="fixed top-0 right-0 h-full w-1/3">
                    <img 
                        src={photo}
                        alt="My photo"
                        className="w-full h-full object-cover"
                    />
                
                {/* Optional overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </div>
      </div>
    )
}

export default Home;